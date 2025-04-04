<?php

namespace App\Http\Controllers;

use App\Models\Statement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

class StatementController extends Controller
{

    public function index()
    {
        return response()->json(Statement::all());
    }   
    public function store(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file|mimes:pdf',
        ]);

        $files = $request->file('files');
        $mistralUrl = config('services.mistral.url');
        $mistralApiKey = config('services.mistral.api_key');

        $statementsData = [];

        foreach ($files as $file) {
            try {
                $filePath = $file->store('statements', 'public');
                $fileContent = file_get_contents($file->getRealPath());

                // Первый запрос: загрузка в Mistral
                $uploadResponse = Http::withToken($mistralApiKey)
                    ->attach('file', $fileContent, $file->getClientOriginalName())
                    ->post("{$mistralUrl}/files", [
                        'purpose' => 'ocr',
                    ]);

                if (!$uploadResponse->successful()) {
                    continue;
                }

                $analysisData = $uploadResponse->json();
                $mistralFileId = $analysisData['id'];

                // Получение временной ссылки
                $urlResponse = Http::withToken($mistralApiKey)
                    ->get("{$mistralUrl}/files/{$mistralFileId}/url?expiry=24");

                $fileUrl = $urlResponse->json()['url'] ?? null;

                // Запрос к модели Mistral
                $chatResponse = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $mistralApiKey,
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                ])->post('https://api.mistral.ai/v1/chat/completions', [
                    'model' => 'ministral-8b-latest',
                    'messages' => [
                        ['role' => 'system', 'content' => 'Extract the statement information.'],
                        [
                            'role' => 'user',
                            'content' => [
                                ['type' => 'text', 'text' => 'Найди ИНН, паспорт, дату, ФИО, сумму долга, фирму, адрес'],
                                ['type' => 'document_url', 'document_url' => $fileUrl]
                            ]
                        ]
                    ],
                    'response_format' => [
                        'type' => 'json_schema',
                        'json_schema' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'name' => ['type' => 'string'],
                                    'passport' => ['type' => 'string'],
                                    'firm' => ['type' => 'string'],
                                    'debt' => ['type' => 'string'],
                                    'inn' => ['type' => 'string'],
                                    'date' => ['type' => 'string'],
                                    'adress' => ['type' => 'string'],
                                    'authors' => ['type' => 'array', 'items' => ['type' => 'string']],
                                ],
                                'required' => [],
                                'additionalProperties' => false,
                            ],
                            'strict' => true,
                            'name' => 'statement',
                        ]
                    ],
                    'max_tokens' => 256,
                    'temperature' => 0,
                ]);

                $data = json_decode($chatResponse->json()['choices'][0]['message']['content'], true);

                // Сохраняем в БД
                $statement = Statement::create([
                    'name'     => $data['name'],
                    'inn'      => $data['inn'] ?? null,
                    'filepath' => $filePath,
                    'debt'     => $data['debt'],
                    'firm'     => $data['firm'],
                    'adress'   => $data['adress'],
                    'passport' => $data['passport'],
                    'date'     => $data['date'] ?? now(),
                ]);

                $statementsData[] = $data;
            } catch (\Exception $e) {
                // Пропустить файл при ошибке
                continue;
            }
        }

        // Генерация PDF из данных
        $pdf = Pdf::loadView('pdf.statements', ['statements' => $statementsData]);
        return $pdf->download('result.pdf');
    }
}
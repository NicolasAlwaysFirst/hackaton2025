<?php

namespace App\Http\Controllers;

use App\Models\Statement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class StatementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Statement::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Валидация входящих данных
        $validated = $request->validate([
            'file'      => 'required|file|mimes:pdf', // Указывайте нужные форматы
        ]);

        // Сохраняем файл во временное хранилище (или сразу в storage)
        $file = $request->file('file');
        $filePath = $file->store('statements', 'public');

        // Читаем содержимое файла для отправки в Mistral
        $fileContent = file_get_contents($file->getRealPath());

        // Отправляем запрос к API Mistral для OCR-анализа PDF
        // URL и ключ настраиваем через config/services.php
        $mistralUrl = config('services.mistral.url'); // например: https://api.mistral.ai/v1
        $mistralApiKey = config('services.mistral.api_key');

        $response = Http::withToken($mistralApiKey)
            ->attach('file', $fileContent, $file->getClientOriginalName())
            ->post("{$mistralUrl}/files", [
                'purpose' => 'ocr',
            ]);
       // dump($response);
        if ($response->failed()) {
            // Обработка ошибки от Mistral
            return response()->json([
                'error' => 'Ошибка при анализе файла нейросетью'
            ], 500);
        }

        // Предполагаем, что Mistral возвращает данные в формате JSON, например:
        // { "fio": "...", "inn": "...", "date": "..." }
        $analysisData = $response->json();
        $mistralFileId = $analysisData['id'];
        $response = Http::withToken($mistralApiKey)->get("$mistralUrl/files/$mistralFileId/url?expiry=24");
        $urlData = $response->json();
        $fileUrl = $urlData["url"];
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'Authorization' => 'Bearer jb1fypk94abwRKLr5cUTJs1DFgDHdGof',
        ])->post('https://api.mistral.ai/v1/chat/completions', [
            'model' => 'ministral-8b-latest',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Extract the statement information.'
                ],
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'text',
                            'text' => 'Найди ИНН, паспорт, дату, ФИО, сумму долга, фирму, адрес'
                        ],
                        [
                            'type' => 'document_url',
                            'document_url' => $fileUrl
                        ]
                    ]
                ]
            ],
            'response_format' => [
                'type' => 'json_schema',
                'json_schema' => [
                    'schema' => [
                        'properties' => [
                            'name' => [
                                'title' => 'Name',
                                'type' => 'string'
                            ],
                            'passport' => [
                                'title' => 'Passport',
                                'type' => 'string'
                            ],
                            'firm' => [
                                'title' => 'Firm',
                                'type' => 'string'
                            ],
                            'debt' => [
                                'title' => 'Debt',
                                'type' => 'string'
                            ],
                            'inn' => [
                                'title' => 'inn',
                                'type' => 'string'
                            ],
                            'date' => [
                                'title' => 'date',
                                'type' => 'string'
                            ],
                            'adress' => [
                                'title' => 'Adress',
                                'type' => 'string'
                            ],
                            'authors' => [
                                'items' => [
                                    'type' => 'string'
                                ],
                                'title' => 'Authors',
                                'type' => 'array'
                            ]
                        ],
                        'required' => [],
                        'title' => 'Statement',
                        'type' => 'object',
                        'additionalProperties' => false
                    ],
                    'name' => 'statement',
                    'strict' => true
                ]
            ],
            'max_tokens' => 256,
            'temperature' => 0
        ]);
        
        $data = $response->json();
        $data = json_decode($data['choices'][0]['message']['content'], true, 512, JSON_OBJECT_AS_ARRAY);
        // Создаем запись в таблице Statements, используя данные из Mistral и входные данные
        $statement = Statement::create([
            'name'      => $data['name'],
            'inn'       => $data['inn'] ?? null,
            'filepath'  => $filePath,
            'debt'=>$data['debt'],
            'firm'=>$data['firm'],
            'adress'=>$data['adress'],
            'passport'=>$data['passport'],
            'date'      => $data['date'] ?? now(),
        ]);

        return response()->json([
            'message'   => 'Заявка успешно создана',
            'statement' => $statement
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Statement $statement)
    {
        //
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Statement $statement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Statement $statement)
    {
        //
    }
}

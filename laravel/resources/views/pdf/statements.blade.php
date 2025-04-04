<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title>Заявления</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
        }

        .statement {
            margin-bottom: 30px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
        }
    </style>
</head>

<body>
    @foreach ($statements as $data)
        <div class="statement">
            <strong>ФИО:</strong> {{ $data['name'] ?? '-' }}<br>
            <strong>ИНН:</strong> {{ $data['inn'] ?? '-' }}<br>
            <strong>Паспорт:</strong> {{ $data['passport'] ?? '-' }}<br>
            <strong>Фирма:</strong> {{ $data['firm'] ?? '-' }}<br>
            <strong>Сумма долга:</strong> {{ $data['debt'] ?? '-' }}<br>
            <strong>Адрес:</strong> {{ $data['adress'] ?? '-' }}<br>
            <strong>Дата:</strong> {{ $data['date'] ?? '-' }}<br>
        </div>
    @endforeach
</body>

</html>
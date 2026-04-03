<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste de presence</title>
    <style>
        body {
            font-family: DejaVu Sans, Arial, sans-serif;
            font-size: 12px;
            color: #111827;
            margin: 24px;
        }
        .header {
            margin-bottom: 14px;
        }
        .header h1 {
            margin: 0 0 8px;
            font-size: 18px;
        }
        .meta {
            margin: 0;
            line-height: 1.6;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
        }
        th, td {
            border: 1px solid #374151;
            padding: 8px;
            vertical-align: middle;
        }
        th {
            background: #f3f4f6;
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.03em;
        }
        .signature-cell {
            height: 30px;
        }
        .footer {
            margin-top: 14px;
            font-size: 10px;
            color: #6b7280;
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Liste de presence des candidats</h1>
        <p class="meta"><strong>Examen :</strong> {{ $examTitle }}</p>
        <p class="meta"><strong>Centre :</strong> {{ $testCenterTitle }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 23%;">Nom</th>
                <th style="width: 23%;">Prenom</th>
                <th style="width: 24%;">Matricule</th>
                <th style="width: 25%;">Signature</th>
            </tr>
        </thead>
        <tbody>
            @forelse($rows as $index => $row)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $row['name'] }}</td>
                    <td>{{ $row['firstname'] }}</td>
                    <td>{{ $row['matricule'] }}</td>
                    <td class="signature-cell"></td>
                </tr>
            @empty
                <tr>
                    <td colspan="5">Aucun candidat assigne a ce centre pour cet examen.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Genere le {{ $generatedAt->format('d/m/Y H:i') }}
    </div>
</body>
</html>

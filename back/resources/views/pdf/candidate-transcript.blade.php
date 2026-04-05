<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Releve de Notes - BAC {{ $exam->start_date->format('Y') }}-{{ $exam->end_date->format('Y') }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { margin: 0; padding: 0; font-family: 'DejaVu Sans', Arial, sans-serif; font-size: 11px; color: #0F172A; background: #fff; }
        @page { size: A4 portrait; margin: 0; }

        .hdr { background: #0A1628; padding: 20px 30px 16px; }
        .hdr-org { font-size: 9px; color: #93C5FD; letter-spacing: .07em; text-transform: uppercase; margin-bottom: 5px; }
        .hdr-bar { height: 3px; background: #D4A017; width: 50px; margin-bottom: 10px; }
        .hdr-t { font-size: 20px; font-weight: bold; color: #fff; }
        .hdr-s { font-size: 11px; color: #D4A017; margin-top: 4px; }
        .hdr-b { display: inline-block; margin-top: 8px; padding: 4px 10px; border: 1px solid #D4A017; font-size: 9px; color: #D4A017; font-weight: bold; }

        .ic { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 10px 14px; vertical-align: top; }
        .ic-l { font-size: 8px; text-transform: uppercase; letter-spacing: .06em; color: #94A3B8; margin-bottom: 3px; }
        .ic-v { font-size: 12px; font-weight: bold; color: #0F172A; }

        .sl { font-size: 10px; text-transform: uppercase; letter-spacing: .07em; color: #94A3B8; padding-bottom: 6px; border-bottom: 1px solid #E2E8F0; margin-bottom: 10px; }

        .st { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
        .st th { font-size: 9px; text-transform: uppercase; letter-spacing: .05em; color: #94A3B8; font-weight: bold; padding: 8px 10px; text-align: left; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; }
        .st td { padding: 9px 10px; font-size: 11px; border-bottom: 1px solid #F1F5F9; color: #334155; vertical-align: middle; }
        .tp { padding: 2px 8px; font-size: 9px; font-weight: bold; }
        .te { background: #DBEAFE; color: #1E40AF; }
        .to { background: #ECFDF5; color: #065F46; }
        .tpr { background: #FFF7ED; color: #9A3412; }
        .ct { color: #94A3B8; font-size: 10px; }
        .gh { color: #059669; font-size: 13px; font-weight: bold; }
        .gm { color: #D97706; font-size: 13px; font-weight: bold; }
        .gl { color: #DC2626; font-size: 13px; font-weight: bold; }

        .sw { background: #0A1628; border-radius: 4px; margin-bottom: 14px; }
        .sr { width: 100%; border-collapse: collapse; }
        .sr td { text-align: center; padding: 12px 8px; vertical-align: middle; }
        .sep { width: 1px; background: #1E3A5F; }
        .s-l { font-size: 8px; text-transform: uppercase; letter-spacing: .06em; color: #94A3B8; margin-bottom: 2px; }
        .s-v { font-size: 15px; font-weight: bold; color: #fff; }
        .sg { color: #D4A017; }

        .bt { font-size: 9px; text-transform: uppercase; letter-spacing: .06em; color: #94A3B8; margin-bottom: 5px; }
        .bc { font-size: 11px; color: #334155; line-height: 1.7; }

        .qi { font-size: 9px; color: #94A3B8; line-height: 1.5; }
    </style>
</head>
<body>

@php
    $delibVal   = $candidate->deliberation ?? null;
    $delibLower = strtolower($delibVal ?? '');
    if ($delibLower === 'admis') { $bannerBg='#ECFDF5'; $bannerBord='#059669'; $lColor='#065F46'; $vColor='#059669'; }
    elseif (str_contains($delibLower,'ajour')) { $bannerBg='#FEF9E7'; $bannerBord='#D4A017'; $lColor='#7F6000'; $vColor='#D4A017'; }
    else { $bannerBg='#F8F9FA'; $bannerBord='#CBD5E1'; $lColor='#64748B'; $vColor='#334155'; }
    if ($mention) {
        $ml = strtolower($mention);
        if (str_contains($ml,'tres')) { $mBg='#DBEAFE'; $mC='#1E40AF'; }
        elseif (str_contains($ml,'bien')) { $mBg='#DBEAFE'; $mC='#1E40AF'; }
        elseif (str_contains($ml,'assez')) { $mBg='#EDE9FE'; $mC='#5B21B6'; }
        else { $mBg='#ECFDF5'; $mC='#065F46'; }
    } else { $mBg='#F1F5F9'; $mC='#64748B'; }
@endphp

{{-- HEADER --}}
<div class="hdr">
    <div class="hdr-org">Ministere de l'Education Nationale &mdash; Direction des Examens et Concours</div>
    <div class="hdr-bar"></div>
    <div class="hdr-t">Releve de notes officiel</div>
    <div class="hdr-s">Baccalaureat General &middot; Session {{ $exam->start_date->format('Y') }}-{{ $exam->end_date->format('Y') }}</div>
    <div><span class="hdr-b">Document officiel &mdash; Ne pas alterer</span></div>
</div>

{{-- RESULT BANNER --}}
<div style="background:{{ $bannerBg }}; border-bottom:1px solid {{ $bannerBord }}; padding:12px 30px;">
    <table style="width:100%; border-collapse:collapse;">
        <tr>
            <td style="vertical-align:middle; width:33%;">
                <div style="font-size:9px; text-transform:uppercase; letter-spacing:.07em; color:{{ $lColor }}; margin-bottom:2px;">Resultat de deliberation</div>
                <div style="font-size:17px; font-weight:bold; color:{{ $vColor }};">{{ strtoupper($delibVal ?? 'EN ATTENTE') }}</div>
            </td>
            <td style="text-align:center; width:34%; vertical-align:middle;">
                <div style="font-size:9px; color:{{ $lColor }}; margin-bottom:2px;">Moyenne generale</div>
                <div style="font-size:26px; font-weight:bold; color:{{ $vColor }};">{{ number_format($computedAverage, 2) }} / 20</div>
            </td>
            <td style="text-align:right; width:33%; vertical-align:middle;">
                @if($mention)
                <div style="font-size:9px; color:{{ $lColor }}; margin-bottom:3px;">Mention</div>
                <span style="display:inline-block; padding:4px 14px; background:{{ $mBg }}; color:{{ $mC }}; font-size:12px; font-weight:bold;">{{ $mention }}</span>
                @endif
            </td>
        </tr>
    </table>
</div>

{{-- MAIN CONTENT --}}
<div style="padding:18px 30px 0;">

    {{-- Info cards 3×2 --}}
    <table style="width:100%; border-collapse:separate; border-spacing:6px; margin-bottom:16px;">
        <tr>
            <td class="ic"><div class="ic-l">Nom &amp; prenoms</div><div class="ic-v">{{ strtoupper($user->name ?? '-') }} {{ $user->firstname ?? '' }}</div></td>
            <td class="ic"><div class="ic-l">Date de naissance</div><div class="ic-v">{{ $user->label ?? '-' }}</div></td>
            <td class="ic"><div class="ic-l">Lieu de naissance</div><div class="ic-v">-</div></td>
        </tr>
        <tr>
            <td class="ic"><div class="ic-l">Matricule</div><div class="ic-v" style="color:#1A4A8A;">{{ $candidate->matricule ?? ('CAND-'.$candidate->id) }}</div></td>
            <td class="ic"><div class="ic-l">Numero de table</div><div class="ic-v" style="color:#DC2626;">{{ $candidate->table_number ?? '-' }}</div></td>
            <td class="ic"><div class="ic-l">Specialite</div><div class="ic-v">{{ ($speciality->grade->label ?? '').' '.($speciality->serie->label ?? '') }}</div></td>
        </tr>
    </table>

    <div class="sl">Detail des epreuves</div>

    <table class="st">
        <thead>
            <tr>
                <th style="width:36%;">Matiere</th>
                <th>Type</th>
                <th>Coef.</th>
                <th>Note / 20</th>
                <th style="text-align:right;">Points</th>
            </tr>
        </thead>
        <tbody>
            @foreach($subjects as $i => $subject)
            @php
                $rowBg = ($i%2!==0) ? '#F8FAFC' : '#fff';
                $st2 = strtolower($subject['type'] ?? '');
                if (str_contains($st2,'ecrit')) $tCl='te';
                elseif (str_contains($st2,'oral')) $tCl='to';
                else $tCl='tpr';
                $gCl='gl';
                if (!($subject['absent']??false)) {
                    if ($subject['grade']>=14) $gCl='gh';
                    elseif ($subject['grade']>=10) $gCl='gm';
                }
            @endphp
            <tr style="background:{{ $rowBg }};">
                <td style="font-weight:bold; color:#0F172A;">{{ $subject['label'] }}</td>
                <td><span class="tp {{ $tCl }}">{{ $subject['type'] }}</span></td>
                <td class="ct">{{ $subject['coefficient'] }}</td>
                <td>
                    @if($subject['absent']??false)
                        <span style="color:#DC2626; font-style:italic;">Absent</span>
                    @else
                        <span class="{{ $gCl }}">{{ number_format($subject['grade'],1) }}</span>
                    @endif
                </td>
                <td style="text-align:right; color:#334155;">{{ ($subject['absent']??false) ? '-' : number_format($subject['weighted_points'],1) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    {{-- Summary --}}
    <div class="sw">
        <table class="sr">
            <tr>
                <td><div class="s-l">Total points</div><div class="s-v sg">{{ number_format($totalWeightedPoints,1) }}</div></td>
                <td class="sep">&nbsp;</td>
                <td><div class="s-l">Total coef.</div><div class="s-v">{{ $totalCoefficient }}</div></td>
                <td class="sep">&nbsp;</td>
                <td><div class="s-l">Moyenne generale</div><div class="s-v sg">{{ number_format($computedAverage,2) }} / 20</div></td>
                <td class="sep">&nbsp;</td>
                <td><div class="s-l">Statut</div><div class="s-v" style="color:{{ $vColor }};">{{ strtoupper($delibVal ?? 'EN ATTENTE') }}</div></td>
            </tr>
        </table>
    </div>

    {{-- Bottom 2-col info --}}
    <table style="width:100%; border-collapse:separate; border-spacing:10px; margin-bottom:14px;">
        <tr>
            <td style="vertical-align:top; width:50%;">
                <div class="bt">Etablissement &amp; centre</div>
                <div class="bc">
                    <strong style="color:#0F172A;">{{ $school->name ?? '-' }}</strong><br>
                    Centre d'examen : {{ $testCenter->title ?? '-' }}<br>
                    {{ $testCenter->location_indication ?? '' }}
                </div>
            </td>
            <td style="vertical-align:top; width:50%;">
                <div class="bt">Session d'examen</div>
                <div class="bc">
                    <strong style="color:#0F172A;">{{ $exam->title }}</strong><br>
                    Du {{ $exam->start_date->format('d/m/Y') }} au {{ $exam->end_date->format('d/m/Y') }}<br>
                    @if($candidate->deliberation_date)
                    Deliberation : {{ \Carbon\Carbon::parse($candidate->deliberation_date)->format('d/m/Y') }}
                    @endif
                </div>
            </td>
        </tr>
    </table>

    {{-- QR FOOTER --}}
    <div style="border-top:1px solid #E2E8F0; padding-top:12px;">
        <table style="width:100%; border-collapse:collapse;">
            <tr>
                <td style="vertical-align:middle; width:60px;">
                    <img src="{{ $qrDataUri }}" width="52" height="52" style="display:block;" />
                </td>
                <td style="vertical-align:middle; padding:0 14px;">
                    <p style="font-size:10px; color:#0F172A; font-weight:bold; margin-bottom:2px;">Verification d'authenticite</p>
                    <p class="qi">Scanner ce QR code ou visiter <strong style="color:#334155;">www.examens.gouv.ci/verifier</strong></p>
                    <p class="qi">Code : {{ $candidate->matricule ?? '-' }} &middot; Emis le {{ now()->format('d/m/Y') }}</p>
                </td>
                <td style="vertical-align:middle; width:80px; text-align:center;">
                    @if($stampDataUri)
                    <img src="{{ $stampDataUri }}" width="70" height="70" style="display:block; margin:0 auto;" />
                    @endif
                </td>
                <td style="vertical-align:middle; text-align:right; width:170px;">
                    <div style="width:130px; height:1px; background:#CBD5E1; margin:6px 0 3px auto;"></div>
                    <div style="font-size:10px; font-weight:bold; color:#0F172A;">Dr. John M. Doe</div>
                    <div style="font-size:9px; color:#94A3B8;">Directeur des Examens et Concours</div>
                </td>
            </tr>
        </table>
    </div>

</div>

</body>
</html>

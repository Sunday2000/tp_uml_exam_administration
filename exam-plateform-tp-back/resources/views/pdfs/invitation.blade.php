<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>Convocation — {{ $fullName }} — {{ $examTitle }}</title>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'DejaVu Sans',Arial,sans-serif; font-size:8px; color:#0F172A; background:#F8FAFC; }
@page { size:A4 portrait; margin:0; }
table { border-collapse:collapse; width:100%; }
td { vertical-align:top; }

/* sidebar + bottom bar rendered as absolute positioned divs */
</style>
</head>
<body>

{{-- ===== LEFT SIDEBAR ===== --}}
<div style="position:absolute; top:0; left:0; width:10px; height:100%; background:#0D2B5E; z-index:5;"></div>
<div style="position:absolute; top:0; left:10px; width:3px; height:100%; background:#D4A017; z-index:5;"></div>

{{-- ===== BOTTOM BAR ===== --}}
<div style="position:absolute; bottom:0; left:0; right:0; height:34px; background:#0A1628; z-index:5;"></div>
<div style="position:absolute; bottom:34px; left:13px; right:0; height:4px; background:#D4A017; z-index:6;"></div>

{{-- ===== HERO ===== --}}
<div style="position:relative; height:150px; overflow:hidden;">
    {{-- Navy base --}}
    <div style="position:absolute; top:0; left:0; right:0; bottom:0; background:#0A1628;"></div>
    {{-- Blue left overlay --}}
    <div style="position:absolute; top:0; left:0; width:62%; height:100%; background:#0D2B5E;"></div>
    {{-- Gold top accent --}}
    <div style="position:absolute; top:0; left:0; right:0; height:7px; background:#D4A017;"></div>

    {{-- Hero content --}}
    <div style="position:relative; z-index:2; padding:14px 20px 0 22px;">
        <table>
            <tr>
                <td style="width:60%;">
                    <div style="font-size:9px; font-weight:bold; color:#D4A017; letter-spacing:.08em; margin-bottom:2px;">REPUBLIQUE DU BENIN</div>
                    <div style="font-size:8px; color:#93C5FD; line-height:1.5;">
                        Ministere de l'Education Nationale et de l'Alphabetisation<br>
                        Direction des Examens et Concours — DEC
                    </div>
                    <div style="font-size:28px; font-weight:bold; color:#fff; margin-top:10px; line-height:1;">CONVOCATION</div>
                    <div style="font-size:11px; font-weight:bold; color:#D4A017; margin-top:3px;">OFFICIELLE D'EXAMEN</div>
                </td>
                <td style="text-align:right; padding-top:4px;">
                    <div style="font-size:11px; font-weight:bold; color:#fff;">{{ strtoupper($examTitle) }}</div>
                    <div style="font-size:9px; color:#93C5FD; margin-top:3px;">Session {{ $examSession - 1 }}-{{ $examSession }}</div>
                    <div style="display:inline-block; margin-top:10px; padding:4px 12px; background:#1A4A8A; font-size:8px; font-weight:bold; color:#D4A017; letter-spacing:.04em;">{{ $convocationCode }}</div>
                </td>
            </tr>
        </table>
    </div>

    {{-- Gold separator --}}
    <div style="position:relative; z-index:2; margin:6px 20px 0 22px; height:2px; background:#D4A017;"></div>
</div>

{{-- ===== MAIN CONTENT ===== --}}
<div style="padding:12px 20px 50px 22px;">

    {{-- ===== CANDIDATE CARD ===== --}}
    <div style="background:#fff; border:1px solid #E2E8F0; margin-bottom:10px; position:relative; overflow:hidden;">
        {{-- Blue left accent --}}
        <div style="position:absolute; top:0; left:0; width:5px; height:100%; background:#2563EB;"></div>
        {{-- Card header --}}
        <div style="background:#EFF6FF; padding:7px 10px 7px 18px; font-size:8px; font-weight:bold; color:#2563EB; letter-spacing:.07em;">
            IDENTITE DU CANDIDAT
        </div>
        {{-- Card body --}}
        <div style="padding:8px 10px 10px 18px;">
            <table>
                <tr>
                    <td style="width:50%; padding-bottom:8px;">
                        <div style="font-size:7px; text-transform:uppercase; letter-spacing:.07em; color:#94A3B8; margin-bottom:2px;">Nom &amp; Prenoms</div>
                        <div style="font-size:10.5px; font-weight:bold; color:#0F172A;">{{ strtoupper($name ?? '') }} {{ $firstname ?? '' }}</div>
                    </td>
                    <td style="width:50%; padding-bottom:8px;">
                        <div style="font-size:7px; text-transform:uppercase; letter-spacing:.07em; color:#94A3B8; margin-bottom:2px;">Etablissement d'origine</div>
                        <div style="font-size:9.5px; color:#334155;">{{ $schoolName }}</div>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom:8px;">
                        <div style="font-size:7px; text-transform:uppercase; letter-spacing:.07em; color:#94A3B8; margin-bottom:2px;">Date de naissance</div>
                        <div style="font-size:9.5px; color:#334155;">{{ $candidate->student?->user?->label ?? '-' }}</div>
                    </td>
                    <td style="padding-bottom:8px;">
                        <div style="font-size:7px; text-transform:uppercase; letter-spacing:.07em; color:#94A3B8; margin-bottom:2px;">Specialite</div>
                        <div style="font-size:10.5px; font-weight:bold; color:#1A4A8A;">{{ $specialityName }}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div style="font-size:7px; text-transform:uppercase; letter-spacing:.07em; color:#94A3B8; margin-bottom:2px;">Matricule</div>
                        <div style="font-size:10.5px; font-weight:bold; color:#1A4A8A;">{{ $matricule }}</div>
                    </td>
                    <td>
                        <div style="font-size:7px; text-transform:uppercase; letter-spacing:.07em; color:#94A3B8; margin-bottom:2px;">Sexe</div>
                        <div style="font-size:9.5px; color:#334155;">-</div>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    {{-- ===== KEY INFO ROW ===== --}}
    <table style="margin-bottom:8px;">
        <tr>
            {{-- Table number --}}
            <td style="width:88px; background:#DC2626; padding:0;">
                <div style="height:5px; background:#D4A017;"></div>
                <div style="padding:6px 8px 7px;">
                    <div style="font-size:6.5px; text-transform:uppercase; letter-spacing:.07em; color:rgba(255,255,255,.7); margin-bottom:3px;">N° de Table</div>
                    <div style="font-size:17px; font-weight:bold; color:#fff; line-height:1;">{{ $tableNumber }}</div>
                </div>
            </td>
            <td style="width:6px;"></td>
            {{-- Room --}}
            <td style="width:78px; background:#0D2B5E; padding:0;">
                <div style="height:5px; background:#2563EB;"></div>
                <div style="padding:6px 8px 7px;">
                    <div style="font-size:6.5px; text-transform:uppercase; letter-spacing:.07em; color:rgba(255,255,255,.7); margin-bottom:3px;">Salle</div>
                    <div style="font-size:15px; font-weight:bold; color:#fff; line-height:1;">{{ $roomLabel }}</div>
                </div>
            </td>
            <td style="width:6px;"></td>
            {{-- Test center --}}
            <td style="background:#fff; border:1px solid #E2E8F0; padding:0;">
                <div style="height:5px; background:#059669;"></div>
                <div style="padding:6px 8px 7px;">
                    <div style="font-size:6.5px; text-transform:uppercase; letter-spacing:.07em; color:#94A3B8; margin-bottom:3px;">Centre d'examen assigne</div>
                    <div style="font-size:9.5px; font-weight:bold; color:#0F172A; line-height:1.3;">{{ $testCenterTitle }}</div>
                    @if($testCenterLocation)
                    <div style="font-size:7.5px; color:#64748B; margin-top:2px;">{{ $testCenterLocation }}</div>
                    @endif
                    <div style="font-size:7px; color:#059669; margin-top:3px; font-weight:bold;">{{ $examPeriod }}</div>
                </div>
            </td>
        </tr>
    </table>

    {{-- ===== ARRIVAL BANNER ===== --}}
    <div style="background:#FEF9E7; border:1px solid #D4A017; padding:6px 12px; margin-bottom:10px; text-align:center; font-size:8.5px; font-weight:bold; color:#7F6000;">
        ⚠  {{ $arrivalText }}  |  {{ $examPeriod }}
    </div>

    {{-- ===== SCHEDULE SECTION ===== --}}
    <table style="margin-bottom:8px;">
        <tr>
            <td style="font-size:8px; font-weight:bold; color:#0A1628; text-transform:uppercase; letter-spacing:.08em; white-space:nowrap;">Programme des epreuves</td>
            <td style="width:60px; padding-left:6px;"><div style="height:2px; background:#D4A017;"></div></td>
            <td style="padding-left:2px;"><div style="height:1px; background:#E2E8F0;"></div></td>
        </tr>
    </table>

    <table style="width:100%; margin-bottom:2px; font-size:8px;">
        <thead>
            <tr style="background:#0A1628;">
                <th style="width:14%; padding:7px 8px; text-align:left; font-size:7.5px; font-weight:bold; color:#D4A017; letter-spacing:.07em;">DATE</th>
                <th style="width:16%; padding:7px 8px; text-align:left; font-size:7.5px; font-weight:bold; color:#D4A017; letter-spacing:.07em;">HORAIRE</th>
                <th style="width:36%; padding:7px 8px; text-align:left; font-size:7.5px; font-weight:bold; color:#D4A017; letter-spacing:.07em;">MATIERE</th>
                <th style="width:10%; padding:7px 8px; text-align:left; font-size:7.5px; font-weight:bold; color:#D4A017; letter-spacing:.07em;">TYPE</th>
                <th style="width:8%; padding:7px 8px; text-align:center; font-size:7.5px; font-weight:bold; color:#D4A017; letter-spacing:.07em;">COEFF.</th>
            </tr>
        </thead>
        <tbody>
            @foreach($programRows as $i => $ep)
            <tr style="background:{{ $i % 2 === 0 ? '#fff' : '#F1F5F9' }};">
                <td style="padding:7px 8px; border-bottom:1px solid #F1F5F9; font-weight:bold; color:#334155; font-size:7.5px;">{{ $ep['date'] }}</td>
                <td style="padding:7px 8px; border-bottom:1px solid #F1F5F9; color:#64748B; font-size:7.5px;">{{ $ep['time'] }}</td>
                <td style="padding:7px 8px; border-bottom:1px solid #F1F5F9; font-weight:bold; color:#0F172A; font-size:8.5px;">{{ $ep['subject'] }}</td>
                <td style="padding:7px 8px; border-bottom:1px solid #F1F5F9;">
                    @php
                        $typeLower = strtolower($ep['type']);
                        if (str_contains($typeLower, 'oral')) { $pillBg='#ECFDF5'; $pillC='#065F46'; }
                        elseif (str_contains($typeLower, 'prat')) { $pillBg='#FFF7ED'; $pillC='#9A3412'; }
                        else { $pillBg='#DBEAFE'; $pillC='#1E40AF'; }
                    @endphp
                    <span style="display:inline-block; padding:2px 7px; background:{{ $pillBg }}; color:{{ $pillC }}; font-size:7px; font-weight:bold;">{{ $ep['type'] }}</span>
                </td>
                <td style="padding:7px 8px; border-bottom:1px solid #F1F5F9; text-align:center; font-weight:bold; color:#334155;">{{ $ep['duration'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div style="height:2px; background:#0A1628; margin-bottom:10px;"></div>

    {{-- ===== INSTRUCTIONS ===== --}}
    <table style="margin-bottom:8px;">
        <tr>
            <td style="font-size:8px; font-weight:bold; color:#0A1628; text-transform:uppercase; letter-spacing:.08em; white-space:nowrap;">Instructions importantes</td>
            <td style="width:60px; padding-left:6px;"><div style="height:2px; background:#D4A017;"></div></td>
            <td style="padding-left:2px;"><div style="height:1px; background:#E2E8F0;"></div></td>
        </tr>
    </table>

    <table style="margin-bottom:12px;">
        <tr>
            <td style="width:25%; padding-right:4px;">
                <div style="background:#fff; border:1px solid #E2E8F0; overflow:hidden;">
                    <div style="height:4px; background:#2563EB;"></div>
                    <div style="padding:5px 7px 7px;">
                        <div style="font-size:6.5px; font-weight:bold; text-transform:uppercase; letter-spacing:.05em; color:#1E40AF; margin-bottom:3px;">Presentation</div>
                        <div style="font-size:6.5px; color:#334155; line-height:1.5;">Apporter cette convocation et une piece d'identite valide.</div>
                    </div>
                </div>
            </td>
            <td style="width:25%; padding-right:4px;">
                <div style="background:#fff; border:1px solid #E2E8F0; overflow:hidden;">
                    <div style="height:4px; background:#059669;"></div>
                    <div style="padding:5px 7px 7px;">
                        <div style="font-size:6.5px; font-weight:bold; text-transform:uppercase; letter-spacing:.05em; color:#065F46; margin-bottom:3px;">Ponctualite</div>
                        <div style="font-size:6.5px; color:#334155; line-height:1.5;">Etre present avant 07h30. Tout retard peut entrainer l'exclusion.</div>
                    </div>
                </div>
            </td>
            <td style="width:25%; padding-right:4px;">
                <div style="background:#fff; border:1px solid #E2E8F0; overflow:hidden;">
                    <div style="height:4px; background:#EA580C;"></div>
                    <div style="padding:5px 7px 7px;">
                        <div style="font-size:6.5px; font-weight:bold; text-transform:uppercase; letter-spacing:.05em; color:#9A3412; margin-bottom:3px;">Materiel</div>
                        <div style="font-size:6.5px; color:#334155; line-height:1.5;">Telephones et appareils electroniques strictement interdits.</div>
                    </div>
                </div>
            </td>
            <td style="width:25%;">
                <div style="background:#fff; border:1px solid #E2E8F0; overflow:hidden;">
                    <div style="height:4px; background:#DC2626;"></div>
                    <div style="padding:5px 7px 7px;">
                        <div style="font-size:6.5px; font-weight:bold; text-transform:uppercase; letter-spacing:.05em; color:#991B1B; margin-bottom:3px;">Integrite</div>
                        <div style="font-size:6.5px; color:#334155; line-height:1.5;">Toute fraude entraine l'annulation des resultats et poursuites.</div>
                    </div>
                </div>
            </td>
        </tr>
    </table>

    {{-- ===== FOOTER ===== --}}
    <div style="background:#fff; border:1px solid #E2E8F0; padding:10px 12px; margin-bottom:6px;">
        <table>
            <tr>
                {{-- QR code --}}
                <td style="width:66px; vertical-align:middle; text-align:center; padding:4px;">
                    <div style="border:1px solid #E2E8F0; padding:4px;">
                        <img src="{{ $qrCodeDataUri }}" width="54" height="54" style="display:block;" />
                    </div>
                </td>
                {{-- QR info --}}
                <td style="vertical-align:middle; padding:0 10px;">
                    <div style="font-size:8px; font-weight:bold; color:#0F172A; margin-bottom:2px;">Verification d'authenticite</div>
                    <div style="font-size:7px; color:#64748B; line-height:1.5;">
                        Scanner ce QR code ou visiter <strong style="color:#334155;">www.examens.gouv.ci/verifier</strong><br>
                        Code : {{ $convocationCode }}-{{ $tableNumber }} · Emis le {{ $emissionDate }}
                    </div>
                </td>
                {{-- Divider --}}
                <td style="width:1px; background:#E2E8F0; vertical-align:middle;"></td>
                {{-- Stamp --}}
                <td style="width:64px; vertical-align:middle; text-align:center; padding:0 8px;">
                    @if($authorityStampDataUri)
                    <img src="{{ $authorityStampDataUri }}" width="56" height="56" style="display:block; margin:0 auto;" />
                    @else
                    <div style="width:56px; height:56px; border:2px solid #1A4A8A; text-align:center; padding-top:14px; margin:0 auto;">
                        <div style="font-size:6px; text-transform:uppercase; letter-spacing:.04em; color:#1A4A8A; line-height:1.4; font-weight:bold;">MINISTERE<br>EDUCATION<br>NATIONALE</div>
                    </div>
                    @endif
                </td>
                {{-- Divider --}}
                <td style="width:1px; background:#E2E8F0; vertical-align:middle;"></td>
                {{-- Signature block + doc info --}}
                <td style="vertical-align:middle; padding:0 0 0 10px;">
                    <div style="font-size:7px; color:#64748B; margin-bottom:4px;">Le Directeur des Examens et Concours</div>
                    <div style="width:110px; height:1px; background:#CBD5E1; margin-bottom:4px;"></div>
                    <div style="font-size:8px; font-weight:bold; color:#0F172A;">Dr. John M. Doe</div>
                    <div style="font-size:7px; color:#94A3B8; margin-bottom:6px;">Direction des Examens et Concours — DEC</div>
                    <div style="font-size:7px; color:#64748B; line-height:1.6;">
                        Convocation N° : {{ $convocationCode }} — Table : {{ $tableNumber }}<br>
                        Emise le : {{ $emissionDate }}<br>
                        Ce document tient lieu de convocation officielle.
                    </div>
                </td>
            </tr>
        </table>
    </div>

</div>

{{-- ===== BOTTOM TEXT ===== --}}
<div style="position:absolute; bottom:8px; left:0; right:0; text-align:center; font-size:7px; color:#64748B; z-index:6;">
    Plateforme de Gestion des Examens  |  www.examens.gouv.ci  |  +225 27 20 00 00 00
</div>

</body>
</html>
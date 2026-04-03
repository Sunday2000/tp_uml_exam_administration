<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification OTP</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f5f7;">
        <tr>
            <td align="center" style="padding:28px 12px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;">
                    <tr>
                        <td align="center" style="padding:8px 0 18px 0;">
                            <div style="display:inline-block;background:linear-gradient(135deg,#f97316,#ef4444);color:#ffffff;font-weight:700;font-size:14px;letter-spacing:1px;padding:10px 14px;border-radius:8px;">
                                EXAM
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color:#ffffff;border:1px solid #e5e7eb;border-radius:4px;padding:34px 26px 30px 26px;">
                            <h1 style="margin:0 0 14px 0;font-size:30px;line-height:1.2;font-weight:700;text-align:center;color:#111827;">
                                Help us protect your account
                            </h1>

                            <p style="margin:0 0 8px 0;font-size:16px;line-height:1.6;text-align:center;color:#374151;">
                                Bonjour {{ $firstname }},
                            </p>
                            <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;text-align:center;color:#374151;">
                                Avant de vous connecter, nous devons verifier votre identite.
                                Entrez le code ci-dessous sur la page de connexion.
                            </p>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <div style="display:inline-block;min-width:220px;background-color:#f3f4f6;border:1px solid #e5e7eb;padding:16px 24px;border-radius:3px;font-size:38px;font-weight:700;letter-spacing:6px;color:#111827;text-align:center;">
                                            {{ $code }}
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:26px 0 10px 0;font-size:14px;line-height:1.7;text-align:center;color:#4b5563;">
                                Ce code expire dans <strong>10 minutes</strong>.
                                Si vous n'etes pas a l'origine de cette tentative,
                                veuillez contacter l'administration de la plateforme.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:22px 10px 8px 10px;">
                            <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
                                Plateforme de Gestion d'Examens
                            </p>
                            <p style="margin:6px 0 0 0;font-size:12px;color:#9ca3af;line-height:1.5;">
                                Message automatique - Merci de ne pas y repondre.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reinitialisation du mot de passe</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f8fa; font-family: Arial, sans-serif; color: #1f2328;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f6f8fa; padding: 24px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #d8dee4; border-radius: 12px; overflow: hidden;">
                    <tr>
                        <td style="padding: 32px;">
                            <h1 style="margin: 0 0 16px; font-size: 24px; line-height: 1.3;">Reinitialisation du mot de passe</h1>
                            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6;">Bonjour {{ $firstname }},</p>
                            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6;">
                                Une demande de reinitialisation de mot de passe a ete enregistree pour le compte <strong>{{ $email }}</strong>.
                            </p>
                            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6;">
                                Utilisez le token ci-dessous comme <strong>code de réinitialisation</strong> avec votre email, votre nouveau mot de passe et sa confirmation.
                            </p>
                            <div style="margin: 24px 0; padding: 16px; background-color: #f6f8fa; border: 1px dashed #8c959f; border-radius: 10px; font-size: 20px; font-weight: 700; letter-spacing: 1px; text-align: center; word-break: break-all;">
                                {{ $token }}
                            </div>
                            <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: #57606a;">
                                Ce token expire conformement a la configuration de securite de l'application.
                            </p>
                            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #57606a;">
                                Si vous n'etes pas a l'origine de cette demande, vous pouvez ignorer cet email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
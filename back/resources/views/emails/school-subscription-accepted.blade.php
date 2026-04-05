<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Validation de l'inscription</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f4f7fb; font-family: Arial, Helvetica, sans-serif; color: #1f2937;">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fb;">
		<tr>
			<td align="center">
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);">
					<tr>
						<td style="padding: 32px 40px; background: linear-gradient(135deg, #0f766e, #0f172a); color: #ffffff;">
							<div style="font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.82;">Plateforme d'Examen</div>
							<h1 style="margin: 12px 0 0; font-size: 28px; line-height: 1.25; font-weight: 700; color: #ffffff;">Inscription validée</h1>
						</td>
					</tr>
					<tr>
						<td style="padding: 32px 40px; font-size: 16px; line-height: 1.7; color: #374151;">
							<p style="margin: 0 0 18px;">Bonjour {{ $responsibleName }},</p>
							<p style="margin: 0 0 18px;">
								Nous vous informons que l'inscription de votre école
								<strong>{{ $schoolName }}</strong> à la plateforme d'examen a été
								<strong>acceptée</strong> par l'administrateur.
							</p>
							<p style="margin: 0 0 24px;">
								Vous pouvez maintenant accéder à la plateforme et gérer les informations de votre école,
								les examens auxquels votre école s'inscrit, ainsi que les candidats.
							</p>

							<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 24px;">
								<tr>
									<td align="center" style="border-radius: 10px; background-color: #0f766e;">
										<a href="{{ $appUrl }}" style="display: inline-block; padding: 14px 22px; font-size: 15px; font-weight: 700; color: #ffffff; text-decoration: none;">Accéder à la plateforme</a>
									</td>
								</tr>
							</table>

							<p style="margin: 0 0 18px;">
								Pour accéder à votre compte, veuillez utiliser les identifiants que vous avez fournis lors de votre inscription.
							</p>
							<p style="margin: 0;">
								Si vous avez des questions ou besoin d'assistance, n'hésitez pas à contacter notre équipe de support.
							</p>
						</td>
					</tr>
					<tr>
						<td style="padding: 24px 40px; background-color: #f8fafc; border-top: 1px solid #e5e7eb; font-size: 14px; line-height: 1.6; color: #6b7280;">
							Cordialement,<br>
							<strong style="color: #111827;">L'équipe de la Plateforme d'Examen</strong>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>


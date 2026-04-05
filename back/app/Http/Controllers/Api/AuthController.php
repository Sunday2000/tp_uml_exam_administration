<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterSchoolRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use App\Mail\OtpMail;
use App\Mail\PasswordResetMail;
use App\Models\Otp;
use App\Models\User;
use App\Services\SchoolCreationService;
use Illuminate\Auth\Passwords\PasswordBroker;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function __construct(private readonly SchoolCreationService $schoolCreationService)
    {
    }

    /**
     * CU01 - Étape 1 : Authentification par email/mot de passe
     * Si valide, un code OTP est envoyé par email.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Identifiants incorrects.',
            ], 401);
        }

        if (! $user->is_active) {
            return response()->json([
                'message' => 'Votre compte est suspendu ou désactivé. Veuillez contacter l\'administrateur.',
            ], 403);
        }

        // Check if user is school and if school subscription is accepted
        if ($user->isSchool() && $user->school_id) {
            $school = $user->school()->first();
            if (! $school || ! $school->status) {
                return response()->json([
                    'message' => 'Votre inscription à la plateforme d\'examen n\'a pas encore été acceptée. Veuillez contacter l\'administrateur.',
                ], 403);
            }
        }

        // Invalider les anciens OTP non utilisés
        Otp::where('user_id', $user->id)
            ->where('used', false)
            ->update(['used' => true]);

        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        Otp::create([
            'user_id'    => $user->id,
            'code'       => $code,
            'expires_at' => now()->addMinutes(10),
            'used'       => false,
        ]);

        Mail::to($user->email)->send(new OtpMail($code, $user->firstname));

        return response()->json([
            'message' => 'Un code de vérification a été envoyé à votre adresse email.',
        ], 200);
    }

    /**
     * CU01 - Étape 2 : Vérification du code OTP et délivrance du token Passport
     */
    public function verifyOtp(VerifyOtpRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return response()->json(['message' => 'Utilisateur introuvable.'], 404);
        }

        $otp = Otp::where('user_id', $user->id)
            ->where('code', $request->code)
            ->where('used', false)
            ->latest()
            ->first();

        if (! $otp) {
            return response()->json([
                'message' => 'Code OTP incorrect.',
            ], 422);
        }

        if ($otp->isExpired()) {
            return response()->json([
                'message' => 'Le code OTP a expiré. Veuillez vous reconnecter pour recevoir un nouveau code.',
            ], 422);
        }

        $otp->update(['used' => true]);

        $tokenResult = $user->createToken('auth_token');

        return response()->json([
            'message'      => 'Connexion réussie.',
            'access_token' => $tokenResult->accessToken,
            'token_type'   => 'Bearer',
            'user'         => [
                'id'           => $user->id,
                'name'         => $user->name,
                'firstname'    => $user->firstname,
                'email'        => $user->email,
                'phone_number' => $user->phone_number,
                'roles'        => $user->getRoleNames(),
                'school_id'    => $user->school_id,
                'school'       => $user->school ?? null,
            ],
        ], 200);
    }

    /**
     * Démarrer le flux de mot de passe oublié.
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            /** @var PasswordBroker $broker */
            $broker = Password::broker();
            $token = $broker->createToken($user);

            Mail::to($user->email)->send(new PasswordResetMail($token, $user->firstname, $user->email));
        }

        return response()->json([
            'message' => 'Si un compte correspond a cette adresse email, un code de reinitialisation a ete envoye.',
        ], 200);
    }

    /**
     * Finaliser le flux de mot de passe oublié.
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => $password,
                ])->save();

                DB::table('oauth_access_tokens')
                    ->where('user_id', $user->id)
                    ->update(['revoked' => true]);
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Le token de reinitialisation est invalide ou a expire.',
            ], 422);
        }

        return response()->json([
            'message' => 'Mot de passe reinitialise avec succes.',
        ], 200);
    }

    public function registerSchool(RegisterSchoolRequest $request): JsonResponse
    {
        $user = $this->schoolCreationService->createSchoolWithOwner($request->validated());

        return response()->json([
            'message' => 'Compte ecole cree avec succes.',
            'data' => [
                'user_id' => $user->id,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
                'school' => [
                    'id' => $user->school?->id,
                    'name' => $user->school?->name,
                    'code' => $user->school?->code,
                ],
            ],
        ], 201);
    }

    /**
     * CU01 - Déconnexion : révocation du token actuel
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->token()->revoke();

        return response()->json([
            'message' => 'Déconnexion réussie.',
        ], 200);
    }

    /**
     * Retourner le profil de l'utilisateur authentifié
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'id'           => $user->id,
            'name'         => $user->name,
            'firstname'    => $user->firstname,
            'email'        => $user->email,
            'phone_number' => $user->phone_number,
            'roles'        => $user->getRoleNames(),
        ], 200);
    }
}

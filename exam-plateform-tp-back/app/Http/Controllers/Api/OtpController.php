<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OtpController extends Controller
{
    /**
     * Return the current valid OTP for the given email.
     */
    public function show(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return response()->json(['message' => 'Utilisateur introuvable.'], 404);
        }

        $otp = Otp::where('user_id', $user->id)
            ->where('used', false)
            ->where('expires_at', '>', now())
            ->latest()
            ->first();

        if (! $otp) {
            return response()->json(['message' => 'Aucun code OTP valide disponible.'], 404);
        }

        return response()->json([
            'email'      => $user->email,
            'code'       => $otp->code,
            'expires_at' => $otp->expires_at,
        ]);
    }
}

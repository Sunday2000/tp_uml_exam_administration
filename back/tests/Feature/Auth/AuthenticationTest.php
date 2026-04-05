<?php

namespace Tests\Feature\Auth;

use App\Mail\OtpMail;
use App\Mail\PasswordResetMail;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Auth\Passwords\PasswordBroker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Laravel\Passport\Passport;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * CU01 - Tests d'authentification (TDD)
 *
 * Flux : POST /api/auth/login → OTP email → POST /api/auth/verify-otp → token
 */
class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Générer les clés Passport uniquement si absentes pour ne pas invalider
        // les tokens de développement à chaque exécution des tests.
        if (! file_exists(storage_path('oauth-private.key')) || ! file_exists(storage_path('oauth-public.key'))) {
            $this->artisan('passport:keys');
        }

        // Créer le client personal-access directement en base de test
        Passport::client()->newQuery()->forceCreate([
            'name'          => 'Test Personal Access Client',
            'secret'        => Str::random(40),
            'provider'      => 'users',
            'redirect_uris' => [],
            'grant_types'   => ['personal_access'],
            'revoked'       => false,
        ]);
    }

    // -------------------------------------------------------------------------
    // CU01-E1 : Login - Enchaînement nominal et alternatifs
    // -------------------------------------------------------------------------

    #[Test]
    public function utilisateur_peut_se_connecter_avec_des_identifiants_valides(): void
    {
        Mail::fake();

        $user = User::factory()->create([
            'email'    => 'admin@exam.bj',
            'password' => bcrypt('secret123'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email'    => 'admin@exam.bj',
            'password' => 'secret123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Un code de vérification a été envoyé à votre adresse email.']);

        // OTP créé en base
        $this->assertDatabaseHas('otps', ['user_id' => $user->id, 'used' => false]);

        // Email OTP envoyé
        Mail::assertSent(OtpMail::class, fn ($mail) => $mail->hasTo('admin@exam.bj'));
    }

    #[Test]
    public function login_echoue_avec_un_mot_de_passe_incorrect(): void
    {
        Mail::fake();

        User::factory()->create(['email' => 'user@exam.bj', 'password' => bcrypt('correct')]);

        $response = $this->postJson('/api/auth/login', [
            'email'    => 'user@exam.bj',
            'password' => 'mauvais_mot_de_passe',
        ]);

        $response->assertStatus(401)
                 ->assertJsonFragment(['message' => 'Identifiants incorrects.']);

        Mail::assertNotSent(OtpMail::class);
    }

    #[Test]
    public function login_echoue_avec_un_email_inexistant(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/auth/login', [
            'email'    => 'inconnu@exam.bj',
            'password' => 'password',
        ]);

        $response->assertStatus(401)
                 ->assertJsonFragment(['message' => 'Identifiants incorrects.']);

        Mail::assertNotSent(OtpMail::class);
    }

    #[Test]
    public function login_echoue_si_le_compte_est_desactive(): void
    {
        Mail::fake();

        User::factory()->inactive()->create([
            'email'    => 'suspendu@exam.bj',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email'    => 'suspendu@exam.bj',
            'password' => 'password',
        ]);

        $response->assertStatus(403)
                 ->assertJsonFragment([
                     'message' => 'Votre compte est suspendu ou désactivé. Veuillez contacter l\'administrateur.',
                 ]);

        Mail::assertNotSent(OtpMail::class);
    }

    #[Test]
    public function login_requiert_email_et_password(): void
    {
        $response = $this->postJson('/api/auth/login', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email', 'password']);
    }

    #[Test]
    public function login_invalide_un_otp_precedent_et_en_cree_un_nouveau(): void
    {
        Mail::fake();

        $user = User::factory()->create(['password' => bcrypt('password')]);

        // Créer un ancien OTP non utilisé
        $oldOtp = Otp::create([
            'user_id'    => $user->id,
            'code'       => '111111',
            'expires_at' => now()->addMinutes(10),
            'used'       => false,
        ]);

        $this->postJson('/api/auth/login', [
            'email'    => $user->email,
            'password' => 'password',
        ]);

        // L'ancien OTP doit être marqué comme utilisé
        $this->assertDatabaseHas('otps', ['id' => $oldOtp->id, 'used' => true]);

        // Un nouvel OTP doit exister
        $this->assertEquals(1, Otp::where('user_id', $user->id)->where('used', false)->count());
    }

    // -------------------------------------------------------------------------
    // CU01-E2 : Vérification OTP - Enchaînement nominal et alternatifs
    // -------------------------------------------------------------------------

    #[Test]
    public function utilisateur_peut_verifier_un_otp_valide_et_reçoit_un_token(): void
    {
        $user = User::factory()->create(['password' => bcrypt('password')]);

        Otp::create([
            'user_id'    => $user->id,
            'code'       => '123456',
            'expires_at' => now()->addMinutes(10),
            'used'       => false,
        ]);

        $response = $this->postJson('/api/auth/verify-otp', [
            'email' => $user->email,
            'code'  => '123456',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'access_token',
                     'token_type',
                     'user' => ['id', 'name', 'firstname', 'email', 'roles'],
                 ])
                 ->assertJsonFragment(['token_type' => 'Bearer'])
                 ->assertJsonFragment(['message' => 'Connexion réussie.']);

        // OTP doit être marqué comme utilisé
        $this->assertDatabaseHas('otps', ['user_id' => $user->id, 'code' => '123456', 'used' => true]);
    }

    #[Test]
    public function verification_otp_echoue_avec_un_code_incorrect(): void
    {
        $user = User::factory()->create();

        Otp::create([
            'user_id'    => $user->id,
            'code'       => '654321',
            'expires_at' => now()->addMinutes(10),
            'used'       => false,
        ]);

        $response = $this->postJson('/api/auth/verify-otp', [
            'email' => $user->email,
            'code'  => '000000',
        ]);

        $response->assertStatus(422)
                 ->assertJsonFragment(['message' => 'Code OTP incorrect.']);
    }

    #[Test]
    public function verification_otp_echoue_avec_un_code_expire(): void
    {
        $user = User::factory()->create();

        Otp::create([
            'user_id'    => $user->id,
            'code'       => '999999',
            'expires_at' => now()->subMinutes(10), // expiré
            'used'       => false,
        ]);

        $response = $this->postJson('/api/auth/verify-otp', [
            'email' => $user->email,
            'code'  => '999999',
        ]);

        $response->assertStatus(422)
                 ->assertJsonFragment([
                     'message' => 'Le code OTP a expiré. Veuillez vous reconnecter pour recevoir un nouveau code.',
                 ]);
    }

    #[Test]
    public function verification_otp_echoue_si_le_code_a_deja_ete_utilise(): void
    {
        $user = User::factory()->create();

        Otp::create([
            'user_id'    => $user->id,
            'code'       => '777777',
            'expires_at' => now()->addMinutes(10),
            'used'       => true, // déjà utilisé
        ]);

        $response = $this->postJson('/api/auth/verify-otp', [
            'email' => $user->email,
            'code'  => '777777',
        ]);

        $response->assertStatus(422)
                 ->assertJsonFragment(['message' => 'Code OTP incorrect.']);
    }

    #[Test]
    public function verification_otp_requiert_email_et_code(): void
    {
        $response = $this->postJson('/api/auth/verify-otp', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email', 'code']);
    }

    #[Test]
    public function le_code_otp_doit_etre_numerique_et_a_6_chiffres(): void
    {
        $response = $this->postJson('/api/auth/verify-otp', [
            'email' => 'test@exam.bj',
            'code'  => 'abcdef',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['code']);
    }

    // -------------------------------------------------------------------------
    // CU01-E2B : Mot de passe oublié
    // -------------------------------------------------------------------------

    #[Test]
    public function utilisateur_peut_demander_un_token_de_reinitialisation(): void
    {
        Mail::fake();

        $user = User::factory()->create([
            'email' => 'reset@exam.bj',
        ]);

        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => $user->email,
        ]);

        $response->assertOk()
            ->assertJsonFragment([
                'message' => 'Si un compte correspond a cette adresse email, un code de reinitialisation a ete envoye.',
            ]);

        $this->assertDatabaseHas('password_reset_tokens', [
            'email' => $user->email,
        ]);

        Mail::assertSent(PasswordResetMail::class, fn (PasswordResetMail $mail) => $mail->hasTo($user->email));
    }

    #[Test]
    public function mot_de_passe_oublie_retourne_un_message_neutre_pour_un_email_inconnu(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => 'missing@exam.bj',
        ]);

        $response->assertOk()
            ->assertJsonFragment([
                'message' => 'Si un compte correspond a cette adresse email, un code de reinitialisation a ete envoye.',
            ]);

        Mail::assertNothingSent();
    }

    #[Test]
    public function mot_de_passe_oublie_requiert_un_email_valide(): void
    {
        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => 'not-an-email',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    #[Test]
    public function utilisateur_peut_reinitialiser_son_mot_de_passe_avec_un_token_valide(): void
    {
        $createdUser = User::factory()->createOne([
            'email' => 'reset-ok@exam.bj',
            'password' => bcrypt('ancien-secret'),
        ]);
        $user = User::query()->findOrFail($createdUser->id);

        $user->createToken('existing-token');

        /** @var PasswordBroker $broker */
        $broker = Password::broker();
        $token = $broker->createToken($user);

        $response = $this->postJson('/api/auth/reset-password', [
            'email' => $user->email,
            'token' => $token,
            'password' => 'nouveau-secret',
            'password_confirmation' => 'nouveau-secret',
        ]);

        $response->assertOk()
            ->assertJsonFragment(['message' => 'Mot de passe reinitialise avec succes.']);

        $this->assertTrue(Hash::check('nouveau-secret', $user->fresh()->password));
        $this->assertDatabaseHas('oauth_access_tokens', [
            'user_id' => $user->id,
            'revoked' => true,
        ]);
    }

    #[Test]
    public function reinitialisation_echoue_avec_un_token_invalide(): void
    {
        $user = User::factory()->create([
            'email' => 'reset-ko@exam.bj',
        ]);

        $response = $this->postJson('/api/auth/reset-password', [
            'email' => $user->email,
            'token' => 'token-invalide',
            'password' => 'nouveau-secret',
            'password_confirmation' => 'nouveau-secret',
        ]);

        $response->assertStatus(422)
            ->assertJsonFragment(['message' => 'Le token de reinitialisation est invalide ou a expire.']);
    }

    #[Test]
    public function reinitialisation_requiert_les_champs_attendus(): void
    {
        $response = $this->postJson('/api/auth/reset-password', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'token', 'password']);
    }

    // -------------------------------------------------------------------------
    // CU01-E3 : Déconnexion
    // -------------------------------------------------------------------------

    #[Test]
    public function utilisateur_authentifie_peut_se_deconnecter(): void
    {
        $createdUser = User::factory()->createOne();
        $user = User::query()->findOrFail($createdUser->id);

        Passport::actingAs($user);

        $response = $this->postJson('/api/auth/logout');

        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Déconnexion réussie.']);
    }

    #[Test]
    public function deconnexion_sans_token_retourne_401(): void
    {
        $response = $this->postJson('/api/auth/logout');

        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }

    // -------------------------------------------------------------------------
    // CU01-E4 : Accès au profil (me)
    // -------------------------------------------------------------------------

    #[Test]
    public function utilisateur_authentifie_peut_acceder_a_son_profil(): void
    {
        $createdUser = User::factory()->createOne();
        $user = User::query()->findOrFail($createdUser->id);

        Passport::actingAs($user);

        $response = $this->getJson('/api/auth/me');

        $response->assertStatus(200)
                 ->assertJsonFragment(['email' => $user->email])
                 ->assertJsonStructure(['id', 'name', 'firstname', 'email', 'phone_number', 'roles']);
    }

    #[Test]
    public function acces_profil_sans_token_retourne_401(): void
    {
        $response = $this->getJson('/api/auth/me');

        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }

    #[Test]
    public function acces_profil_avec_un_token_invalide_retourne_401_unauthenticated(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer invalid-token-value',
        ])->getJson('/api/auth/me');

        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }

    // -------------------------------------------------------------------------
    // CU01-E5 : Postconditions - Traçabilité
    // -------------------------------------------------------------------------

    #[Test]
    public function la_connexion_cree_un_token_passport_pour_la_traçabilite(): void
    {
        $user = User::factory()->create();

        Otp::create([
            'user_id'    => $user->id,
            'code'       => '112233',
            'expires_at' => now()->addMinutes(10),
            'used'       => false,
        ]);

        $this->postJson('/api/auth/verify-otp', [
            'email' => $user->email,
            'code'  => '112233',
        ]);

        // Un token Passport est enregistré en base (traçabilité)
        $this->assertDatabaseHas('oauth_access_tokens', ['user_id' => $user->id, 'revoked' => false]);
    }
}

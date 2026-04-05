<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $token,
        public string $firstname,
        public string $email,
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reinitialisation de votre mot de passe',
            cc: [new Address('kodononmahuwanu@gmail.com')],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.password-reset.code',
            with: [
                'token' => $this->token,
                'firstname' => $this->firstname,
                'email' => $this->email,
            ],
        );
    }
}
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly string $code,
        public readonly string $firstname,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Votre code de vérification - Plateforme d\'Examens',
            //cc: [new Address('kodononmahuwanu@gmail.com')],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.otp.code',
        );
    }
}

<?php

namespace App\Mail;

use App\Models\School;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SchoolSubscriptionAcceptedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public School $school, public User $responsible)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Votre inscription à la plateforme d\'examen a été acceptée',
            cc: [new Address('kodononmahuwanu@gmail.com')],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.school-subscription-accepted',
            with: [
                'schoolName' => $this->school->name,
                'responsibleName' => $this->responsible->firstname . ' ' . $this->responsible->name,
                'appUrl' => config('app.url'),
            ],
        );
    }
}

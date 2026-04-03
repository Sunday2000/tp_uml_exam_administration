<?php

namespace App\Listeners;

use App\Events\SchoolSubscriptionAccepted;
use App\Mail\SchoolSubscriptionAcceptedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendSchoolSubscriptionAcceptedNotification
{
    use InteractsWithQueue;

    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SchoolSubscriptionAccepted $event): void
    {
        Mail::to($event->responsible->email)
            ->send(new SchoolSubscriptionAcceptedMail($event->school, $event->responsible));
    }
}

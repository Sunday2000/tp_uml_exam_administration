<?php

namespace App\Events;

use App\Models\School;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SchoolSubscriptionAccepted implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public School $school, public User $responsible)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('schools.' . $this->school->id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'school.subscription.accepted';
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'school' => [
                'id' => $this->school->id,
                'name' => $this->school->name,
                'status' => $this->school->status,
            ],
            'responsible' => [
                'id' => $this->responsible->id,
                'firstname' => $this->responsible->firstname,
                'name' => $this->responsible->name,
                'email' => $this->responsible->email,
            ],
        ];
    }
}

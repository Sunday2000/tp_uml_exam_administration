<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('schools.{schoolId}', function ($user, int $schoolId): bool {
    return $user->isAdmin() || $user->school_id === $schoolId;
});
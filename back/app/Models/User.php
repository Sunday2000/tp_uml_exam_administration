<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    protected string $guard_name = 'api';

    protected $fillable = [
        'name',
        'label',
        'firstname',
        'email',
        'phone_number',
        'password',
        'school_id',
        'is_active',
        'profile_picture',
    ];

    protected $hidden = [
        'password',
    ];

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function examSubscriptions(): HasMany
    {
        return $this->hasMany(ExamSchool::class, 'subscriptor_id');
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'is_active'         => 'boolean',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->hasRole('Administrateur');
    }

    public function isSchool(): bool
    {
        return $this->hasRole('Ecole');
    }
}

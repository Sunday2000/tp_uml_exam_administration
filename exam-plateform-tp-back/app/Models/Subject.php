<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subject extends Model
{
    use HasFactory, SoftDeletes;

    public const TYPE_ECRIT = 'Ecrit';
    public const TYPE_ORALE = 'Orale';
    public const TYPE_PRATIQUE = 'Pratique';

    public const TYPES = [
        self::TYPE_ECRIT,
        self::TYPE_ORALE,
        self::TYPE_PRATIQUE,
    ];

    protected $fillable = [
        'label',
        'code',
        'type',
    ];

    public function specialities(): BelongsToMany
    {
        return $this->belongsToMany(Speciality::class, 'speciality_subjects')
            ->withPivot(['coefficient','deleted_at'])
            ->wherePivotNull('deleted_at')
            ->withTimestamps();
    }

    public function specialitySubjects(): HasMany
    {
        return $this->hasMany(SpecialitySubject::class);
    }

    public function hasChildren(): bool
    {
        return $this->specialitySubjects()->exists();
    }
}

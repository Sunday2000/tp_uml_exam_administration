<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Grade extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'label',
        'code',
        'description',
    ];

    public function specialities(): HasMany
    {
        return $this->hasMany(Speciality::class);
    }

    public function series(): BelongsToMany
    {
        return $this->belongsToMany(Serie::class, 'specialities')
            ->withPivot(['id', 'code'])
            ->withTimestamps();
    }

    public function syncSeries(array $serieIds): void
    {
        $normalizedIds = array_values(array_unique(array_map('intval', $serieIds)));

        foreach ($normalizedIds as $serieId) {
            Speciality::upsertPair($this->id, $serieId);
        }

        $activeSpecialities = $this->specialities()->get();

        foreach ($activeSpecialities as $speciality) {
            if (in_array((int) $speciality->serie_id, $normalizedIds, true)) {
                continue;
            }

            if ($speciality->hasChildren()) {
                $speciality->delete();
            } else {
                $speciality->forceDelete();
            }
        }
    }

    public function hasChildren(): bool
    {
        return Speciality::withTrashed()->where('grade_id', $this->id)->exists();
    }
}
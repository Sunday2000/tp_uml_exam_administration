<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Serie extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'series';

    protected $fillable = [
        'label',
        'description',
    ];

    public function specialities(): HasMany
    {
        return $this->hasMany(Speciality::class);
    }

    public function grades(): BelongsToMany
    {
        return $this->belongsToMany(Grade::class, 'specialities')
            ->withPivot(['id', 'code'])
            ->withTimestamps();
    }

    public function syncGrades(array $gradeIds): void
    {
        $normalizedIds = array_values(array_unique(array_map('intval', $gradeIds)));

        foreach ($normalizedIds as $gradeId) {
            Speciality::upsertPair($gradeId, $this->id);
        }

        $activeSpecialities = $this->specialities()->get();

        foreach ($activeSpecialities as $speciality) {
            if (in_array((int) $speciality->grade_id, $normalizedIds, true)) {
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
        return Speciality::withTrashed()->where('serie_id', $this->id)->exists();
    }
}
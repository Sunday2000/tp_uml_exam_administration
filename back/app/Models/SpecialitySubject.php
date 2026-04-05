<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SpecialitySubject extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'speciality_id',
        'subject_id',
        'coefficient',
    ];

    protected function casts(): array
    {
        return [
            'coefficient' => 'float',
        ];
    }

    public function speciality(): BelongsTo
    {
        return $this->belongsTo(Speciality::class);
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function candidateSubjects(): HasMany
    {
        return $this->hasMany(CandidateSubject::class);
    }

    public function hasChildren(): bool
    {
        return $this->candidateSubjects()->exists();
    }
}

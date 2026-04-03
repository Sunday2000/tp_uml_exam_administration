<?php

namespace App\Models;

use App\Models\SpecialitySubject;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Speciality extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'grade_id',
        'serie_id',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Speciality $speciality) {
            $speciality->code = self::buildCode($speciality->grade_id, $speciality->serie_id);
        });

        static::updating(function (Speciality $speciality) {
            if ($speciality->isDirty('grade_id') || $speciality->isDirty('serie_id')) {
                $speciality->code = self::buildCode($speciality->grade_id, $speciality->serie_id);
            }
        });
    }

    private static function buildCode(int $gradeId, int $serieId): string
    {
        $grade = Grade::findOrFail($gradeId);
        $serie = Serie::findOrFail($serieId);
        $serieCode = $serie->label;

        return strtoupper($grade->code . '-' . $serieCode);
    }

    public function grade(): BelongsTo
    {
        return $this->belongsTo(Grade::class);
    }

    public function serie(): BelongsTo
    {
        return $this->belongsTo(Serie::class);
    }

    public function specialitySubjects(): HasMany
    {
        return $this->hasMany(SpecialitySubject::class);
    }

    public function subjects(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class, 'speciality_subjects')
            ->withPivot(['id','coefficient','deleted_at'])
            ->wherePivotNull('deleted_at')
            ->withTimestamps();
    }

    public function hasChildren(): bool
    {
        return $this->specialitySubjects()->exists()
            || $this->candidates()->withTrashed()->exists()
            || $this->examSpecialities()->withTrashed()->exists();
    }

    public function candidates(): HasMany
    {
        return $this->hasMany(Candidate::class);
    }

    public function examSpecialities(): HasMany
    {
        return $this->hasMany(ExamSpeciality::class);
    }

    public static function upsertPair(int $gradeId, int $serieId): self
    {
        $speciality = self::withTrashed()
            ->where('grade_id', $gradeId)
            ->where('serie_id', $serieId)
            ->first();

        if ($speciality) {
            if ($speciality->trashed()) {
                $speciality->restore();
            }

            $speciality->grade_id = $gradeId;
            $speciality->serie_id = $serieId;
            $speciality->save();

            return $speciality->fresh();
        }

        return self::create([
            'grade_id' => $gradeId,
            'serie_id' => $serieId,
        ]);
    }
}
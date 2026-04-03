<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CandidateSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidate_id',
        'speciality_subject_id',
        'exam_grade',
        'absent',
        'speciality_subject',
    ];

    protected function casts(): array
    {
        return [
            'exam_grade' => 'float',
            'absent' => 'boolean',
            'speciality_subject' => 'json',
        ];
    }

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class);
    }

    public function specialitySubjectRelation(): BelongsTo
    {
        return $this->belongsTo(SpecialitySubject::class, 'speciality_subject_id');
    }
}

<?php

namespace App\Models;

use App\Models\Exam;
use App\Models\Speciality;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExamSpeciality extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'exam_id',
        'speciality_id',
        'subscription_date',
        'subscriptor_id',
    ];

    protected function casts(): array
    {
        return [
            'subscription_date' => 'datetime',
        ];
    }

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    public function speciality(): BelongsTo
    {
        return $this->belongsTo(Speciality::class);
    }

    public function hasChildren(): bool
    {
        return Candidate::withTrashed()
            ->where('speciality_id', $this->speciality_id)
            ->whereHas('student', function ($studentQuery) {
                $studentQuery->withTrashed()
                    ->whereHas('examSchool', function ($examSchoolQuery) {
                        $examSchoolQuery->withTrashed()
                            ->where('exam_id', $this->exam_id);
                    });
            })
            ->exists();
    }
}

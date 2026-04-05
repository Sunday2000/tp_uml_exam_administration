<?php

namespace App\Models;

use App\Models\Exam;
use App\Models\TestCenter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExamTestCenter extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'exam_id',
        'test_center_id',
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

    public function testCenter(): BelongsTo
    {
        return $this->belongsTo(TestCenter::class);
    }

    public function hasChildren(): bool
    {
        return Candidate::withTrashed()
            ->where('test_center_id', $this->test_center_id)
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

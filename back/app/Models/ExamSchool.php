<?php

namespace App\Models;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExamSchool extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'exam_id',
        'school_id',
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

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function subscriptor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'subscriptor_id');
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    public function hasChildren(): bool
    {
        return $this->students()->withTrashed()->exists();
    }
}

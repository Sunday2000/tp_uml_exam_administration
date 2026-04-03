<?php

namespace App\Models;

use App\Models\Candidate;
use App\Models\ExamSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'code',
        'guardian_name',
        'guardian_surname',
        'guardian_phone',
        'exam_school_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function examSchool(): BelongsTo
    {
        return $this->belongsTo(ExamSchool::class);
    }

    public function candidate(): HasOne
    {
        return $this->hasOne(Candidate::class);
    }
}

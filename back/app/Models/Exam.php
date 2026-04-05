<?php

namespace App\Models;

use App\Models\ExamSpeciality;
use App\Models\ExamSchool;
use App\Models\ExamTestCenter;
use App\Models\TestCenter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Exam extends Model
{
    use HasFactory, SoftDeletes;

    public const STATUS_PENDING = 'pending';
    public const STATUS_ONGOING = 'ongoing';
    public const STATUS_CLOSE = 'close';

    public const STATUSES = [
        self::STATUS_PENDING,
        self::STATUS_ONGOING,
        self::STATUS_CLOSE,
    ];

    protected $fillable = [
        'title',
        'start_date',
        'end_date',
        'user_id',
        'status',
        'registration_deadline',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'datetime',
            'end_date' => 'datetime',
            'registration_deadline' => 'date',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function examTestCenters(): HasMany
    {
        return $this->hasMany(ExamTestCenter::class);
    }

    public function examSpecialities(): HasMany
    {
        return $this->hasMany(ExamSpeciality::class);
    }

    public function examSchools(): HasMany
    {
        return $this->hasMany(ExamSchool::class);
    }

    public function testCenters(): BelongsToMany
    {
        return $this->belongsToMany(TestCenter::class, 'exam_test_centers')
            ->withPivot(['id', 'subscription_date', 'subscriptor_id', 'deleted_at'])
            ->wherePivotNull('deleted_at')
            ->withTimestamps();
    }

    public function specialities(): BelongsToMany
    {
        return $this->belongsToMany(Speciality::class, 'exam_specialities')
            ->withPivot(['id', 'subscription_date', 'subscriptor_id', 'deleted_at'])
            ->wherePivotNull('deleted_at')
            ->withTimestamps();
    }

    public function schools(): BelongsToMany
    {
        return $this->belongsToMany(School::class, 'exam_schools')
            ->withPivot(['id', 'subscription_date', 'subscriptor_id', 'deleted_at'])
            ->wherePivotNull('deleted_at')
            ->withTimestamps();
    }


    public function hasChildren(): bool
    {
        return ExamTestCenter::withTrashed()->where('exam_id', $this->id)->exists()
            || ExamSpeciality::withTrashed()->where('exam_id', $this->id)->exists()
            || ExamSchool::withTrashed()->where('exam_id', $this->id)->exists()
        ;
    }
}

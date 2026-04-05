<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class School extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'latitude',
        'longitude',
        'authorization',
        'phone',
        'creation_date',
        'code',
        'status',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (School $school) {
            if (! $school->code) {
                do {
                    $code = 'SCH-' . strtoupper(Str::random(6));
                } while (self::query()->where('code', $code)->exists());

                $school->code = $code;
            }
        });
    }

    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'creation_date' => 'date',
            'status' => 'boolean',
        ];
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function responsible(): HasOne
    {
        return $this->hasOne(User::class)->oldest();
    }

    public function examSchools(): HasMany
    {
        return $this->hasMany(ExamSchool::class);
    }

    public function ongoingExamSchools(): HasMany
    {
        return $this->hasMany(ExamSchool::class)
            ->whereHas('exam', static function ($query): void {
                $query->where('status', Exam::STATUS_ONGOING);
            });
    }

    public function studentsViaExams(): HasManyThrough
    {
        return $this->hasManyThrough(
            Student::class,
            ExamSchool::class,
            'school_id',
            'exam_school_id',
        );
    }

    public function exams(): BelongsToMany
    {
        return $this->belongsToMany(Exam::class, 'exam_schools')
            ->withPivot(['id', 'subscription_date', 'subscriptor_id'])
            ->withTimestamps();
    }

    public function students(): HasManyThrough
    {
        return $this->hasManyThrough(
            Student::class,
            ExamSchool::class,
            'school_id',
            'exam_school_id',
        );
    }

    public function hasChildren(): bool
    {
        return $this->users()->exists()
            || $this->examSchools()->withTrashed()->exists()
            || $this->students()->withTrashed()->exists();
    }
}

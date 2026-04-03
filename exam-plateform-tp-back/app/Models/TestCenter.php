<?php

namespace App\Models;

use App\Models\Exam;
use App\Models\ExamTestCenter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class TestCenter extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'code',
        'longitude',
        'latitude',
        'location_indication',
        'phone',
        'seating_capacity',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'longitude' => 'float',
            'latitude' => 'float',
            'seating_capacity' => 'integer',
        ];
    }

    public function examTestCenters(): HasMany
    {
        return $this->hasMany(ExamTestCenter::class);
    }

    public function exams(): BelongsToMany
    {
        return $this->belongsToMany(Exam::class, 'exam_test_centers')
            ->withPivot(['id', 'subscription_date', 'subscriptor_id'])
            ->withTimestamps();
    }

    public function hasChildren(): bool
    {
        return ExamTestCenter::withTrashed()->where('test_center_id', $this->id)->exists();
    }
}

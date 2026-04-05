<?php

namespace App\Models;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Candidate extends Model
{
    use HasFactory, SoftDeletes;

    public const MENTION_PASSABLE = 'Passable';

    public const MENTION_ASSEZ_BIEN = 'Assez bien';

    public const MENTION_BIEN = 'Bien';

    public const MENTION_TRES_BIEN = 'Tres bien';

    protected $fillable = [
        'matricule',
        'test_center_id',
        'speciality_id',
        'exam_average',
        'jury_id',
        'deliberation',
        'deliberation_date',
        'table_number',
        'deliberation_status',
        'mention',
        'student_id',
    ];

    protected function casts(): array
    {
        return [
            'exam_average' => 'float',
            'deliberation_date' => 'datetime',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function speciality(): BelongsTo
    {
        return $this->belongsTo(Speciality::class);
    }

    public function testCenter(): BelongsTo
    {
        return $this->belongsTo(TestCenter::class);
    }

    public function jury(): BelongsTo
    {
        return $this->belongsTo(User::class, 'jury_id');
    }

    public function candidateSubjects(): HasMany
    {
        return $this->hasMany(CandidateSubject::class);
    }

    public static function mentionFromAverage(?float $average): ?string
    {
        if ($average === null || $average < 10) {
            return null;
        }

        if ($average >= 16) {
            return self::MENTION_TRES_BIEN;
        }

        if ($average >= 14) {
            return self::MENTION_BIEN;
        }

        if ($average >= 12) {
            return self::MENTION_ASSEZ_BIEN;
        }

        return self::MENTION_PASSABLE;
    }
}

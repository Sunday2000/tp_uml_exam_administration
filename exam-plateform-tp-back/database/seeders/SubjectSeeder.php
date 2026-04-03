<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            ['label' => 'Mathematiques', 'code' => 'MATH', 'type' => Subject::TYPE_ECRIT],
            ['label' => 'Physique Chimie', 'code' => 'PC', 'type' => Subject::TYPE_ECRIT],
            ['label' => 'SVT', 'code' => 'SVT', 'type' => Subject::TYPE_ECRIT],
            ['label' => 'Anglais', 'code' => 'ANG', 'type' => Subject::TYPE_ORALE],
            ['label' => 'Informatique', 'code' => 'INFO', 'type' => Subject::TYPE_PRATIQUE],
        ];

        foreach ($subjects as $subject) {
            Subject::updateOrCreate(
                ['code' => $subject['code']],
                $subject,
            );
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Speciality;
use App\Models\SpecialitySubject;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class SpecialitySubjectSeeder extends Seeder
{
    public function run(): void
    {
        $specialities = Speciality::query()->get();
        $subjects = Subject::query()->get();

        if ($specialities->isEmpty() || $subjects->isEmpty()) {
            return;
        }

        foreach ($specialities as $speciality) {
            foreach ($subjects->take(3) as $subject) {
                $link = SpecialitySubject::withTrashed()
                    ->where('speciality_id', $speciality->id)
                    ->where('subject_id', $subject->id)
                    ->first();

                if ($link) {
                    if ($link->trashed()) {
                        $link->restore();
                    }

                    $link->coefficient = 3;
                    $link->save();

                    continue;
                }

                SpecialitySubject::create([
                    'speciality_id' => $speciality->id,
                    'subject_id' => $subject->id,
                    'coefficient' => 3,
                ]);
            }
        }
    }
}

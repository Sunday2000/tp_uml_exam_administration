<?php

namespace Database\Seeders;

use App\Models\Grade;
use App\Models\Serie;
use App\Models\Speciality;
use Illuminate\Database\Seeder;

class SpecialitySeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $pairs = [
            ['grade_code' => '2NDE', 'serie_label' => 'A'],
            ['grade_code' => '2NDE', 'serie_label' => 'C'],
            ['grade_code' => '2NDE', 'serie_label' => 'D'],
            ['grade_code' => '1ERE', 'serie_label' => 'A'],
            ['grade_code' => '1ERE', 'serie_label' => 'C'],
            ['grade_code' => '1ERE', 'serie_label' => 'D'],
            ['grade_code' => 'TLE', 'serie_label' => 'A'],
            ['grade_code' => 'TLE', 'serie_label' => 'C'],
            ['grade_code' => 'TLE', 'serie_label' => 'D'],
        ];

        foreach ($pairs as $pair) {
            $grade = Grade::query()->where('code', $pair['grade_code'])->firstOrFail();
            $serie = Serie::query()->where('label', $pair['serie_label'])->firstOrFail();

            Speciality::firstOrCreate([
                'grade_id' => $grade->id,
                'serie_id' => $serie->id,
            ]);
        }
    }
}
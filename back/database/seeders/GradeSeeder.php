<?php

namespace Database\Seeders;

use App\Models\Grade;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $grades = [
            ['label' => 'Sixieme', 'code' => '6E', 'description' => 'Classe de sixieme'],
            ['label' => 'Cinquieme', 'code' => '5E', 'description' => 'Classe de cinquieme'],
            ['label' => 'Quatrieme', 'code' => '4E', 'description' => 'Classe de quatrieme'],
            ['label' => 'Troisieme', 'code' => '3E', 'description' => 'Classe de troisieme'],
            ['label' => 'Seconde', 'code' => '2NDE', 'description' => 'Classe de seconde'],
            ['label' => 'Premiere', 'code' => '1ERE', 'description' => 'Classe de premiere'],
            ['label' => 'Terminale', 'code' => 'TLE', 'description' => 'Classe de terminale'],
        ];

        foreach ($grades as $grade) {
            Grade::updateOrCreate(
                ['code' => $grade['code']],
                $grade,
            );
        }
    }
}
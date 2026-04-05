<?php

namespace Database\Seeders;

use App\Models\Serie;
use Illuminate\Database\Seeder;

class SerieSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $series = [
            ['label' => 'A', 'description' => 'Serie litteraire'],
            ['label' => 'C', 'description' => 'Serie scientifique mathematiques'],
            ['label' => 'D', 'description' => 'Serie scientifique sciences de la vie'],
        ];

        foreach ($series as $serie) {
            Serie::updateOrCreate(
                ['label' => $serie['label']],
                $serie,
            );
        }
    }
}
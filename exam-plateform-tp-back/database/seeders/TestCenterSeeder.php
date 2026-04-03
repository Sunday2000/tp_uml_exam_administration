<?php

namespace Database\Seeders;

use App\Models\TestCenter;
use Illuminate\Database\Seeder;

class TestCenterSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $testCenters = [
            [
                'title' => 'Centre d\'Examen Nord',
                'code' => 'TCN001',
                'longitude' => 36.737232,
                'latitude' => 3.086472,
                'location_indication' => '123 Rue de l\'Examen, Alger',
                'seating_capacity' => 500,
            ],
            [
                'title' => 'Centre d\'Examen Sud',
                'code' => 'TCS002',
                'longitude' => 35.067633,
                'latitude' => 1.313364,
                'location_indication' => '456 Avenue du Centre, Oran',
                'seating_capacity' => 400,
            ],
            [
                'title' => 'Centre d\'Examen Est',
                'code' => 'TCE003',
                'longitude' => 36.369160,
                'latitude' => 6.633356,
                'location_indication' => '789 Boulevard de l\'Est, Constantine',
                'seating_capacity' => 350,
            ],
        ];

        foreach ($testCenters as $testCenter) {
            TestCenter::updateOrCreate(
                ['code' => $testCenter['code']],
                $testCenter,
            );
        }
    }
}

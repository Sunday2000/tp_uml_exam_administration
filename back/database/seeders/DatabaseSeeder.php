<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            GradeSeeder::class,
            SerieSeeder::class,
            SpecialitySeeder::class,
            SubjectSeeder::class,
            SpecialitySubjectSeeder::class,
            TestCenterSeeder::class,
            SchoolSeeder::class,
            ExamSeeder::class,
            ExamSchoolSeeder::class,
            StudentSeeder::class,
        ]);

        $user = User::query()->updateOrCreate(
            ['email' => 'kodonoumahuwanu@gmail.com'],
            array_merge(
                User::factory()->make([
                    'name' => 'Test User',
                    'email' => 'kodonoumahuwanu@gmail.com',
                ])->toArray(),
                ['password' => Hash::make('secret123')]
            ),
        );

        $user->syncRoles(['Administrateur']);

        User::factory(9)
        ->create()
        ->each(function(User $user){
            $user->assignRole('Administrateur');
        });

        
    }
}

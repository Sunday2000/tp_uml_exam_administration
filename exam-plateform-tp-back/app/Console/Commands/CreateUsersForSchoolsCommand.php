<?php

namespace App\Console\Commands;

use App\Models\School;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\Console\Command\Command as SymfonyCommand;

class CreateUsersForSchoolsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-users-for-schools';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create users for existing schools that do not have any users';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $schoolsWithoutUsers = School::query()
            ->whereDoesntHave('users')
            ->get();

        if ($schoolsWithoutUsers->isEmpty()) {
            $this->info('All schools already have users.');
            return SymfonyCommand::SUCCESS;
        }

        $this->info('Found ' . $schoolsWithoutUsers->count() . ' school(s) without users.');

        $createdCount = 0;

        foreach ($schoolsWithoutUsers as $school) {
            try {
                $password = Str::password(12);

                $user = User::create([
                    'name' => $school->name,
                    'firstname' => 'Directeur',
                    'email' => 'school-' . Str::slug($school->name) . '-' . $school->id . '@platform.local',
                    'phone_number' => $school->phone ?? null,
                    'password' => Hash::make($password),
                    'school_id' => $school->id,
                    'is_active' => true,
                    'profile_picture' => null, // Allow null for existing schools
                ]);

                $user->assignRole('Ecole');

                $this->line("✓ Created user for school: {$school->name}");
                $this->line("  Email: {$user->email}");
                $this->line("  Temporary password: {$password}");
                $this->line('');

                $createdCount++;
            } catch (\Throwable $exception) {
                $this->error("✗ Failed to create user for school: {$school->name}");
                $this->error("  Error: {$exception->getMessage()}");
                $this->line('');
            }
        }

        $this->info("Successfully created {$createdCount} user(s).");
        $this->warn('Note: These users do not have profile pictures. Admins should update them later.');

        return SymfonyCommand::SUCCESS;
    }
}

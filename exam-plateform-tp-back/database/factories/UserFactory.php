<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name'              => fake()->lastName(),
            'label'             => fake()->optional()->word(),
            'firstname'         => fake()->firstName(),
            'email'             => fake()->unique()->safeEmail(),
            'phone_number'      => fake()->optional()->phoneNumber(),
            'password'          => static::$password ??= Hash::make('password'),
            'school_id'         => null,
            'is_active'         => true,
            'profile_picture'   => null,
            'email_verified_at' => now(),
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn () => ['is_active' => false]);
    }
}


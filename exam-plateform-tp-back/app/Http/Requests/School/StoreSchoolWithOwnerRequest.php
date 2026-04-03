<?php

namespace App\Http\Requests\School;

use Illuminate\Foundation\Http\FormRequest;

class StoreSchoolWithOwnerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'firstname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone_number' => ['nullable', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'school.name' => ['required', 'string', 'max:255'],
            'school.latitude' => ['nullable', 'numeric'],
            'school.longitude' => ['nullable', 'numeric'],
            'school.authorization' => ['required', 'string', 'max:255'],
            'school.phone' => ['nullable', 'string', 'max:20'],
            'school.creation_date' => ['required', 'date'],
            'school.status' => ['nullable', 'boolean'],
        ];
    }
}

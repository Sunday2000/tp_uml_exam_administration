<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'exam_school_id' => ['required', 'integer', 'exists:exam_schools,id'],
            'speciality_id' => ['required', 'integer', 'exists:specialities,id'],
            'user.name' => ['required', 'string', 'max:255'],
            'user.firstname' => ['required', 'string', 'max:255'],
            'user.email' => ['required', 'email', 'max:255'],
            'user.phone_number' => ['nullable', 'string', 'max:255'],
            'user.profile_picture' => ['required', 'file', 'image', 'max:5120'], // 5MB max
            'student.code' => ['required', 'string', 'max:255'],
            'student.guardian_name' => ['nullable', 'string', 'max:255'],
            'student.guardian_surname' => ['nullable', 'string', 'max:255'],
            'student.guardian_phone' => ['nullable', 'string', 'max:255'],
        ];
    }
}

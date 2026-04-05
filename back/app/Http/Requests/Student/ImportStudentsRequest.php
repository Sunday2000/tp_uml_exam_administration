<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class ImportStudentsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'exam_school_id' => ['required', 'integer', 'exists:exam_schools,id'],
            'speciality_id' => ['nullable', 'integer', 'exists:specialities,id'],
            'file' => ['required', 'file', 'mimes:xlsx,csv,txt'],
        ];
    }
}

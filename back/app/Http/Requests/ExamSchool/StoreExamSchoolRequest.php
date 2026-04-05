<?php

namespace App\Http\Requests\ExamSchool;

use Illuminate\Foundation\Http\FormRequest;

class StoreExamSchoolRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'exam_id' => ['required', 'integer', 'exists:exams,id'],
            'school_id' => ['required', 'integer', 'exists:schools,id'],
            'subscription_date' => ['nullable', 'date'],
        ];
    }
}

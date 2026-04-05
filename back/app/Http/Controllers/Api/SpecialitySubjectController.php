<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpecialitySubjectResource;
use App\Models\Speciality;
use App\Models\SpecialitySubject;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SpecialitySubjectController extends Controller
{
    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'grade_id' => ['required', 'integer', 'exists:grades,id'],
            'serie_id' => ['required', 'integer', 'exists:series,id'],
            'subject_id' => ['required', 'integer', 'exists:subjects,id'],
            'coefficient' => ['required', 'numeric', 'min:0'],
        ]);

        $speciality = Speciality::upsertPair($validated['grade_id'], $validated['serie_id']);

        $specialitySubject = SpecialitySubject::updateOrCreate(
            [
                'speciality_id' => $speciality->id,
                'subject_id' => $validated['subject_id'],
            ],
            [
                'coefficient' => $validated['coefficient'],
            ]
        );

        return (new SpecialitySubjectResource($specialitySubject->load(['speciality', 'subject'])))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }
}

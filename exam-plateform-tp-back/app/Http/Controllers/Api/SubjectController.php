<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubjectResource;
use App\Models\Speciality;
use App\Models\SpecialitySubject;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class SubjectController extends Controller
{
    public function index()
    {
        return SubjectResource::collection(Subject::with('specialities')->orderBy('label')->get());
    }

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:255', 'unique:subjects,code'],
            'type' => ['required', Rule::in(Subject::TYPES)],
            'specialities' => ['sometimes', 'array'],
            'specialities.*.grade_id' => ['required', 'integer', 'exists:grades,id'],
            'specialities.*.serie_id' => ['required', 'integer', 'exists:series,id'],
            'specialities.*.coefficient' => ['required', 'numeric', 'min:0'],
        ]);

        $subject = DB::transaction(function () use ($validated) {
            $subject = Subject::create([
                'label' => $validated['label'],
                'code' => $validated['code'],
                'type' => $validated['type'],
            ]);

            if (array_key_exists('specialities', $validated)) {
                $this->syncSpecialities($subject, $validated['specialities']);
            }

            return $subject;
        });

        return (new SubjectResource($subject->load('specialities')))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Subject $subject): SubjectResource
    {
        return new SubjectResource($subject->load('specialities'));
    }

    public function update(Request $request, Subject $subject): SubjectResource
    {
        $validated = $request->validate([
            'label' => ['sometimes', 'required', 'string', 'max:255'],
            'code' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('subjects', 'code')->ignore($subject->id)],
            'type' => ['sometimes', 'required', Rule::in(Subject::TYPES)],
            'specialities' => ['sometimes', 'array'],
            'specialities.*.grade_id' => ['required', 'integer', 'exists:grades,id'],
            'specialities.*.serie_id' => ['required', 'integer', 'exists:series,id'],
            'specialities.*.coefficient' => ['required', 'numeric', 'min:0'],
        ]);

        DB::transaction(function () use ($subject, $validated) {
            $subject->update(collect($validated)->except(['specialities'])->toArray());

            if (array_key_exists('specialities', $validated)) {
                $this->syncSpecialities($subject, $validated['specialities']);
            }
        });

        return new SubjectResource($subject->fresh()->load('specialities'));
    }

    public function destroy(Subject $subject): Response
    {
        if ($subject->hasChildren()) {
            $subject->delete();
        } else {
            $subject->forceDelete();
        }

        return response()->noContent();
    }

    private function syncSpecialities(Subject $subject, array $specialities): void
    {
        $desiredSpecialityIds = [];

        foreach ($specialities as $entry) {
            $speciality = Speciality::withTrashed()
                ->where('grade_id', $entry['grade_id'])
                ->where('serie_id', $entry['serie_id'])
                ->first();

            if (! $speciality) {
                $speciality = Speciality::upsertPair($entry['grade_id'], $entry['serie_id']);
            }

            if ($speciality->trashed()) {
                $speciality->restore();
            }

            $desiredSpecialityIds[] = $speciality->id;

            $existing = SpecialitySubject::withTrashed()
                ->where('subject_id', $subject->id)
                ->where('speciality_id', $speciality->id)
                ->first();

            if ($existing) {
                if ($existing->trashed()) {
                    $existing->restore();
                }

                $existing->coefficient = $entry['coefficient'];
                $existing->save();
            } else {
                SpecialitySubject::create([
                    'subject_id' => $subject->id,
                    'speciality_id' => $speciality->id,
                    'coefficient' => $entry['coefficient'],
                ]);
            }
        }

        $currentLinks = SpecialitySubject::query()
            ->where('subject_id', $subject->id)
            ->get();

        foreach ($currentLinks as $link) {
            if (in_array((int) $link->speciality_id, $desiredSpecialityIds, true)) {
                continue;
            }

            if ($link->hasChildren()) {
                $link->delete();
            } else {
                $link->forceDelete();
            }
        }
    }
}

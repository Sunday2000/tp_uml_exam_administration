<?php

namespace App\Services;

use App\Models\Candidate;
use App\Models\ExamSchool;
use App\Models\ExamSpeciality;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;

class StudentRegistrationService
{
    /**
     * @param array<string, mixed> $payload
     * @return array{student: Student, user_reused: bool}
     */
    public function register(array $payload): array
    {
        return DB::transaction(function () use ($payload) {
            /** @var ExamSchool $examSchool */
            $examSchool = ExamSchool::query()->findOrFail((int) $payload['exam_school_id']);
            $specialityId = (int) $payload['speciality_id'];

            $specialityLinkedToExam = ExamSpeciality::query()
                ->where('exam_id', $examSchool->exam_id)
                ->where('speciality_id', $specialityId)
                ->exists();

            if (! $specialityLinkedToExam) {
                throw new InvalidArgumentException('Speciality is not attached to this exam.');
            }

            $userPayload = $payload['user'];
            $studentPayload = $payload['student'];
            $allowMissingProfilePicture = (bool) ($payload['allow_missing_profile_picture'] ?? false);

            [$user, $reused] = $this->findOrCreateUser($userPayload, $allowMissingProfilePicture);

            $student = Student::query()->create([
                'user_id' => $user->id,
                'code' => $studentPayload['code'],
                'guardian_name' => $studentPayload['guardian_name'] ?? null,
                'guardian_surname' => $studentPayload['guardian_surname'] ?? null,
                'guardian_phone' => $studentPayload['guardian_phone'] ?? null,
                'exam_school_id' => $examSchool->id,
            ]);

            Candidate::query()->create([
                'matricule' => $this->generateMatricule(),
                'speciality_id' => $specialityId,
                'student_id' => $student->id,
            ]);

            return [
                'student' => $student->load(['user', 'candidate.speciality', 'examSchool']),
                'user_reused' => $reused,
            ];
        });
    }

    /**
     * @param array<string, mixed> $userPayload
     * @return array{0: User, 1: bool}
     */
    private function findOrCreateUser(array $userPayload, bool $allowMissingProfilePicture = false): array
    {
        $email = strtolower(trim((string) $userPayload['email']));
        $phone = isset($userPayload['phone_number']) ? trim((string) $userPayload['phone_number']) : null;

        $query = User::query()->whereRaw('LOWER(email) = ?', [$email]);
        if ($phone) {
            $query->orWhere('phone_number', $phone);
        }

        $user = $query->first();

        // Handle profile picture upload
        // Supports three sources:
        // 1. Uploaded file via API (UploadedFile instance)
        // 2. Auto-extracted from Excel via SpreadsheetReaderService (profile_picture_path string)
        // 3. None - for existing users or when importing without pictures
        $profilePicturePath = null;
        if (isset($userPayload['profile_picture']) && $userPayload['profile_picture'] instanceof UploadedFile) {
            $profilePicturePath = $this->storeProfilePicture($userPayload['profile_picture']);
        } elseif (isset($userPayload['profile_picture_path']) && is_string($userPayload['profile_picture_path'])) {
            // From Excel import (auto-extracted from embedded images) - validate file exists
            $path = $userPayload['profile_picture_path'];
            if (!Storage::disk('private')->exists($path)) {
                throw new InvalidArgumentException("Profile picture file not found: {$path}");
            }
            $profilePicturePath = $path;
        }

        if ($user) {
            $updates = [
                'name' => $user->name ?: $userPayload['name'],
                'firstname' => $user->firstname ?: $userPayload['firstname'],
                'phone_number' => $user->phone_number ?: ($userPayload['phone_number'] ?? null),
            ];

            if ($profilePicturePath && !$user->profile_picture) {
                $updates['profile_picture'] = $profilePicturePath;
            }

            $user->update($updates);

            return [$user->fresh(), true];
        }

        if (!$profilePicturePath && !$allowMissingProfilePicture) {
            throw new InvalidArgumentException('Profile picture is required for new users.');
        }

        $newUser = User::query()->create([
            'name' => $userPayload['name'],
            'firstname' => $userPayload['firstname'],
            'email' => $email,
            'phone_number' => $userPayload['phone_number'] ?? null,
            'password' => Str::password(12),
            'profile_picture' => $profilePicturePath,
            'is_active' => true,
        ]);
        $newUser->assignRole('Etudiant');

        return [$newUser, false];
    }

    private function storeProfilePicture(UploadedFile $file): string
    {
        $filename = 'profiles/' . Str::uuid() . '.' . $file->getClientOriginalExtension();
        Storage::disk('private')->put($filename, $file->get());

        return $filename;
    }

    private function generateMatricule(): string
    {
        do {
            $matricule = 'MAT-' . now()->format('Y') . '-' . strtoupper(Str::random(8));
        } while (Candidate::withTrashed()->where('matricule', $matricule)->exists());

        return $matricule;
    }
}

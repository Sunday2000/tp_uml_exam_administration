<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\ImportStudentsRequest;
use App\Http\Requests\Student\StoreStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Services\SpreadsheetReaderService;
use App\Services\StudentRegistrationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class StudentController extends Controller
{
    public function __construct(
        private readonly StudentRegistrationService $studentRegistrationService,
        private readonly SpreadsheetReaderService $spreadsheetReaderService,
    ) {
    }

    public function index(Request $request)
    {
        $query = Student::query()
            ->with(['user', 'candidate.speciality', 'examSchool', 'examSchool.exam:id,title,status', 'examSchool.school:id,name,code'])
            ->orderByDesc('id');

        $connectedUser = $request->user();

        if ($connectedUser?->isSchool()) {
            $schoolId = (int) ($connectedUser->school_id ?? 0);

            if ($schoolId > 0) {
                $query->whereHas('examSchool', static function ($examSchoolQuery) use ($schoolId): void {
                    $examSchoolQuery->where('school_id', $schoolId);
                });
            } else {
                $query->whereRaw('1 = 0');
            }
        }

        if ($request->filled('exam_school_id')) {
            $query->where('exam_school_id', (int) $request->input('exam_school_id'));
        }

        if( $request->filled('exam_id') ) {
            $examId = (int) $request->input('exam_id');

            $query->whereHas('examSchool', static function ($examQuery) use ($examId): void {
                $examQuery->where('exam_id', $examId);
            });
        }

        if ($request->filled('school_id') && ! $connectedUser?->isSchool()) {
            $schoolId = (int) $request->input('school_id');

            $query->whereHas('examSchool', static function ($examSchoolQuery) use ($schoolId): void {
                $examSchoolQuery->where('school_id', $schoolId);
            });
        }

        return StudentResource::collection($query->get());
    }

    public function store(StoreStudentRequest $request): Response|JsonResponse
    {
        try {
            $validated = $request->validated();
            // Pass the profile picture file to the service
            $validated['user']['profile_picture'] = $request->file('user.profile_picture');
            $result = $this->studentRegistrationService->register($validated);
        } catch (InvalidArgumentException $exception) {
            return response()->json(['message' => $exception->getMessage()], 422);
        }

        return (new StudentResource($result['student']))
            ->additional(['meta' => ['user_reused' => $result['user_reused']]])
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Student $student): StudentResource
    {
        return new StudentResource($student->load(['user', 'candidate.speciality', 'examSchool', 'examSchool.exam:id,title,status', 'examSchool.school:id,name,code']));
    }

    public function import(ImportStudentsRequest $request): JsonResponse
    {
        $rows = $this->spreadsheetReaderService->readRows($request->file('file'));

        if ($rows === []) {
            return response()->json([
                'message' => 'Student import failed.',
                'data' => [
                    'total_rows' => 0,
                    'created_students' => 0,
                    'reused_users' => 0,
                    'failed_rows' => 0,
                    'errors' => [
                        [
                            'line' => null,
                            'message' => 'No data rows found in import file.',
                        ],
                    ],
                ],
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $defaultSpecialityId = $request->input('speciality_id');
        $examSchoolId = (int) $request->input('exam_school_id');

        $created = 0;
        $reusedUsers = 0;
        $errors = [];

        foreach ($rows as $index => $row) {
            $line = $index + 2;

            $specialityId = (int) ($row['speciality_id'] ?? $defaultSpecialityId ?? 0);

            $payload = [
                'exam_school_id' => $examSchoolId,
                'speciality_id' => $specialityId,
                'allow_missing_profile_picture' => true,
                'user' => [
                    'name' => $row['name'] ?? null,
                    'firstname' => $row['firstname'] ?? null,
                    'email' => $row['email'] ?? null,
                    'phone_number' => $row['phone_number'] ?? null,
                    'profile_picture_path' => $row['profile_picture_path'] ?? null,
                ],
                'student' => [
                    'code' => $row['code'] ?? null,
                    'guardian_name' => $row['guardian_name'] ?? null,
                    'guardian_surname' => $row['guardian_surname'] ?? null,
                    'guardian_phone' => $row['guardian_phone'] ?? null,
                ],
            ];

            $missing = $this->missingFields($payload);
            if ($missing !== []) {
                $errors[] = [
                    'line' => $line,
                    'message' => 'Missing required data: ' . implode(', ', $missing),
                ];
                continue;
            }

            try {
                $result = $this->studentRegistrationService->register($payload);
                $created++;
                if ($result['user_reused']) {
                    $reusedUsers++;
                }
            } catch (Throwable $throwable) {
                $errors[] = [
                    'line' => $line,
                    'message' => $throwable->getMessage(),
                ];
            }
        }

        $hasErrors = $errors !== [];
        $status = Response::HTTP_OK;
        $message = 'Student import completed successfully.';

        if ($hasErrors && $created === 0) {
            $status = Response::HTTP_UNPROCESSABLE_ENTITY;
            $message = 'Student import failed.';
        } elseif ($hasErrors) {
            $status = Response::HTTP_MULTI_STATUS;
            $message = 'Student import partially completed.';
        }

        return response()->json([
            'message' => $message,
            'data' => [
                'total_rows' => count($rows),
                'created_students' => $created,
                'reused_users' => $reusedUsers,
                'failed_rows' => count($errors),
                'errors' => $errors,
            ],
        ], $status);
    }

    /**
     * @param array<string, mixed> $payload
     * @return array<int, string>
     */
    private function missingFields(array $payload): array
    {
        $missing = [];

        if (empty($payload['speciality_id'])) {
            $missing[] = 'speciality_id';
        }

        foreach (['name', 'firstname', 'email'] as $field) {
            if (empty($payload['user'][$field])) {
                $missing[] = 'user.' . $field;
            }
        }

        // profile_picture_path is optional during import since it may be auto-populated from embedded images

        if (empty($payload['student']['code'])) {
            $missing[] = 'student.code';
        }

        return $missing;
    }
}

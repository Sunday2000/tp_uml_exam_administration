import type { Student, StudentImportPayload, StudentImportResult, StudentListQuery, StudentStorePayload } from '@/interfaces/student'
import api from './axios'

export const studentApi = {
  // GET /user/exam-sessions  (authenticated student)
  getMyExams: () =>
    api.get('/user/exam-sessions'),

  // GET /students?school_id={schoolId}&exam_school_id={examSchoolId}
  getAll: (params?: Partial<StudentListQuery>) =>
    api.get<Student[]>('/students', params ? { params } : undefined),

  // GET /students/{student}
  getById: (id: number) =>
    api.get<Student>(`/students/${id}`),

  // POST /students
  create: (data: StudentStorePayload) =>
    api.post<Student>('/students', data),

  // POST /students/import
  import: (payload: StudentImportPayload) => {
    const formData = new FormData()
    formData.append('exam_school_id', String(payload.exam_school_id))
    if (payload.speciality_id !== undefined && payload.speciality_id !== null)
      formData.append('speciality_id', String(payload.speciality_id))
    formData.append('file', payload.file)

    return api.post<{ message: string; data: StudentImportResult }>('/students/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

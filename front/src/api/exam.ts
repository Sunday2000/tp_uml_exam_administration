import { Exam } from '@/interfaces/exam'
import api from './axios'

// Payload pour créer / modifier une classe
export type ExamPayload = {
  title: string
  start_date: string
  end_date: string
  registration_deadline?: string | null
  status?: string 
}

export type ExamSchoolSubscriptionPayload = {
  exam_id: number
  school_id: number
  subscription_date?: string | null
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
export const examApi = {
  // GET /exams
  getAll: () =>
    api.get<Exam[]>('/exams'),

  // GET /exams/{exams}
  getById: (id: number) =>
    api.get<Exam>(`/exams/${id}`),

  // POST /exams
  create: (data: ExamPayload) =>
    api.post<Exam>('/exams', data),

  // PUT /exams/{exams}
  update: (id: number, data: Partial<ExamPayload>) =>
    api.put<Exam>(`/exams/${id}`, data),

  // DELETE /exams/{exams}
  delete: (id: number) =>
    api.delete(`/exams/${id}`),

  //PUT /exams/{exam}/test-centers/sync
  syncTestCenters: (id: number, testCenterIds: number[]) =>
    api.put(`/exams/${id}/test-centers/sync`, { test_center_ids: testCenterIds }),

  
  //PUT /exams/{exam}/specialities/sync
  syncSpecialities: (id: number, specialityIds: number[]) =>
    api.put(`/exams/${id}/specialities/sync`, { speciality_ids: specialityIds }),

  // GET /exam-schools?school_id={schoolId}
  getBySchool: (schoolId: number) =>
    api.get('/exam-schools', { params: { school_id: schoolId } }),

  // POST /exam-schools
  subscribeSchool: (data: ExamSchoolSubscriptionPayload) =>
    api.post('/exam-schools', data),
// https://exam-api.xedomi.com/api/exams/{exam}/deliberation-board

     deliberationBoard: (id: number, params?: { page?: number; per_page?: number }) =>
    api.get<Exam>(`/exams/${id}/deliberation-board`, { params }),
}


import { Candidate, CandidateResource, CandidateUser } from '@/interfaces/candidates'
import api from './axios'

// Payload pour créer / modifier une classe
export type candidatePayload = {
  id: number
  speciality_id: string
  exam_school_id: number
  user: CandidateUser
  student: CandidateResource
}

export type CandidateGradeOverviewPayload = {
  exam_id: number,
  speciality_id: number
  page?: number
}

export type SaveGradesPayload = {
  exam_id: number
  speciality_subject_id: number
  grades: {
    candidate_id: number
    grade: number
    absent: boolean
  }[]
}

export type SaveDeliberationsPayload = {
  exam_id: number
  deliberations: {  
    candidate_id: number
    deliberation: string | null
  }[]        
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
export const candidateApi = {
  // GET /students
  getAll: () =>
    api.get<Candidate[]>('/students'),

  // GET /students/{students}
  getById: (id: number) =>
    api.get<Candidate>(`/students/${id}`),

  // POST /students
  create: (data: candidatePayload) =>
    api.post<Candidate>('/students', data),

  // PUT /students/{student}
  update: (id: number, data: Partial<candidatePayload>) =>
    api.put<Candidate>(`/students/${id}`, data),

  // DELETE /students/{student}
  delete: (id: number) =>
    api.delete(`/candidates/${id}`),

   createGradeOverview: (data: CandidateGradeOverviewPayload) => {
    const { page, ...payload } = data

    return api.post<Candidate>('/candidate-subjects/grade-overview', payload, {
      params: page ? { page } : undefined,
    })
  },

      createSaveGrade: (data: SaveGradesPayload) =>
    api.post<Candidate>('/candidate-subjects/save-grades', data),

  // POST /candidates/deliberations
  saveDeliberations: (data: SaveDeliberationsPayload) =>
    api.post('/candidates/deliberations', data),
  // POST /candidates/assign-test-center
  assignTestCenter: (candidateId: number, testCenterId: number) =>
    api.post(`/candidates/assign-test-center`, { test_center_id: testCenterId, candidate_id: candidateId }),

  // POST /candidates/auto-assign-test-centers
  autoAssignByExam: (examId: number) =>
    api.post('/candidates/auto-assign-test-centers', { exam_id: examId }),

  // GET //candidates/attendance-list
  getAttendanceListByCenter: (examId: number, testCenterId: number) =>
    api.get('/candidates/attendance-list', {
      params: { exam_id: examId, test_center_id: testCenterId },
      responseType: 'blob',
    }).then(response => response.data as Blob),
  
  // GET /candidates/invitation?candidate_id={candidateId}
  downloadInvitation: (candidateId: number) =>
    api.get('/candidates/invitation', {
      params: { candidate_id: candidateId },
      responseType: 'blob',
      headers: {
        Accept: 'application/pdf, application/json',
      },
    }).then(response => response.data as Blob),

  // POST /candidates/transcript
  downloadTranscript: (candidateId: number) =>
    api.post('/candidates/transcript', {
      candidate_id: candidateId,
    }, {
      responseType: 'blob',
      headers: {
        Accept: 'application/pdf, application/json',
      },
    }).then(response => response.data as Blob),
}


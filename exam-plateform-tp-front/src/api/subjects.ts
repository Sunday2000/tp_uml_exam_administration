import { Subject, SubjectSpecialityItem, SubjectType } from '@/interfaces/subjects'
import api from './axios'

// Payload pour créer / modifier une classe
export type SubjectPayload = {
  label: string
  code: string
  type:SubjectType
  specialities?: SubjectSpecialityItem[]
}

export type specialitySubjectsPayload = {
  grade_id:    number
  serie_id:    number
  subject_id:  number  // ← manquait
  coefficient: number
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
export const subjectsApi = {
  // GET /subjects
  getAll: () =>
    api.get<Subject[]>('/subjects'),

  // GET /subjects/{subject}
  getById: (id: number) =>
    api.get<Subject>(`/subjects/${id}`),

  // POST /subjects
  create: (data: SubjectPayload) =>
    api.post<Subject>('/subjects', data),

  // PUT /subjects/{subject}
  update: (id: number, data: Partial<SubjectPayload>) =>
    api.put<Subject>(`/subjects/${id}`, data),

  // DELETE /subjects/{subject}
  delete: (id: number) =>
    api.delete(`/subjects/${id}`),

   // POST /speciality-subjects
  specialitySubjects: (data: specialitySubjectsPayload) =>
    api.post<Subject>('/speciality-subjects', data),

}


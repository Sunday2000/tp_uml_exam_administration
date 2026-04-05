import { Grade } from '@/interfaces/grade'
import api from './axios'

// Payload pour créer / modifier une classe
export type GradePayload = {
  label: string
  code: string
  description?: string
  serie_ids?: number[] // tableau d'ids de séries : [1, 2, 3]
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
export const classesApi = {
  // GET /grades
  getAll: () =>
    api.get<Grade[]>('/grades'),

  // GET /grades/{grade}
  getById: (id: number) =>
    api.get<Grade>(`/grades/${id}`),

  // POST /grades
  create: (data: GradePayload) =>
    api.post<Grade>('/grades', data),

  // PUT /grades/{grade}
  update: (id: number, data: Partial<GradePayload>) =>
    api.put<Grade>(`/grades/${id}`, data),

  // DELETE /grades/{grade}
  delete: (id: number) =>
    api.delete(`/grades/${id}`),
}


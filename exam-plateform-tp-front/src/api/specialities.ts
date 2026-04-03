import { Speciality } from '@/interfaces/speciality'
import api from './axios'

export type SpecialitiePayload = {
  grade_id: number
  serie_id: number
  code: string
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
export const SpecialitiesApi = {
  // GET /specialities
  getAll: () =>
    api.get<Speciality[]>('/specialities'),

  // GET /specialities/{speciality}
  getOne: (id: number) =>
    api.get<Speciality>(`/specialities/${id}`),

  // POST /specialities
  create: (data: SpecialitiePayload) =>
    api.post<Speciality>('/specialities', data),

  // PUT /specialities/{speciality}
  update: (id: number, data: Partial<SpecialitiePayload>) =>
    api.put<Speciality>(`/specialities/${id}`, data),

  // DELETE /specialities/{speciality}
  delete: (id: number) =>
    api.delete(`/specialities/${id}`),
}
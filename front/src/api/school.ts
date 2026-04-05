import { School, SchoolInfo } from '@/interfaces/school'
import api from './axios'

export type SchoolPayload = {
  // Infos utilisateur
  name: string
  firstname: string
  email: string
  phone_number?: string | null
  password: string
  password_confirmation: string
  // Infos école imbriquées
  school: {
    name: string
    latitude?: number | null
    longitude?: number | null
    authorization: string
    phone?: string | null
    creation_date: string
    status?: boolean | null
  }
}

export type SchoolUpdatePayload = {
  name: string
  latitude?: number | null
  longitude?: number | null
  authorization: string
  phone?: string | null
  creation_date: string
  status?: boolean | null
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
export const schoolsApi = {
  // GET /schools
  getAll: () =>
    api.get<School[]>('/schools'),

  // GET /schools/{school}
  getOne: (id: number) =>
    api.get<SchoolInfo>(`/schools/${id}`),

  // POST /schools
  create: (data: SchoolPayload) =>
    api.post<School>('/schools', data),

  // PUT /schools/{school}
  update: (id: number, data: SchoolUpdatePayload) =>
    api.put<SchoolInfo>(`/schools/${id}`, data),

  // DELETE /schools/{school}
  delete: (id: number) =>
    api.delete(`/schools/${id}`),

    // POST /schools
  subscriptionStatus: (id: number, data: { status:true | false }) =>
    api.post<School>(`/schools/${id}/subscription-status`, data),

}
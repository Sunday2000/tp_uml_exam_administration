import { Serie } from '@/interfaces/series'
import api from './axios'

export type SeriePayload = {
  label: string
  description?: string
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
export const seriesApi = {
  // GET /series
  getAll: () =>
    api.get<Serie[]>('/series'),

  // GET /series/{serie}
  getOne: (id: number) =>
    api.get<Serie>(`/series/${id}`),

  // POST /series
  create: (data: SeriePayload) =>
    api.post<Serie>('/series', data),

  // PUT /series/{serie}
  update: (id: number, data: Partial<SeriePayload>) =>
    api.put<Serie>(`/series/${id}`, data),

  // DELETE /series/{serie}
  delete: (id: number) =>
    api.delete(`/series/${id}`),
}
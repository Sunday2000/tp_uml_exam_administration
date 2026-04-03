import { TestCenter } from '@/interfaces/testCenter'
import api from './axios'

// Payload pour créer / modifier une classe
export type TestCenterPayload = {
  title: string
  code: string
  description?: string | null
  phone?: string | null
  longitude?: number | null
  latitude?: number | null
  location_indication?: string | null
  seating_capacity?: number | null
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
export const testCenterApi = {
  // GET /TestCenters
  getAll: () =>
    api.get<TestCenter[]>('/test-centers'),

  // GET /test-centers/{TestCenter}
  getById: (id: number) =>
    api.get<TestCenter>(`/test-centers/${id}`),

  // POST /test-centers
  create: (data: TestCenterPayload) =>
    api.post<TestCenter>('/test-centers', data),

  // PUT /test-centers/{TestCenter}
  update: (id: number, data: Partial<TestCenterPayload>) =>
    api.put<TestCenter>(`/test-centers/${id}`, data),

  // DELETE /test-centers/{TestCenter}
  delete: (id: number) =>
    api.delete(`/test-centers/${id}`),
}


import { User } from '@/interfaces/user'
import api from './axios'

export type UserPayload = {
  name: string
  firstname: string
  email: string
  phone_number?: string | null
  is_active?: boolean
  role: string                    // string simple en envoi (ex: "Administrateur")
  password?: string
  password_confirmation?: string
}

// ─── Endpoints ────────────────────────────────────────────────────────────────
export const usersApi = {
  // GET /users
  getAll: () =>
    api.get<User[]>('/users'),

  // GET /users/{user}
  getOne: (id: number) =>
    api.get<User>(`/users/${id}`),

  // POST /users
  create: (data: UserPayload) =>
    api.post<User>('/users', data),

  // PUT /users/{user}
  update: (id: number, data: Partial<UserPayload>) =>
    api.put<User>(`/users/${id}`, data),

  // DELETE /users/{user}
  delete: (id: number) =>
    api.delete(`/users/${id}`),
}

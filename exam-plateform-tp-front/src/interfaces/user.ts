export type UserRole = 'Administrateur' | 'Correcteur' | 'Jury' | 'Ecole'

export interface User {
  id: number
  name: string             // nom de famille
  firstname: string        // prénom
  email: string
  phone_number: string | null
  is_active: boolean
  roles: UserRole[]        // tableau selon l'API
  school?: {
    id: number
    name: string
    code: string
  } | null
  created_at?: string | null
  updated_at?: string | null
}

export type SessionStatus = 'pending' | 'ongoing' | 'close'

export interface Session {
  id: number
  title: string
  start_date: string
  end_date: string
  registration_deadline: string
  status: SessionStatus
}

export const sessions: Session[] = [
  {
    id: 1,
    title: 'BAC Général 2025-2026',
    start_date: '2026-06-15',
    end_date: '2026-06-30',
    registration_deadline: '2026-04-30',
    status: 'ongoing',
  },
  {
    id: 2,
    title: 'BAC Technique 2025-2026',
    start_date: '2026-07-01',
    end_date: '2026-07-15',
    registration_deadline: '2026-05-15',
    status: 'pending',
  },
  {
    id: 3,
    title: 'BEPC 2025-2026',
    start_date: '2026-05-20',
    end_date: '2026-05-30',
    registration_deadline: '2026-03-31',
    status: 'close',
  },
  {
    id: 4,
    title: 'BAC Général 2024-2025',
    start_date: '2025-06-15',
    end_date: '2025-06-30',
    registration_deadline: '2025-04-30',
    status: 'close',
  },
]

export const statusLabels: Record<SessionStatus, string> = {
  pending: 'En attente',
  ongoing: 'En cours',
  close: 'Clôturée',
}

export const statusColors: Record<SessionStatus, string> = {
  pending: '#7b8797',
  ongoing: '#3d6f1f',
  close: '#a52c2c',
}

export const statusBgColors: Record<SessionStatus, string> = {
  pending: '#eef0f4',
  ongoing: '#e3efd8',
  close: '#f8e2e2',
}

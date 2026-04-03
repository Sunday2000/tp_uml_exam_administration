export interface SchoolSession {
  id: number
  title: string
  start_date: string
  end_date: string
  registration_deadline: string
  status: 'pending' | 'ongoing' | 'close'
  candidates_count: number
  inscriptions_open: boolean
}

export const schoolSessions: SchoolSession[] = [
  {
    id: 1,
    title: 'BAC Général 2025-2026',
    start_date: '2026-06-15',
    end_date: '2026-06-30',
    registration_deadline: '2026-04-30',
    status: 'ongoing',
    candidates_count: 87,
    inscriptions_open: true,
  },
  {
    id: 2,
    title: 'BAC Technique 2025-2026',
    start_date: '2026-07-01',
    end_date: '2026-07-15',
    registration_deadline: '2026-05-15',
    status: 'pending',
    candidates_count: 53,
    inscriptions_open: true,
  },
  {
    id: 3,
    title: 'BEPC 2025-2026',
    start_date: '2026-05-20',
    end_date: '2026-05-30',
    registration_deadline: '2026-03-15',
    status: 'close',
    candidates_count: 120,
    inscriptions_open: false,
  },
]

export const statusLabels: Record<string, string> = {
  pending: 'En attente',
  ongoing: 'En cours',
  close: 'Clôturée',
}

export const statusColors: Record<string, string> = {
  pending: '#7b8797',
  ongoing: '#3d6f1f',
  close: '#a52c2c',
}

export const statusBgColors: Record<string, string> = {
  pending: '#eef0f4',
  ongoing: '#e3efd8',
  close: '#f8e2e2',
}

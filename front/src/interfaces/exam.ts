
export interface Exam {
  id: number
  title: string
  start_date: string
  end_date: string
  registration_deadline?: string | null
  status?: string
  inscriptions_open?: boolean
  candidates_count?: number
  specialities?: Array<{
    id: number
    code?: string
    grade?: { label?: string }
    serie?: { label?: string }
  }>
}
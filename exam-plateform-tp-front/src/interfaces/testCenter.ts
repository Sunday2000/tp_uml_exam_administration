
export interface TestCenter {
  id: number
  title: string
  code: string
  description: string | null
  phone: string | null
  longitude: number | null
  latitude: number | null
  location_indication: string | null
  seating_capacity: number | null
  assigned_candidates_count?: number
  capacity_completion_percent?: number
}
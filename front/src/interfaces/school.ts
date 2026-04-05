
export interface SchoolDetail {
  name: string
  latitude: number | null
  longitude: number | null
  authorization: string
  phone: string | null
  creation_date: string
  status: boolean | null
}

export interface School {
  id: number
  name: string
  code: string
  latitude: number | null
  longitude: number | null
  authorization: string | null
  phone: string | null
  creation_date: string | null
  status: boolean | string | null
  responsible?: ResponsibleResource
}

export interface ResponsibleResource {
  id: number
  name: string
  firstname: string
  email: string
  phone_number: string | null
  is_active: boolean
  roles: string[]
  created_at: string | null
  updated_at: string | null
}

export interface ExamSessionResource {
  exam_school_id: number
  exam_id: number
  exam_title: string
  exam_status: string
  presented_candidates_count: number
  subscription_date: string | null
}

// Shape returned by GET /schools/{school} (schools.show)
export interface SchoolInfo {
  id: number
  name: string
  code: string
  latitude: number | null
  longitude: number | null
  authorization: string | null
  phone: string | null
  creation_date: string | null
  status: boolean | null
  created_at: string | null
  updated_at: string | null
  deleted_at: string | null
  responsible?: ResponsibleResource
  exams_subscribed_count?: number
  candidates_count?: number
  ongoing_exams_count?: number
  total_exam_sessions_subscribed?: number
  total_candidates?: number
  exam_sessions?: ExamSessionResource[]
}
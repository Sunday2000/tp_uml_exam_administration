export interface StudentUser {
  id: number
  name: string
  firstname: string
  email: string
  phone_number: string | null
  profile_picture?: string | null
}

export interface StudentSpeciality {
  id: number
  code?: string
  grade?: { label?: string }
  serie?: { label?: string }
}

export interface StudentExam {
  id: number
  title: string
  status?: string
  registration_deadline?: string | null
}

export interface StudentExamSchool {
  id: number
  exam_id?: number
  school_id?: number
  exam?: StudentExam
  school?: {
    id?: number
    name?: string
    code?: string
  }
}

export interface StudentCandidate {
  id: number
  matricule?: string
  speciality_id?: number
  exam_school_id?: number
  speciality?: StudentSpeciality
}

export interface Student {
  id: number
  code: string
  guardian_name: string | null
  guardian_surname: string | null
  guardian_phone: string | null
  user_id: number
  school_id: string | number
  exam_school_id: number
  user?: StudentUser
  candidate?: StudentCandidate | null
  exam_school?: StudentExamSchool | null
}

export type StudentListQuery = {
  school_id: number
  exam_school_id: number
}

export type StudentStorePayload = {
  exam_school_id: number
  speciality_id: number
  user: {
    name: string
    firstname: string
    email: string
    phone_number?: string | null
    profile_picture?: string | null
  }
  student: {
    code: string
    guardian_name?: string | null
    guardian_surname?: string | null
    guardian_phone?: string | null
  }
}

export type StudentImportPayload = {
  exam_school_id: number
  speciality_id?: number | null
  file: File
}

export type StudentImportError = {
  line: string | number
  message: string
}

export type StudentImportResult = {
  total_rows: number
  created_students: number
  reused_users: number
  errors: StudentImportError[]
}

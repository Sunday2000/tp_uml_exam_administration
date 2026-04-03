
export interface CandidateUser {
  id: number
  name: string
  firstname: string
  email: string
  phone_number: string | null
}
 
export interface CandidateResource {
  id: number
  code: string
  guardian_name: string | null
  guardian_surname: string | null
  guardian_phone: string | null
}
 
export interface ExamSchoolResource {
  id: number
}
 
export interface Candidate {
  id: number
  speciality_id: string
  exam_school_id: number
  user: CandidateUser
  student: CandidateResource
}
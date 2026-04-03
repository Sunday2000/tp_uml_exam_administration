import { Grade } from "./grade"
import { Serie } from "./series"

export interface Speciality {
  id: number
  grade_id: number
  serie_id: number
  code: string
  grade?: Grade
  serie?: Serie
}
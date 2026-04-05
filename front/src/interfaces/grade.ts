import { Serie } from "./series"
import { Speciality } from "./speciality"

export interface Grade {
  id: number
  label: string
  code: string
  description: string | null
  specialities?: Speciality[]
  serie_ids?: Serie["id"]
}
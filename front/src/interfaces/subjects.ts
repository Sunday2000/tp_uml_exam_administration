
export type SubjectType = 'Ecrit' | 'Orale' | 'Pratique'

export interface SubjectSpecialityItem {
//   id: number
  grade_id: number
  serie_id: number
  coefficient: number
code: string

}

export interface Subject {
  id: number
  label: string
  code: string
  type: SubjectType
  specialities?: SubjectSpecialityItem[]
}


export interface SubjectSpeciality {
  grade_id: number
  serie_id: number
  coefficient: number
}

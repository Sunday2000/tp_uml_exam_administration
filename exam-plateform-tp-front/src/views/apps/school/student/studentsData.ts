export interface Student {
  id: number
  nom: string
  prenoms: string
  code: string
  examens: string[]
}

export const students: Student[] = [
  { id: 1, nom: 'AGBODJAN', prenoms: 'Kofi Marcel', code: 'ETU-001', examens: ['BAC Général 2025-2026'] },
  { id: 2, nom: 'MEDEHOU', prenoms: 'Angèle Prisca', code: 'ETU-002', examens: ['BAC Général 2025-2026', 'BAC Technique 2025-2026'] },
  { id: 3, nom: 'SOSSOU', prenoms: 'Armand Didier', code: 'ETU-003', examens: ['BAC Général 2025-2026'] },
  { id: 4, nom: 'DOSSA', prenoms: 'Félicienne', code: 'ETU-004', examens: ['BEPC 2025-2026'] },
  { id: 5, nom: 'AHOUANDJINOU', prenoms: 'Boris', code: 'ETU-005', examens: ['BAC Général 2025-2026', 'BEPC 2025-2026'] },
]

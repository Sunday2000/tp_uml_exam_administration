export interface Candidate {
  id: number
  nom: string
  prenoms: string
  date_naissance: string
  lieu_naissance: string
  sexe: 'M' | 'F'
  matricule: string
  speciality: string
  session: string
  school: string
  center: string
  numero_table: string | null
  tuteur_nom: string
  tuteur_prenom: string
  tuteur_telephone: string
}

export const candidates: Candidate[] = [
  {
    id: 1,
    nom: 'AGBODJAN',
    prenoms: 'Kofi Marcel',
    date_naissance: '2007-04-12',
    lieu_naissance: 'Cotonou',
    sexe: 'M',
    matricule: 'MAT-2026-001',
    speciality: 'Tle A',
    session: 'BAC Général 2025-2026',
    school: 'Collège Évangélique de Cotonou',
    center: 'CEG Dantokpa',
    numero_table: 'T-0142',
    tuteur_nom: 'AGBODJAN',
    tuteur_prenom: 'Robert',
    tuteur_telephone: '+229 97 12 34 56',
  },
  {
    id: 2,
    nom: 'MEDEHOU',
    prenoms: 'Angèle Prisca',
    date_naissance: '2006-09-05',
    lieu_naissance: 'Porto-Novo',
    sexe: 'F',
    matricule: 'MAT-2026-002',
    speciality: '1ère D',
    session: 'BAC Général 2025-2026',
    school: 'Lycée National A. Boganda',
    center: 'Lycée Béhanzin',
    numero_table: 'T-0087',
    tuteur_nom: 'MEDEHOU',
    tuteur_prenom: 'Honorat',
    tuteur_telephone: '+229 96 78 90 12',
  },
  {
    id: 3,
    nom: 'SOSSOU',
    prenoms: 'Armand Didier',
    date_naissance: '2007-01-20',
    lieu_naissance: 'Parakou',
    sexe: 'M',
    matricule: 'MAT-2026-003',
    speciality: 'Tle A',
    session: 'BAC Général 2025-2026',
    school: 'Collège Évangélique de Cotonou',
    center: 'CEG Dantokpa',
    numero_table: null,
    tuteur_nom: 'SOSSOU',
    tuteur_prenom: 'Bernard',
    tuteur_telephone: '+229 95 45 67 89',
  },
]

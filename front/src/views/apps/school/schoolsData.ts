export type SchoolStatus = 'en_attente' | 'validee' | 'rejetee'

export interface SchoolSession {
  id: number
  title: string
  candidates: number
}

export interface SchoolDocument {
  name: string
  size: string
}

export interface School {
  id: number
  name: string
  code: string
  region: string
  city: string
  location: string
  gps: string
  registrationDate: string
  sessions: SchoolSession[]
  status: SchoolStatus
  candidates: number
  document: SchoolDocument
}

export const schools: School[] = [
  {
    id: 42,
    name: 'College Evangelique de Cotonou',
    code: 'CEV-042',
    region: 'Atlantique',
    city: 'Akpakpa, Cotonou',
    location: 'Akpakpa, Cotonou',
    gps: '6.3654 / 2.4183',
    registrationDate: '10/03/2026',
    sessions: [
      {
        id: 1,
        title: 'BAC General 2025-2026',
        candidates: 87,
      },
    ],
    status: 'en_attente',
    candidates: 87,
    document: {
      name: 'Autorisation_CEV042.pdf',
      size: '1.2 Mo',
    },
  },
  {
    id: 1,
    name: 'Lycee National A. Boganda',
    code: 'LNA-001',
    region: 'Atlantique',
    city: 'Porto-Novo',
    location: 'Porto-Novo',
    gps: '6.4969 / 2.6289',
    registrationDate: '08/03/2026',
    sessions: [
      { id: 11, title: 'BAC General 2025-2026', candidates: 95 },
      { id: 12, title: 'BAC Technique 2025-2026', candidates: 53 },
      { id: 13, title: 'BEPC 2025-2026', candidates: 0 },
    ],
    status: 'validee',
    candidates: 148,
    document: {
      name: 'Autorisation_LNA001.pdf',
      size: '1.0 Mo',
    },
  },
  {
    id: 19,
    name: 'Lycee Technique de Cotonou',
    code: 'LTC-019',
    region: 'Atlantique',
    city: 'Cotonou',
    location: 'Cotonou',
    gps: '6.3703 / 2.3912',
    registrationDate: '09/03/2026',
    sessions: [
      { id: 21, title: 'BAC Technique 2025-2026', candidates: 120 },
      { id: 22, title: 'BAC General 2025-2026', candidates: 83 },
    ],
    status: 'validee',
    candidates: 203,
    document: {
      name: 'Autorisation_LTC019.pdf',
      size: '1.4 Mo',
    },
  },
  {
    id: 55,
    name: 'Lycee Prive Horizon',
    code: 'LPH-055',
    region: 'Borgou',
    city: 'Parakou',
    location: 'Parakou',
    gps: '9.3536 / 2.6095',
    registrationDate: '11/03/2026',
    sessions: [],
    status: 'rejetee',
    candidates: 0,
    document: {
      name: 'Autorisation_LPH055.pdf',
      size: '0.9 Mo',
    },
  },
]

export const statusLabels: Record<SchoolStatus, string> = {
  en_attente: 'En attente',
  validee: 'Validee',
  rejetee: 'Rejetee',
}

export const statusColors: Record<SchoolStatus, string> = {
  en_attente: '#9b5e16',
  validee: '#3d6f1f',
  rejetee: '#a52c2c',
}

export const statusBgColors: Record<SchoolStatus, string> = {
  en_attente: '#f6e7ce',
  validee: '#e3efd8',
  rejetee: '#f8e2e2',
}

export interface SchoolUser {
  id: number
  prenom: string
  nom: string
  email: string
  role: 'admin_ecole' | 'gestionnaire'
}

export const schoolUsers: SchoolUser[] = [
  { id: 1, prenom: 'Arsène', nom: 'KOUDOU', email: 'a.koudou@ecole.bj', role: 'admin_ecole' },
  { id: 2, prenom: 'Marie', nom: 'TOKPO', email: 'm.tokpo@ecole.bj', role: 'gestionnaire' },
  { id: 3, prenom: 'Jean', nom: 'ADANDE', email: 'j.adande@ecole.bj', role: 'gestionnaire' },
]

export const roleLabels: Record<string, string> = {
  admin_ecole: 'Admin école',
  gestionnaire: 'Gestionnaire',
}

export const roleColors: Record<string, string> = {
  admin_ecole: 'secondary',
  gestionnaire: 'info',
}

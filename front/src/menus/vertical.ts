export default [
  { heading: 'Principal' },
  {
    name: 'Tableau de bord',
    icon: 'mdi-view-dashboard-outline',
    to: { name: 'dashboard-ecommerce' },
  },

  { heading: 'Sessions & Candidats' },
  {
    name: "Sessions d'examen",
    icon: 'mdi-calendar-clock-outline',
    to: { name: 'apps-session-list' },
  },
  {
    name: 'Candidats',
    icon: 'mdi-account-outline',
    to: { name: 'apps-candidate-list' },
  },
  { heading: 'Notes & Résultats' },
  {
    name: 'Saisie des notes',
    icon: 'mdi-table-edit',
    to: { name: 'apps-note-entry' },
  },
  // {
  //   name: 'Délibération',
  //   icon: 'mdi-chart-line',
  //   to: { name: 'charts-apex-chart' },
  // },
  // {
  //   name: 'Relevés de notes',
  //   icon: 'mdi-file-document-outline',
  //   to: { name: 'apps-note-validation' },
  // },

  { heading: 'ETABLISSEMENTS' },
  {
    name: 'Gestion des écoles',
    icon: 'mdi-school-outline',
    to: { name: 'apps-school-list' },
  },
  {
    name: "Centres d'examen",
    icon: 'mdi-map-marker-outline',
    to: { name: 'apps-test-center' },
  },
  { heading: 'Paramètres' },
  {
    name: 'Classes',
    icon: 'mdi-view-list-outline',
    to: { name: 'apps-class' },
  },
  {
    name: 'Séries',
    icon: 'mdi-format-list-bulleted',
    to: { name: 'admin-series' },
  },
   {
    name: 'Matières',
    icon: 'mdi-format-list-bulleted',
    to: { name: 'apps-subjects' },
  },
  {
    name: 'Utilisateurs',
    icon: 'mdi-account-cog-outline',
    to: { name: 'admin-utilisateurs' },
  },
]
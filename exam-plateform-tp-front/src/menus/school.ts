export default [
    {
        name: 'Tableau de bord école',
        icon: 'mdi-view-dashboard-variant-outline',
        to: { name: 'apps-school-dashboard' },
    },
    {
        name: 'Mes sessions',
        icon: 'mdi-calendar-check-outline',
        to: { name: 'apps-school-session-list' },
    },
    {
        name: 'Rechercher un examen',
        icon: 'mdi-magnify',
        to: { name: 'apps-school-session-search' },
    },
    {
        name: 'Étudiants',
        icon: 'mdi-account-school-outline',
        to: { name: 'apps-school-student-list' },
    },
    {
        name: 'Utilisateurs école',
        icon: 'mdi-account-cog-outline',
        to: { name: 'apps-school-user-list' },
    }
]
import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/student/dashboard',
    name: 'apps-student-dashboard',
    component: () => import('@/views/apps/student/Dashboard.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.STUDENT],
    },
  },
] as VerticalNav[]

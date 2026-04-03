import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/apps/school',
    name: 'apps-school-list',
    component: () => import('@/views/apps/school/SchoolList.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/apps/school/:id',
    name: 'apps-school-details',
    component: () => import('@/views/apps/school/SchoolDetails.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
] as VerticalNav[]

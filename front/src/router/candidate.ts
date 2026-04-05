import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/apps/candidates/:id',
    name: 'apps-candidate-details',
    component: () => import('@/views/apps/candidate/Details.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR, Role.SCHOOL],
    },
  },
  {
    path: '/apps/candidates',
    name: 'apps-candidate-list',
    component: () => import('@/views/apps/candidate/list/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR, Role.SCHOOL],
    },
  },
] as VerticalNav[]

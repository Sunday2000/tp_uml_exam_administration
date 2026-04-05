import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/tables/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/datatables',
    name: 'datatables',
    component: () => import('@/views/datatables/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
] as VerticalNav[]

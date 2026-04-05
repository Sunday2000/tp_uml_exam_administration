import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/charts/apex-chart',
    name: 'charts-apex-chart',
    component: () => import('@/views/charts/apex-chart/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/charts/chart-js',
    name: 'charts-chart-js',
    component: () => import('@/views/charts/chartjs/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
] as VerticalNav[]

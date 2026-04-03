import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/apps/sessions',
    name: 'apps-session-list',
    component: () => import('@/views/apps/session/List.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR, Role.JURY],
    },
  },
  {
    path: '/apps/sessions/:id/dashboard',
    name: 'apps-session-dashboard',
    component: () => import('@/views/apps/session/Dashboard.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/apps/sessions/:id/note-validation',
    name: 'apps-session-noteValidation',
    component: () => import('@/views/apps/session/NoteValidation.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR, Role.JURY],
    },
  },
] as VerticalNav[]

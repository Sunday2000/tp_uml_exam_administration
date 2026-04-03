import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/apps/test-center',
    name: 'apps-test-center',
    component: () => import('@/views/apps/test-center/TestCenter.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/apps/note-entry',
    name: 'apps-note-entry',
    component: () => import('@/views/apps/note-entry/NoteEntry.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR, Role.CORRECTOR],
    },
  },
  // {
  //   path: '/apps/note-validation',
  //   name: 'apps-note-validation',
  //   component: () => import('@/views/apps/note-validation/NoteValidation.vue'),
  //   meta: {
  //     layout: 'content',
  //     requiresAuth: true,
  //     roles: [Role.ADMINISTRATOR, Role.REGULATOR],
  //   },
  // },
  {
    path: '/apps/class',
    name: 'apps-class',
    component: () => import('@/views/apps/class/Class.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/apps/subjects',
    name: 'apps-subjects',
    component: () => import('@/views/apps/subjects/Subjects.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/apps/invoice/list',
    name: 'apps-invoice-list',
    component: () => import('@/views/apps/invoice/List.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/apps/invoice/details/:id',
    name: 'apps-invoice-details',
    component: () => import('@/views/apps/invoice/Details.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/apps/invoice/edit/:id',
    name: 'apps-invoice-edit',
    component: () => import('@/views/apps/invoice/Edit.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/apps/invoice/add',
    name: 'apps-invoice-add',
    component: () => import('@/views/apps/invoice/Add.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/users/list',
    name: 'apps-user-list',
    component: () => import('@/views/apps/user/list/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/user/:tab',
    name: 'apps-user-profile',
    component: () => import('@/views/apps/user/profile/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/administration/utilisateurs',
    name: 'admin-utilisateurs',
    component: () => import('@/views/apps/utilisateurs/Utilisateurs.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/administration/series',
    name: 'admin-series',
    component: () => import('@/views/apps/series/Series.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
] as VerticalNav[]

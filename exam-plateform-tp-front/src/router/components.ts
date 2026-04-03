import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/components/alert',
    name: 'components-alert',
    component: () => import('@/views/components/alert/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/avatar',
    name: 'components-avatar',
    component: () => import('@/views/components/avatar/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/badge',
    name: 'components-badge',
    component: () => import('@/views/components/badge/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/breadcrumbs',
    name: 'components-breadcrumbs',
    component: () => import('@/views/components/breadcrumbs/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/button',
    name: 'components-button',
    component: () => import('@/views/components/button/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/chips',
    name: 'components-chips',
    component: () => import('@/views/components/chips/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/dialog',
    name: 'components-dialog',
    component: () => import('@/views/components/dialog/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/expansion-panels',
    name: 'components-expansion-panels',
    component: () => import('@/views/components/expansion-panels/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/list',
    name: 'components-list',
    component: () => import('@/views/components/list/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/menu',
    name: 'components-menu',
    component: () => import('@/views/components/menu/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/progress',
    name: 'components-progress',
    component: () => import('@/views/components/progress/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/tooltips',
    name: 'components-tooltips',
    component: () => import('@/views/components/tooltip/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/tabs',
    name: 'components-tabs',
    component: () => import('@/views/components/tabs/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/pagination',
    name: 'components-pagination',
    component: () => import('@/views/components/pagination/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/ratings',
    name: 'components-ratings',
    component: () => import('@/views/components/ratings/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/snackbars',
    name: 'components-snackbars',
    component: () => import('@/views/components/snackbars/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/timeline',
    name: 'components-timeline',
    component: () => import('@/views/components/timeline/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/components/stepper',
    name: 'components-stepper',
    component: () => import('@/views/components/stepper/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
] as VerticalNav[]

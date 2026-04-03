import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/pages/search',
    name: 'pages-search',
    component: () => import('@/views/pages/search/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/pages/pricing',
    name: 'pages-pricing',
    component: () => import('@/views/pages/pricing/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/pages/faq',
    name: 'pages-faq',
    component: () => import('@/views/pages/faq/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/pages/crypto',
    name: 'pages-crypto',
    component: () => import('@/views/pages/crypto/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/auth/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentications/AuthLogin.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/auth/login-v2',
    name: 'auth-login-v2',
    component: () => import('@/views/pages/authentications/AuthLoginV2.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/auth/register',
    name: 'auth-register',
    component: () => import('@/views/pages/authentications/AuthRegister.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/auth/register-v2',
    name: 'auth-register-v2',
    component: () => import('@/views/pages/authentications/AuthRegisterV2.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/auth/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('@/views/pages/authentications/AuthForgotPassword.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/auth/forgot-password-v2',
    name: 'auth-forgot-password-v2',
    component: () => import('@/views/pages/authentications/AuthForgotPasswordV2.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/auth/reset-password',
    name: 'auth-reset-password',
    component: () => import('@/views/pages/authentications/AuthResetPassword.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/auth/reset-password-v2',
    name: 'auth-reset-password-v2',
    component: () => import('@/views/pages/authentications/AuthResetPasswordV2.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/misc/not-found',
    name: 'misc-not-found',
    component: () => import('@/views/pages/miscellaneous/MiscNotFound.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/misc/coming-soon',
    name: 'misc-coming-soon',
    component: () => import('@/views/pages/miscellaneous/MiscComingSoon.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/misc/under-maintenance',
    name: 'misc-under-maintenance',
    component: () => import('@/views/pages/miscellaneous/MiscUnderMaintenance.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/misc/not-authorized',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/MiscNotAuthorized.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/misc/server-error',
    name: 'misc-server-error',
    component: () => import('@/views/pages/miscellaneous/MiscServerError.vue'),
    meta: {
      layout: 'blank',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/cards',
    name: 'pages-cards',
    component: () => import('@/views/pages/cards/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/typography',
    name: 'pages-typography',
    component: () => import('@/views/pages/typography/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
] as VerticalNav[]

import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  // Public registration (blank layout, no auth)
  {
    path: '/school/register',
    name: 'school-public-register',
    component: () => import('@/views/apps/school/registration/PublicRegistration.vue'),
    meta: {
      layout: 'blank',
    },
  },
  // School dashboard
  {
    path: '/school/dashboard',
    name: 'apps-school-dashboard',
    component: () => import('@/views/apps/school/dashboard/Dashboard.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.SCHOOL],
    },
  },
  // School sessions
  {
    path: '/school/sessions',
    name: 'apps-school-session-list',
    component: () => import('@/views/apps/school/session/List.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.SCHOOL],
    },
  },
  {
    path: '/school/sessions/search',
    name: 'apps-school-session-search',
    component: () => import('@/views/apps/school/session/Search.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.SCHOOL],
    },
  },
  {
    path: '/school/sessions/:exam_id/candidates',
    name: 'apps-school-session-candidates',
    component: () => import('@/views/apps/school/session/Candidates.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.SCHOOL],
    },
  },
  // School users
  {
    path: '/school/users',
    name: 'apps-school-user-list',
    component: () => import('@/views/apps/school/user/List.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.SCHOOL],
    },
  },
  // School students
  {
    path: '/school/students',
    name: 'apps-school-student-list',
    component: () => import('@/views/apps/school/student/List.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.SCHOOL],
    },
  },
  {
    path: '/school/students/register',
    name: 'apps-school-student-register',
    component: () => import('@/views/apps/school/student/Register.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.SCHOOL],
    },
  },
] as VerticalNav[]

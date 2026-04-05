import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/forms/autocomplete',
    name: 'forms-autocomplete',
    component: () => import('@/views/forms/elements/autocomplete/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/checkbox',
    name: 'forms-checkbox',
    component: () => import('@/views/forms/elements/checkbox/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/combobox',
    name: 'forms-combobox',
    component: () => import('@/views/forms/elements/combobox/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/file-input',
    name: 'forms-file-input',
    component: () => import('@/views/forms/elements/file-input/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/radio',
    name: 'forms-radio',
    component: () => import('@/views/forms/elements/radio/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/range-sliders',
    name: 'forms-range-sliders',
    component: () => import('@/views/forms/elements/range-sliders/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/select',
    name: 'forms-select',
    component: () => import('@/views/forms/elements/select/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/sliders',
    name: 'forms-sliders',
    component: () => import('@/views/forms/elements/sliders/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/switch',
    name: 'forms-switch',
    component: () => import('@/views/forms/elements/switch/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/text-field',
    name: 'forms-text-field',
    component: () => import('@/views/forms/elements/text-field/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/textarea',
    name: 'forms-textarea',
    component: () => import('@/views/forms/elements/textarea/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/example/advertising',
    name: 'forms-example-advertising',
    component: () => import('@/views/forms/examples/Advertising.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/example/checkout',
    name: 'forms-example-checkout',
    component: () => import('@/views/forms/examples/CheckoutForm.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/forms/otp-input',
    name: 'forms-otp-input',
    component: () => import('@/views/forms/elements/otp-input/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
] as VerticalNav[]

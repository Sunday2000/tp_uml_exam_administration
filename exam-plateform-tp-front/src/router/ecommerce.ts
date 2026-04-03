import Role from '@/utils/role'
import type { VerticalNav } from './type'

export default [
  {
    path: '/ecommerce/products/list',
    name: 'ecommerce-products-list',
    component: () => import('@/views/ecommerce/products/list/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/ecommerce/products/overview',
    name: 'ecommerce-products-overview',
    component: () => import('@/views/ecommerce/products/overview/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/ecommerce/products/edit',
    name: 'ecommerce-products-edit',
    component: () => import('@/views/ecommerce/products/edit/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/ecommerce/products/add',
    name: 'ecommerce-products-add',
    component: () => import('@/views/ecommerce/products/add/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/ecommerce/order/list',
    name: 'ecommerce-order-list',
    component: () => import('@/views/ecommerce/order/list/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
  {
    path: '/ecommerce/order/overview',
    name: 'ecommerce-order-overview',
    component: () => import('@/views/ecommerce/order/overview/index.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      roles: [Role.ADMINISTRATOR, Role.REGULATOR],
    },
  },
] as VerticalNav[]

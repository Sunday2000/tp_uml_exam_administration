import { useAuthStore } from '@/stores/auth'
import Role from '@/utils/role'
import { createRouter, createWebHistory } from 'vue-router'
import apps from './apps'
import candidate from './candidate'
import charts from './charts'
import components from './components'
import ecommerce from './ecommerce'
import extensions from './extensions'
import forms from './forms'
import pages from './pages'
import school from './school'
import schoolRole from './school-role'
import session from './session'
import student from './student'
import tables from './tables'
import { isUserLoggedIn } from './utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => {
    // always scroll to top
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard-ecommerce',
      component: () => import('@/views/dashboard/ecommerce/index.vue'),
      meta: {
        layout: 'content',
        requiresAuth: true,
        roles: [Role.ADMINISTRATOR, Role.REGULATOR],
      },
    },
    {
      path: '/dashboard/crm',
      name: 'dashboard-crm',
      component: () => import('@/views/dashboard/crm/index.vue'),
      meta: {
        layout: 'content',
        requiresAuth: true,
        roles: [Role.ADMINISTRATOR, Role.REGULATOR],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'blank',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'blank',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/verify-otp',
      name: 'verify-otp',
      component: () => import('@/views/AuthCode.vue'),
      meta: {
        layout: 'blank',
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPassword.vue'),
      meta: {
        layout: 'blank',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/ResetPassword.vue'),
      meta: {
        layout: 'blank',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        layout: 'blank',
      },
    },

    // components
    ...components,
    ...pages,
    ...school,
    ...session,
    ...student,
    ...candidate,
    ...schoolRole,
    ...apps,
    ...ecommerce,
    ...forms,
    ...tables,
    ...extensions,
    ...charts,
  ],
})

router.beforeEach(to => {
  const isLoggedIn = isUserLoggedIn()
  const authStore = useAuthStore()
  const all_routes = router.getRoutes();
  const role_routes = all_routes.filter(r => {
    const roles = authStore?.session?.user?.roles as string[] ?? [];

    for (const role of roles) {
      if (r.meta.roles?.includes(role)) {
        return true
      }
    }
    return false
  }).map(r => r.name)
  const menus_names = authStore.getRoleMenus().map(m => m.to?.name) as string[]
  const public_routes = ['login', 'register', 'verify-otp', 'forgot-password', 'reset-password', 'NotFound', 'school-public-register']
  //const public_routes = router.getRoutes().map(r => r.name).filter(n => !n?.meta?.requiresAuth )

  if(menus_names.length == 0){
    if(isLoggedIn)
      authStore.logout()
  }
  if ( !isLoggedIn && !public_routes.filter(x => x !== 'NotFound').includes(to.name as string))
    return { name: 'login', query: { to: to.fullPath } }

  if (to.meta.redirectIfLoggedIn && isLoggedIn)
    return { name: authStore.getRoleDashboardMenuName() }

  if (![...role_routes, ...public_routes].includes(to.name as string)){
    return { name: 'NotFound' }
  }
})

export default router

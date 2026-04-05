import authApi from '@/api/axios'
import correctorItems from '@/menus/corrector'
import juryItems from '@/menus/jury'
import schoolItems from '@/menus/school'
import studentItems from '@/menus/student'
import verticalItems from '@/menus/vertical'
import router from '@/router'
import {
    appendAuthTrace,
    clearPendingOtpEmail,
    clearStoredSession,
    clearAuthTraces,
    getPendingOtpEmail,
    getStoredSession,
    setPendingOtpEmail,
    setStoredSession,
    type StoredSession,
    type StoredUser,
} from '@/utils/authStorage'
import Role from '@/utils/role'
import { defineStore } from 'pinia'

interface LoginPayload {
  email: string
  password: string
}

interface VerifyOtpPayload {
  code: string
  email?: string
}

interface ForgotPasswordPayload {
  email: string
}

interface ResetPasswordPayload {
  email: string
  token: string
  password: string
  password_confirmation: string
}

interface AuthState {
  session: StoredSession | null
  pendingOtpEmail: string | null
  loading: boolean,
  role?: Role
}

const resolveRoleDashboard = (roles?: string[]): { name: string } => {
  if (roles?.includes(Role.SCHOOL))
    return { name: 'apps-school-dashboard' }

  if (roles?.includes(Role.ADMINISTRATOR))
    return { name: 'dashboard-ecommerce' }

  if(roles?.includes(Role.JURY))
    return { name: 'apps-session-list' }

  if(roles?.includes(Role.CORRECTOR))
    return { name: 'apps-note-entry' }

  if(roles?.includes(Role.STUDENT))
    return { name: 'apps-student-dashboard' }

  return { name: 'dashboard-ecommerce' }
}

const isAccountBlocked = (user?: StoredUser) => {
  const status = `${user?.status || ''}`.toLowerCase()
  return ['suspended', 'suspendu', 'disabled', 'desactive', 'désactivé', 'inactive'].includes(status)
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    session: getStoredSession(),
    pendingOtpEmail: getPendingOtpEmail(),
    loading: false,
    role: undefined,
  }),

  getters: {
    isAuthenticated: state => !!state.session?.accessToken,
    accessToken: state => state.session?.accessToken || '',
    user: state => state.session?.user || null,
  },

  actions: {
    hydrate() {
      this.session = getStoredSession()
      this.pendingOtpEmail = getPendingOtpEmail()
      if (this.session?.accessToken)
        authApi.defaults.headers.common.Authorization = `Bearer ${this.session.accessToken}`
    },

    getRoleMenus() {
      const user = getStoredSession()?.user;
      let items:any[] = [];

      if (this.getRole()?.isAdmin() || this.getRole()?.isRegulator()){
        items = verticalItems
      } else if (this.getRole()?.isSchool()) {
        items = schoolItems
      } else if (this.getRole()?.isJury()) {
        items = juryItems
      } else if (this.getRole()?.isCorrector()) {
        items = correctorItems
      } else if (this.getRole()?.isStudent()) {
        items = studentItems
      }
      return items;
    },

    getRoleDashboardMenuName(){
      const menus = this.getRoleMenus();
      const menus_names = menus.map((m:any) => m.to?.name).filter((n) => !!n) as string[]

      return menus_names[0];
    },

    getRole(){
      let session = getStoredSession()

      if(this.role)
        return this.role
      else
        this.role = session ? new Role(session.user?.roles ?? []) : undefined
      return this.role
    },

    async login(payload: LoginPayload) {
      this.loading = true
      try {
        const response = await authApi.post('/auth/login', payload)
        const message = response.data?.message || 'Un code OTP a ete envoye sur votre email.'

        if (response.data?.user && isAccountBlocked(response.data.user as StoredUser)) {
          throw new Error('Votre compte est suspendu ou desactive.')
        }

        this.pendingOtpEmail = payload.email
        setPendingOtpEmail(payload.email)

        return { ok: true, message }
      }
      catch (error: any) {
        const apiMessage = error?.response?.data?.message
        const fallback = 'Informations de connexion invalides.'
        return { ok: false, message: apiMessage || fallback }
      }
      finally {
        this.loading = false
      }
    },

    async verifyOtp(payload: VerifyOtpPayload) {
      this.loading = true

      try {
        const email = payload.email || this.pendingOtpEmail
        if (!email)
          return { ok: false, message: 'Email introuvable. Recommencez la connexion.' }

        const response = await authApi.post('/auth/verify-otp', {
          email,
          code: payload.code,
        })

        const data = response.data || {}
        const user = (data.user || {}) as StoredUser

        if (isAccountBlocked(user))
          return { ok: false, message: 'Votre compte est suspendu ou desactive.' }

        const session: StoredSession = {
          accessToken: data.access_token,
          tokenType: data.token_type || 'Bearer',
          user,
          loginAt: new Date().toISOString(),
        }

        this.session = session
        setStoredSession(session)
        clearPendingOtpEmail()
        this.pendingOtpEmail = null
        authApi.defaults.headers.common.Authorization = `${session.tokenType} ${session.accessToken}`
        appendAuthTrace({ email: user.email || email, status: 'success', at: session.loginAt })

        const target = resolveRoleDashboard(user.roles)
        await router.replace(target)

        return { ok: true, message: data.message || 'Connexion reussie.' }
      }
      catch (error: any) {
        console.log('OTP process',error)
        const apiMessage = error?.response?.data?.message || 'Code OTP invalide.'
        appendAuthTrace({
          email: payload.email || this.pendingOtpEmail || 'unknown',
          status: 'failed',
          at: new Date().toISOString(),
        })

        return { ok: false, message: apiMessage }
      }
      finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        if (this.session?.accessToken)
          await authApi.post('/auth/logout')
      }
      catch {
        // We still clear client session even if revoke fails.
      }
      finally {
        this.clearSession()
        await router.replace({ name: 'login' })
      }
    },

    async forgotPassword(payload: ForgotPasswordPayload) {
      this.loading = true
      try {
        const response = await authApi.post('/auth/forgot-password', payload)
        return {
          ok: true,
          message: response.data?.message || 'Si un compte correspond a cette adresse email, un code de reinitialisation a ete envoye.',
        }
      }
      catch (error: any) {
        const apiMessage = error?.response?.data?.message
        return {
          ok: false,
          message: apiMessage || 'Impossible de demarrer la reinitialisation pour le moment.',
        }
      }
      finally {
        this.loading = false
      }
    },

    async resetPassword(payload: ResetPasswordPayload) {
      this.loading = true
      try {
        const response = await authApi.post('/auth/reset-password', payload)
        return {
          ok: true,
          message: response.data?.message || 'Mot de passe reinitialise avec succes.',
        }
      }
      catch (error: any) {
        const apiMessage = error?.response?.data?.message
        return {
          ok: false,
          message: apiMessage || 'Echec de la reinitialisation du mot de passe.',
        }
      }
      finally {
        this.loading = false
      }
    },

    clearSession() {
      this.session = null
      this.pendingOtpEmail = null
      clearStoredSession()
      clearPendingOtpEmail()
      clearAuthTraces()
      delete authApi.defaults.headers.common.Authorization
    },
  },
})

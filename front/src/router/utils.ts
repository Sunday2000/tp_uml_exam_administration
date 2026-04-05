import { getStoredSession } from '@/utils/authStorage'

export const isUserLoggedIn = () => !!getStoredSession()?.accessToken

import { useAuthStore } from '@/stores/auth'
import { getStoredSession } from '@/utils/authStorage'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  //baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
})

// Intercepteur : ajoute le token automatiquement
api.interceptors.request.use(config => {
  const token = getStoredSession()?.accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if(
        error.response?.data?.message == "Unauthenticated." || 
        error.response?.status == 401
    ){
        const authStore = useAuthStore()
        authStore.logout()
    }else{
        return Promise.reject(error)
    }
  }
);

export default api
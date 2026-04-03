import CryptoJS from 'crypto-js'

const AUTH_STORAGE_KEY = import.meta.env.VITE_AUTH_STORAGE_KEY
const AUTH_TRACE_KEY = import.meta.env.VITE_AUTH_TRACE_KEY
const OTP_PENDING_EMAIL_KEY = import.meta.env.VITE_OTP_PENDING_EMAIL_KEY
const ENCRYPTION_SECRET = import.meta.env.VITE_AUTH_STORAGE_SECRET

export interface StoredUser {
  id: string | number
  name: string
  firstname: string
  email: string
  phone_number?: string
  roles?: string[]
  status?: string
  school_id?: string | number
}

export interface StoredSession {
  accessToken: string
  tokenType: string
  user: StoredUser
  loginAt: string
}

const encrypt = (value: string): string => CryptoJS.AES.encrypt(value, ENCRYPTION_SECRET).toString()

const decrypt = (value: string): string => CryptoJS.AES.decrypt(value, ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8)

const safeParse = <T>(value: string | null): T | null => {
  if (!value)
    return null

  try {
    return JSON.parse(value) as T
  }
  catch {
    return null
  }
}

const readEncryptedJson = <T>(key: string): T | null => {
  const encrypted = localStorage.getItem(key)
  if (!encrypted)
    return null

  try {
    const raw = decrypt(encrypted)
    return safeParse<T>(raw)
  }
  catch {
    return null
  }
}

const writeEncryptedJson = (key: string, value: unknown) => {
  localStorage.setItem(key, encrypt(JSON.stringify(value)))
}

export const getStoredSession = (): StoredSession | null => readEncryptedJson<StoredSession>(AUTH_STORAGE_KEY)

export const setStoredSession = (session: StoredSession) => writeEncryptedJson(AUTH_STORAGE_KEY, session)

export const clearStoredSession = () => localStorage.removeItem(AUTH_STORAGE_KEY)

export const setPendingOtpEmail = (email: string) => writeEncryptedJson(OTP_PENDING_EMAIL_KEY, { email })

export const getPendingOtpEmail = (): string | null => readEncryptedJson<{ email: string }>(OTP_PENDING_EMAIL_KEY)?.email || null

export const clearPendingOtpEmail = () => localStorage.removeItem(OTP_PENDING_EMAIL_KEY)

export const appendAuthTrace = (entry: { email: string; status: 'success' | 'failed'; at: string }) => {
  const traces = readEncryptedJson<Array<{ email: string; status: 'success' | 'failed'; at: string }>>(AUTH_TRACE_KEY) || []
  traces.unshift(entry)
  writeEncryptedJson(AUTH_TRACE_KEY, traces.slice(0, 20))
}

export const clearAuthTraces = () => localStorage.removeItem(AUTH_TRACE_KEY)

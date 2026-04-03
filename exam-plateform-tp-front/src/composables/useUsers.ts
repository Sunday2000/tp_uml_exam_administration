import { usersApi, type UserPayload } from '@/api/users'
import { User } from '@/interfaces/user'

const extractArray = (data: any): User[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

const extractItem = (data: any): User => data?.data ?? data

export function useUsers() {
  const users   = ref<User[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)

  // ── GET ALL ────────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await usersApi.getAll()
      users.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      users.value = []
    }
    finally {
      loading.value = false
    }
  }

  // ── CREATE ─────────────────────────────────────────────────────────────────
  const create = async (payload: UserPayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await usersApi.create(payload)
      users.value.unshift(extractItem(data))
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────
  const update = async (id: number, payload: Partial<UserPayload>) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await usersApi.update(id, payload)
      const item = extractItem(data)
      const idx = users.value.findIndex(u => u.id === id)
      if (idx !== -1)
        users.value.splice(idx, 1, item)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── DELETE ─────────────────────────────────────────────────────────────────
  const remove = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await usersApi.delete(id)
      users.value = users.value.filter(u => u.id !== id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
  }
}

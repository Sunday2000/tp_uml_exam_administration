import { classesApi, type GradePayload } from '@/api/classes'
import { Grade } from '@/interfaces/grade'

// { data: [...] } → tableau    |    [...] → tableau direct
const extractArray = (data: any): Grade[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

// { data: {...} } → objet    |    {...} → objet direct
const extractItem = (data: any): Grade => {
  return data?.data ?? data
}

export function useClasses() {
  const classes = ref<Grade[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)

  // ── GET ALL ────────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await classesApi.getAll()
      classes.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      classes.value = []
    }
    finally {
      loading.value = false
    }
  }
    // ── GET BY ID ────────────────────────────────────────────────────────────────
  const fetchById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await classesApi.getById(id)
      return extractItem(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      classes.value = []
    }
    finally {
      loading.value = false
    }
  }

  // ── CREATE ─────────────────────────────────────────────────────────────────
  const create = async (payload: GradePayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await classesApi.create(payload)
      classes.value.push(extractItem(data))
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────
  const update = async (id: number, payload: Partial<GradePayload>) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await classesApi.update(id, payload)
      const item = extractItem(data)
      const idx = classes.value.findIndex(c => c.id === id)
      if (idx !== -1)
        classes.value.splice(idx, 1, item)  // Use splice to ensure reactivity
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
      await classesApi.delete(id)
      classes.value = classes.value.filter(c => c.id !== id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  return {
    classes,
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  }
}


// Helper : extrait le tableau peu importe le format de réponse Laravel

import { SpecialitiePayload, SpecialitiesApi } from "@/api/specialities"
import { Speciality } from "@/interfaces/speciality"

// { data: [...] } → tableau    |    [...] → tableau direct
const extractArray = (data: any): Speciality[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

// { data: {...} } → objet    |    {...} → objet direct
const extractItem = (data: any): Speciality => {
  return data?.data ?? data
}

export function useSpecialities() {
  const specialities  = ref<Speciality[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)

  // ── GET ALL ────────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await SpecialitiesApi.getAll()
      specialities.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── CREATE ─────────────────────────────────────────────────────────────────
  const create = async (payload: SpecialitiePayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await SpecialitiesApi.create(payload)
      specialities.value.push(extractItem(data))
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────
  const update = async (id: number, payload: Partial<SpecialitiePayload>) => {
    loading.value = true
    error.value = null
    try {
          const { data } = await SpecialitiesApi.update(id, payload)
          const item = extractItem(data)
          const idx = specialities.value.findIndex(s => s.id === id)
          if (idx !== -1)
            specialities.value[idx] = item
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
      await SpecialitiesApi.delete(id)
      specialities.value = specialities.value.filter(s => s.id !== id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }


  return {
    specialities,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
  }
}
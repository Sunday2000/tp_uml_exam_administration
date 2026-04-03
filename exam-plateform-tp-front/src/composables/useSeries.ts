import { seriesApi, type SeriePayload } from '@/api/series'
import { Serie } from '@/interfaces/series'

// Helper : extrait le tableau peu importe le format de réponse Laravel
// { data: [...] } → tableau    |    [...] → tableau direct
const extractArray = (data: any): Serie[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

// { data: {...} } → objet    |    {...} → objet direct
const extractItem = (data: any): Serie => {
  return data?.data ?? data
}

export function useSeries() {
  const series  = ref<Serie[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)

  // ── GET ALL ────────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await seriesApi.getAll()
      series.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── CREATE ─────────────────────────────────────────────────────────────────
  const create = async (payload: SeriePayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await seriesApi.create(payload)
      series.value.push(extractItem(data))
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────
  const update = async (id: number, payload: Partial<SeriePayload>) => {
    loading.value = true
    error.value = null
    try {
          const { data } = await seriesApi.update(id, payload)
          const item = extractItem(data)
          const idx = series.value.findIndex(s => s.id === id)
          if (idx !== -1)
            series.value[idx] = item
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
      await seriesApi.delete(id)
      series.value = series.value.filter(s => s.id !== id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  return {
    series,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
  }
}
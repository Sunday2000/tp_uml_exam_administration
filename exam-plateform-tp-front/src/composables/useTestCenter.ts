import { testCenterApi, TestCenterPayload } from '@/api/testCenter'
import { TestCenter } from '@/interfaces/testCenter'

// { data: [...] } → tableau    |    [...] → tableau direct
const extractArray = (data: any): TestCenter[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

// { data: {...} } → objet    |    {...} → objet direct
const extractItem = (data: any): TestCenter => {
  return data?.data ?? data
}

export function useTestCenter() {
  const testCenters = ref<TestCenter[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)

  // ── GET ALL ────────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await testCenterApi.getAll()
      testCenters.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      testCenters.value = []
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
      const { data } = await testCenterApi.getById(id)
      return extractItem(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      testCenters.value = []
    }
    finally {
      loading.value = false
    }
  }

  // ── CREATE ─────────────────────────────────────────────────────────────────
  const create = async (payload: TestCenterPayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await testCenterApi.create(payload)
      testCenters.value.push(extractItem(data))
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────
  const update = async (id: number, payload: Partial<TestCenterPayload>) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await testCenterApi.update(id, payload)
      const item = extractItem(data)
      const idx = testCenters.value.findIndex(c => c.id === id)
      if (idx !== -1)
        testCenters.value.splice(idx, 1, item)  // Use splice to ensure reactivity
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
      await testCenterApi.delete(id)
      testCenters.value = testCenters.value.filter(c => c.id !== id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  return {
    testCenters,
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  }
}
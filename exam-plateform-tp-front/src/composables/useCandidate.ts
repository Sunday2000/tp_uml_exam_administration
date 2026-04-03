import { candidateApi, CandidateGradeOverviewPayload, candidatePayload, SaveDeliberationsPayload, SaveGradesPayload } from "@/api/candidate"
import { Candidate } from "@/interfaces/candidates"


// { data: [...] } → tableau    |    [...] → tableau direct
const extractArray = (data: any): Candidate[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

// { data: {...} } → objet    |    {...} → objet direct
const extractItem = (data: any): Candidate => {
  return data?.data ?? data
}

export function useCandidate() {
  const candidates = ref<Candidate[]>([])
  const gradeOverview = ref<any>(null)
    const saveGrade = ref<any>(null)
  const loading = ref(false)
  const error   = ref<string | null>(null)

  // ── GET ALL ────────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await candidateApi.getAll()
      candidates.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      candidates.value = []
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
      const { data } = await candidateApi.getById(id)
      return extractItem(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      candidates.value = []
    }
    finally {
      loading.value = false
    }
  }

  // ── CREATE ─────────────────────────────────────────────────────────────────
  const create = async (payload: candidatePayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await candidateApi.create(payload)
      candidates.value.push(extractItem(data))
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────
  const update = async (id: number, payload: Partial<candidatePayload>) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await candidateApi.update(id, payload)
      const item = extractItem(data)
      const idx = candidates.value.findIndex(c => c.id === id)
      if (idx !== -1)
        candidates.value.splice(idx, 1, item)  // Use splice to ensure reactivity
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
      await candidateApi.delete(id)
      candidates.value = candidates.value.filter(c => c.id !== id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

     const createGradeOverview = async (payload: CandidateGradeOverviewPayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await candidateApi.createGradeOverview(payload)
      gradeOverview.value = data
      return data
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  const saveGrades = async (payload: SaveGradesPayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await candidateApi.createSaveGrade(payload)
      saveGrade.value = data
      return data
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

   const saveDeliberations = async (payload: SaveDeliberationsPayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await candidateApi.saveDeliberations(payload)
      return data
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      throw e
    }
    finally {
      loading.value = false
    }
  }

  return {
    candidates,
    gradeOverview,
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    createGradeOverview,
    saveGrades,
    saveDeliberations,
  }
}
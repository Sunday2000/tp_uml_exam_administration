import { SchoolPayload, schoolsApi, SchoolUpdatePayload } from "@/api/school"
import { School, SchoolInfo } from "@/interfaces/school"

const extractArray = (data: any): School[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

const extractItem = <T>(data: any): T => data?.data ?? data

export function useSchools() {
  const schools = ref<School[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)

  // ── GET ALL ────────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await schoolsApi.getAll()
      schools.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      schools.value = []
    }
    finally {
      loading.value = false
    }
  }

  // ── GET BY ID ──────────────────────────────────────────────────────────────
  const fetchById = async (id: number): Promise<SchoolInfo | null> => {
    loading.value = true
    error.value = null
    try {
      const { data } = await schoolsApi.getOne(id)
      return extractItem<SchoolInfo>(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      return null
    }
    finally {
      loading.value = false
    }
  }

  // ── CREATE ─────────────────────────────────────────────────────────────────
  const create = async (payload: SchoolPayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await schoolsApi.create(payload)
      schools.value.push(extractItem<School>(data))
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────
  const update = async (id: number, payload: SchoolUpdatePayload) => {
    loading.value = true
    error.value = null
    try {
      await schoolsApi.update(id, payload)
      await fetchAll()
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
      await schoolsApi.delete(id)
      schools.value = schools.value.filter(s => s.id !== id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }


  // ── SUBSCRIPTION STATUS ───────────────────────────────────────────────────────
  const subscriptionStatus = async (id: number, data: { status: boolean }) => {
    loading.value = true
    error.value = null
    try {
      const { data: responseData } = await schoolsApi.subscriptionStatus(id, data)
      const item = extractItem(responseData)
      const idx = schools.value.findIndex(s => s.id === id)
      if (idx !== -1)
        schools.value.splice(idx, 1, item)
      else
        schools.value.push(item)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── MODAL STATE FOR VALIDATION/REJECTION ───────────────────────────────────
  const dialogValidateOrReject = ref(false)
  const selectedSchool = ref<School | null>(null)
  const pendingAction = ref<boolean | null>(null)

  const openValidationDialog = (school: School) => {
    selectedSchool.value = school
    pendingAction.value = null
    dialogValidateOrReject.value = true
  }

  const confirmAction = async (status: boolean) => {
    if (selectedSchool.value) {
      await subscriptionStatus(selectedSchool.value.id, { status })
      dialogValidateOrReject.value = false
      selectedSchool.value = null
      pendingAction.value = null
    }
  }

  const closeDialog = () => {
    dialogValidateOrReject.value = false
    selectedSchool.value = null
    pendingAction.value = null
  }

  return {
    schools,
    loading,
    error,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    subscriptionStatus,
    dialogValidateOrReject,
    selectedSchool,
    pendingAction,
    openValidationDialog,
    confirmAction,
    closeDialog,
  }
}
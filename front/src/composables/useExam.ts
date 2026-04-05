import { examApi, ExamPayload } from '@/api/exam'
import { Exam } from '@/interfaces/exam'
import { ref } from 'vue'

// { data: [...] } → tableau    |    [...] → tableau direct
const extractArray = (data: any): Exam[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

// { data: {...} } → objet    |    {...} → objet direct
const extractItem = (data: any): Exam => {
  return data?.data ?? data
}

export function useExams() {
  const exams = ref<Exam[]>([])
  const subscriptions = ref<any[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)

  // ── GET ALL ────────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await examApi.getAll()
      exams.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      exams.value = []
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
      const { data } = await examApi.getById(id)
      return extractItem(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      exams.value = []
    }
    finally {
      loading.value = false
    }
  }

  // ── CREATE ─────────────────────────────────────────────────────────────────
  const create = async (payload: ExamPayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await examApi.create(payload)
      exams.value.push(extractItem(data))
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────
  const update = async (id: number, payload: Partial<ExamPayload>) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await examApi.update(id, payload)
      const item = extractItem(data)
      const idx = exams.value.findIndex(c => c.id === id)
      if (idx !== -1)
        exams.value.splice(idx, 1, item)  // Use splice to ensure reactivity
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
      await examApi.delete(id)
      exams.value = exams.value.filter(c => c.id !== id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────
  const syncSpecialities = async (id: number, specialityIds: number[]) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await examApi.syncSpecialities(id, specialityIds)
      const item = extractItem(data)
      const idx = exams.value.findIndex(c => c.id === id)
      if (idx !== -1)
        exams.value.splice(idx, 1, item)  // Use splice to ensure reactivity
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

    // ── UPDATE ─────────────────────────────────────────────────────────────────
  const syncTestCenters = async (id: number, testCenterIds: number[]) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await examApi.syncTestCenters(id, testCenterIds)
      const item = extractItem(data)
      const idx = exams.value.findIndex(c => c.id === id)
      if (idx !== -1)
        exams.value.splice(idx, 1, item)  // Use splice to ensure reactivity
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── GET BY SCHOOL ─────────────────────────────────────────────────────────────
  const fetchBySchool = async (schoolId: number) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await examApi.getBySchool(schoolId)
      const rows = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
      const now = Date.now()
      const mappedExams = rows.map((row: any) => {
        const exam = row?.exam ?? row
        const deadline = exam?.registration_deadline ? new Date(exam.registration_deadline).getTime() : 0

        return {
          ...exam,
          id: Number(exam?.id ?? row?.exam_id ?? row?.id),
          candidates_count: Number(row?.students_count ?? exam?.candidates_count ?? 0),
          inscriptions_open: (exam?.status ?? '').toLowerCase() === 'ongoing' && deadline > now,
        } as Exam
      })

      exams.value = mappedExams
      subscriptions.value = rows
      return mappedExams
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      exams.value = []
      subscriptions.value = []
      return []
    }
    finally {
      loading.value = false
    }
  }

  const fetchSchoolSubscriptions = async (schoolId: number) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await examApi.getBySchool(schoolId)
      const rows = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : [])
      subscriptions.value = rows
      return rows
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      subscriptions.value = []
      return []
    }
    finally {
      loading.value = false
    }
  }

  const extractSubscribedExamIds = (rows: any[]) => {
    return rows
      .map(row => Number(row?.exam_id ?? row?.exam?.id))
      .filter(id => Number.isFinite(id) && id > 0)
  }

  const subscribeSchoolToExam = async (examId: number, schoolId: number) => {
    loading.value = true
    error.value = null
    try {
      await examApi.subscribeSchool({
        exam_id: examId,
        school_id: schoolId,
        subscription_date: new Date().toISOString(),
      })
      return true
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      return false
    }
    finally {
      loading.value = false
    }
  }

     // ── GET BY ID ────────────────────────────────────────────────────────────────
  const deliberationBoard = async (id: number, page?: number, perPage?: number) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await examApi.deliberationBoard(id, {
        page,
        per_page: perPage,
      })
      return extractItem(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      exams.value = []
    }
    finally {
      loading.value = false
    }
  }

  return {
    exams,
    subscriptions,
    loading,
    error,
    fetchAll,
    fetchById,
    fetchBySchool,
    fetchSchoolSubscriptions,
    extractSubscribedExamIds,
    subscribeSchoolToExam,
    create,
    update,
    remove,
    syncSpecialities,
    syncTestCenters,
    deliberationBoard,
  }
}
import { studentApi } from '@/api/student'
import type { Student, StudentImportResult, StudentStorePayload } from '@/interfaces/student'
import { ref } from 'vue'

const extractArray = (data: any): Student[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

const extractItem = (data: any): Student => {
  return data?.data ?? data
}

export function useStudents() {
  const students = ref<Student[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await studentApi.getAll()
      students.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      students.value = []
    }
    finally {
      loading.value = false
    }
  }

  const fetchBySchoolAndExam = async (schoolId: number, examSchoolId: number) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await studentApi.getAll({
        school_id: schoolId,
        exam_school_id: examSchoolId,
      })
      students.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      students.value = []
    }
    finally {
      loading.value = false
    }
  }

  const fetchBySchool = async (schoolId: number) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await studentApi.getAll({ school_id: schoolId })
      students.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      students.value = []
    }
    finally {
      loading.value = false
    }
  }

  const fetchById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await studentApi.getById(id)
      return extractItem(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      return null
    }
    finally {
      loading.value = false
    }
  }

  const create = async (payload: StudentStorePayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await studentApi.create(payload)
      return extractItem(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      return null
    }
    finally {
      loading.value = false
    }
  }

  const importStudents = async (payload: { exam_school_id: number; speciality_id?: number | null; file: File }) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await studentApi.import(payload)
      return (data?.data ?? null) as StudentImportResult | null
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      return null
    }
    finally {
      loading.value = false
    }
  }

  return {
    students,
    loading,
    error,
    fetchAll,
    fetchBySchool,
    fetchBySchoolAndExam,
    fetchById,
    create,
    importStudents,
  }
}

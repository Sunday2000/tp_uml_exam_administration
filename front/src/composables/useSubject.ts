import { specialitySubjectsPayload, subjectsApi, type SubjectPayload } from '@/api/subjects'
import { Subject } from '@/interfaces/subjects'

const extractArray = (data: any): Subject[] => {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

const extractItem = (data: any): Subject => data?.data ?? data

export function useSubjects() {
  const subjects = ref<Subject[]>([])
  const loading  = ref(false)
  const error    = ref<string | null>(null)

  // ── GET ALL ────────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await subjectsApi.getAll()
      subjects.value = extractArray(data)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
      subjects.value = []
    }
    finally {
      loading.value = false
    }
  }

  // ── GET BY ID ──────────────────────────────────────────────────────────────
  const fetchById = async (id: number): Promise<Subject | null> => {
    loading.value = true
    error.value = null
    try {
      const { data } = await subjectsApi.getById(id)
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

  // ── CREATE ─────────────────────────────────────────────────────────────────
  const create = async (payload: SubjectPayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await subjectsApi.create(payload)
      subjects.value.push(extractItem(data))
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

  // ── UPDATE ─────────────────────────────────────────────────────────────────
  const update = async (id: number, payload: Partial<SubjectPayload>) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await subjectsApi.update(id, payload)
      const item = extractItem(data)
      const idx = subjects.value.findIndex(s => s.id === id)
      if (idx !== -1)
        subjects.value.splice(idx, 1, item)
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
      await subjectsApi.delete(id)
      subjects.value = subjects.value.filter(s => s.id !== id)
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }

   // ── specialitySubjects ─────────────────────────────────────────────────────────────────
  const createSpecialitySubject = async (payload: specialitySubjectsPayload) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await subjectsApi.specialitySubjects(payload)
      subjects.value.push(extractItem(data))
    }
    catch (e: any) {
      error.value = e.response?.data?.message ?? e.message
    }
    finally {
      loading.value = false
    }
  }// ── Helpers affectations (utilisés dans les composants enfants) ────────────
 
  const formatAffectations = (subject: Subject): string => {
    if (!subject.specialities?.length) return '—'
    return subject.specialities.map(sp => `${sp.code ?? '?'} (${sp.coefficient})`).join(', ')
  }
 
  const buildOptionsSpecialites = (subjectList: Subject[]) => {
    const opts: { title: string; grade_id: number; serie_id: number }[] = []
    for (const subject of subjectList) {
      for (const sp of subject.specialities ?? []) {
        const key = `${sp.grade_id}-${sp.serie_id}`
        if (!opts.find(o => `${o.grade_id}-${o.serie_id}` === key))
          opts.push({ title: `${sp.code ?? '?'}`, grade_id: sp.grade_id, serie_id: sp.serie_id })
      }
    }
    return opts
  }
 
  const buildAffectationsFiltrees = (subjectList: Subject[], filtre: string) => {
    const result: { subject: Subject; speciality: any }[] = []

    for (const subject of subjectList) {
      for (const sp of subject.specialities ?? []) {
        if (!filtre) {
          result.push({ subject, speciality: sp })
          continue
        }

        const [gId, sId] = filtre.split('-').map(Number)
        if (sp.grade_id === gId && sp.serie_id === sId)
          result.push({ subject, speciality: sp })
      }
    }

    return result
  }
 
  const buildTotalCoeff = (affectations: { speciality: any }[]) =>
    affectations.reduce((acc, a) => acc + (a.speciality.coefficient ?? 0), 0)
 
  return {
    subjects, loading, error,
    fetchAll, fetchById, create, update, remove, createSpecialitySubject,
    formatAffectations, buildOptionsSpecialites, buildAffectationsFiltrees, buildTotalCoeff,
  }
}
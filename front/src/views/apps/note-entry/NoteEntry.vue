<script setup lang="ts">
import { useCandidate } from '@/composables/useCandidate'
import { useExams } from '@/composables/useExam'
import { useSpecialities } from '@/composables/useSpecialities'
import AppTable from '@/layouts/AppTable.vue'

// ─── Colonnes AppTable ────────────────────────────────────────────────────────
const columns = [
  { key: 'index',        label: '#' },
  { key: 'name',         label: 'Candidat' },
  { key: 'table_number', label: 'N° Table' },
  { key: 'serie',        label: 'Série' },
  { key: 'note',         label: 'Note / 20' },
  { key: 'absent',       label: 'Absent' },
  { key: 'statut',       label: 'Statut', align: 'end' as const },
]

// ─── Composables ──────────────────────────────────────────────────────────────
const { exams, loading: loadingExams, fetchAll: fetchExams } = useExams()
const { specialities, loading: loadingSpecialities, fetchAll: fetchSpecialities } = useSpecialities()
const { createGradeOverview, saveGrades, loading: loadingCandidates, error: errorCandidates, gradeOverview } = useCandidate()

const feedback = ref({
  visible: false,
  text: '',
  color: 'success' as 'success' | 'error' | 'warning',
})

const afficherFeedback = (text: string, color: 'success' | 'error' | 'warning' = 'success') => {
  feedback.value = {
    visible: true,
    text,
    color,
  }
}

// ─── Sélections filtres ───────────────────────────────────────────────────────
const sessionSelectionnee    = ref<number | null>(null)
const specialiteSelectionnee = ref<number | null>(null)
const activeTab              = ref(0)
const recherche              = ref('')
const gradeOverviewPage      = ref(1)

onMounted(async () => {
  await Promise.all([fetchExams(), fetchSpecialities()])
})

// Présélectionner le premier exam / spécialité
watch(exams,       val => { if (val.length && !sessionSelectionnee.value)    sessionSelectionnee.value    = val[0].id }, { immediate: true })
watch(specialities, val => { if (val.length && !specialiteSelectionnee.value) specialiteSelectionnee.value = val[0].id }, { immediate: true })

// Reset tab quand les données arrivent
watch(gradeOverview, val => { if (val?.speciality_subjects?.length) activeTab.value = 0 })

// ─── Données dérivées ─────────────────────────────────────────────────────────
const gradeSubjects  = computed(() => gradeOverview.value?.speciality_subjects ?? [])
const gradeCandidates = computed(() => gradeOverview.value?.candidates?.data ?? [])
const gradeCandidatesPagination = computed(() => {
  const pagination = gradeOverview.value?.candidates

  return {
    currentPage: Number(pagination?.current_page ?? gradeOverviewPage.value),
    lastPage: Number(pagination?.last_page ?? 1),
    total: Number(pagination?.total ?? gradeCandidates.value.length),
  }
})
const subjectActif   = computed(() => gradeSubjects.value[activeTab.value] ?? null)

// ─── Stats cards ──────────────────────────────────────────────────────────────
const statsCards = computed(() => [
  { label: 'Candidats',     value: gradeOverview.value?.stats?.total_candidates ?? 0,  icon: '🧑‍🎓', iconBg: '#e8f0fe', iconColor: '#3b82f6' },
  { label: 'Notes saisies', value: gradeOverview.value?.stats?.submitted_grades  ?? 0,  icon: '✅',   iconBg: '#dcfce7', iconColor: '#22c55e' },
  { label: 'En attente',    value: gradeOverview.value?.stats?.pending_grades    ?? 0,  icon: '⏳',   iconBg: '#fef9c3', iconColor: '#eab308' },
  { label: 'Absents',       value: gradeOverview.value?.stats?.absent_count      ?? 0,  icon: '🚫',   iconBg: '#fee2e2', iconColor: '#ef4444' },
])

// ─── Charger les candidats ────────────────────────────────────────────────────
const loadCandidates = async (pageInput: unknown = 1) => {
  if (!sessionSelectionnee.value || !specialiteSelectionnee.value) return

  const parsedPage = Number(pageInput)
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  gradeOverviewPage.value = page

  await createGradeOverview({
    exam_id:        sessionSelectionnee.value,
    speciality_id:  specialiteSelectionnee.value,
    page,
  })
}

const onGradeOverviewPageChange = (value: unknown) => {
  const page = Number(value)
  if (!Number.isInteger(page) || page < 1)
    return

  loadCandidates(page)
}

// ─── Notes locales par candidat ───────────────────────────────────────────────
const notesLocales = ref<Record<number, { grade: number | null; absent: boolean }>>({})

watch([gradeCandidates, subjectActif], ([candidates, subject]) => {
  const specialitySubjectId = Number((subject as any)?.id)

  ;(candidates as any[]).forEach((candidate: any) => {
    const existingSubject = Array.isArray(candidate?.candidate_subjects)
      ? candidate.candidate_subjects.find((candidateSubject: any) => Number(candidateSubject?.speciality_subject_id) === specialitySubjectId)
      : null

    notesLocales.value[candidate.id] = {
      grade: existingSubject?.exam_grade ?? null,
      absent: Boolean(existingSubject?.absent ?? false),
    }
  })
}, { immediate: true })

// ─── Candidats filtrés par recherche ─────────────────────────────────────────
const candidatsFiltres = computed(() => {
  let list = (gradeCandidates.value as any[])
  const q = recherche.value.toLowerCase().trim()
  if (!q) return list
  return list.filter((c: any) =>
    (c.name ?? '').toLowerCase().includes(q) ||
    (c.code ?? '').toLowerCase().includes(q),
  )
})

// Log les IDs pour comparaison
watch(candidatsFiltres, val => {
  console.log('IDs candidats saisie:', val.map((c: any) => c.id))
})
// ─── Statut candidat ──────────────────────────────────────────────────────────
const getStatut = (id: number) => {
  const n = notesLocales.value[id]
  if (!n)          return 'en_attente'
  if (n.absent)    return 'absent'
  if (n.grade !== null) return 'saisi'
  return 'en_attente'
}

// ─── Stats bas de tableau ─────────────────────────────────────────────────────
const nbSaisies = computed(() => Object.values(notesLocales.value).filter(n => n.grade !== null && !n.absent).length)
const nbAbsents = computed(() => Object.values(notesLocales.value).filter(n => n.absent).length)
const moyProvisoire = computed(() => {
  const notes = Object.values(notesLocales.value).filter(n => n.grade !== null && !n.absent).map(n => n.grade as number)
  if (!notes.length) return null
  return (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(1)
})

// ─── Tout absent ─────────────────────────────────────────────────────────────
const toutAbsent = () => {
  gradeCandidates.value.forEach((c: any) => {
    notesLocales.value[c.id] = { grade: null, absent: true }
  })
}

// ─── Valider / Enregistrer ────────────────────────────────────────────────────
const validerMatiere = async () => {
  if (!sessionSelectionnee.value || !subjectActif.value) {
    afficherFeedback('Sélectionnez une session et une matière avant validation.', 'warning')
    return
  }

  try {
    const response = await saveGrades({
      exam_id:               sessionSelectionnee.value,
      speciality_subject_id: subjectActif.value.id,
      grades: gradeCandidates.value.map((c: any) => ({
        candidate_id: c.id,
        grade:        notesLocales.value[c.id]?.grade ?? 0,
        absent:       notesLocales.value[c.id]?.absent ?? false,
      })),
    })

    if (response) {
      const responseData: any = response
      const successMessage = responseData?.message ?? responseData?.data?.message ?? 'Validation de la matière effectuée avec succès.'
      afficherFeedback(successMessage, 'success')
      return
    }

    afficherFeedback(errorCandidates.value ?? 'La validation de la matière a échoué.', 'error')
  }
  catch (e: any) {
    afficherFeedback(e?.response?.data?.message ?? e?.message ?? 'La validation de la matière a échoué.', 'error')
  }
}

// ─── Couleurs séries ──────────────────────────────────────────────────────────
const serieColors: Record<string, { couleur: string; bgColor: string }> = {
  A: { couleur: '#1565c0', bgColor: '#e3f2fd' },
  B: { couleur: '#2e7d32', bgColor: '#e8f5e9' },
  C: { couleur: '#2e7d32', bgColor: '#e8f5e9' },
  D: { couleur: '#e65100', bgColor: '#fff3e0' },
  G: { couleur: '#6a1b9a', bgColor: '#f3e5f5' },
}
const getSerieColor = (label: string) => serieColors[label] ?? { couleur: '#555', bgColor: '#f0f0f0' }
</script>

<template>
  <VRow>
    <!-- ── En-tête ── -->
    <VCol cols="12">
      <div class="d-flex align-center justify-space-between flex-wrap gap-3">
        <div>
          <h1 class="text-h5 font-weight-bold">Saisie des Notes</h1>
          <p class="text-body-2 text-medium-emphasis mt-1 mb-0">
            <VChip size="x-small" color="primary" class="me-2">CU04</VChip>
            Correcteur — Saisie par matière et par candidat
          </p>
        </div>
        <div class="d-flex gap-2">
          <!-- <VBtn variant="outlined" prepend-icon="mdi-download">Importer Excel</VBtn> -->
          <VBtn color="#1a3a6b" prepend-icon="mdi-lock">Clôturer la matière</VBtn>
        </div>
      </div>
    </VCol>

    <!-- ── Filtres ── -->
    <VCol cols="12">
      <VCard elevation="0" border rounded="lg">
        <VCardText class="pa-4">
          <VRow align="end">
            <VCol cols="12" md="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Session</div>
              <VSelect
                v-model="sessionSelectionnee"
                :items="exams" item-title="title" item-value="id"
                placeholder="Session d'examen"
                variant="outlined" density="compact" hide-details
              />
            </VCol>
            <VCol cols="12" md="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Spécialité</div>
              <VSelect
                v-model="specialiteSelectionnee"
                :items="specialities" item-title="code" item-value="id"
                placeholder="Spécialité"
                variant="outlined" density="compact" hide-details
              />
            </VCol>
            <VCol cols="12" md="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Action</div>
              <VBtn
                block variant="outlined" prepend-icon="mdi-refresh"
                :loading="loadingCandidates"
                @click="loadCandidates"
              >
                Charger
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>

    <!-- ── Stats cards ── -->
    <VCol v-for="stat in statsCards" :key="stat.label" cols="12" sm="6" lg="3">
      <VCard elevation="0" border rounded="lg">
        <VCardText class="pa-4">
          <div class="d-flex align-center gap-3">
            <div
              class="d-flex align-center justify-center rounded-lg"
              style="width: 44px; height: 44px; font-size: 22px;"
              :style="{ background: stat.iconBg }"
            >
              {{ stat.icon }}
            </div>
            <div>
              <div class="text-h5 font-weight-bold">{{ stat.value }}</div>
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis">{{ stat.label }}</div>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- ── Onglets matières + tableau candidats ── -->
    <VCol v-if="gradeSubjects.length" cols="12">
      <VCard elevation="0" border rounded="lg">
        <!-- Tabs -->
        <VTabs v-model="activeTab" color="#1a3a6b">
          <VTab v-for="(subject, index) in gradeSubjects" :key="subject.id" :value="index">
            {{ subject.subject?.label ?? `Sujet ${subject.subject_id}` }}
            <VChip size="x-small" color="info" class="ms-2">×{{ subject.coefficient }}</VChip>
          </VTab>
        </VTabs>

        <VDivider />

        <VWindow v-model="activeTab">
          <VWindowItem v-for="(subject, index) in gradeSubjects" :key="subject.id" :value="index">
            <VCardText>

              <!-- En-tête matière + recherche + tout absent -->
              <div class="d-flex align-center justify-space-between flex-wrap gap-3 mb-4">
                <div class="d-flex align-center gap-2">
                  <span class="text-subtitle-1 font-weight-bold">{{ subject.subject?.label }}</span>
                  <VChip size="small" color="info" variant="tonal">
                    {{ subject.subject?.type ?? '—' }} ● Coef ● {{ subject.coefficient }}
                  </VChip>
                </div>
                <div class="d-flex align-center gap-2">
                  <VTextField
                    v-model="recherche"
                    placeholder="Rechercher un candidat..."
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined" density="compact" hide-details
                    style="max-width: 240px;"
                  />
                  <VBtn variant="outlined" size="small" @click="toutAbsent">Tout absent</VBtn>
                </div>
              </div>

							 <!-- Tableau via AppTable -->
              <AppTable
                :columns="columns"
                :items="candidatsFiltres"
                :count="candidatsFiltres.length"
                :per-page="Math.max(gradeCandidates.length, 1)"
              >
                <!-- # -->
                <template #cell-index="{ item }">
                  <span class="text-body-2 text-medium-emphasis">
                    {{ String(candidatsFiltres.indexOf(item) + 1).padStart(2, '0') }}
                  </span>
                </template>

                <!-- Candidat -->
                <template #cell-name="{ item }">
                  <div class="text-body-2 font-weight-bold">{{ item.name ?? '—' }} {{ item.firstname ?? '—' }}</div>
                </template>

                <!-- N° Table -->
                <template #cell-table_number="{ item }">
                  <span class="text-body-2 font-weight-bold">{{ item.table_number ?? '—' }}</span>
                </template>

                <!-- Série -->
                <template #cell-serie="{ item }">
                  <VChip
                    size="x-small" variant="tonal"
                    :style="{ color: getSerieColor(item.serie ?? '').couleur, background: getSerieColor(item.serie ?? '').bgColor }"
                  >
                    {{ item.serie ?? '—' }}
                  </VChip>
                </template>

                <!-- Note -->
                <template #cell-note="{ item }">
                  <div class="d-flex align-center gap-1">
                    <VTextField
                      v-model.number="notesLocales[item.id].grade"
                      type="number" min="0" max="20" step="0.5"
                      :disabled="notesLocales[item.id]?.absent"
                      :placeholder="notesLocales[item.id]?.absent ? '—' : ''"
                      variant="outlined" density="compact" hide-details
                      style="width: 90px;"
                      :class="{ 'note-saisie': notesLocales[item.id]?.grade !== null && !notesLocales[item.id]?.absent }"
                    />
                    <span class="text-caption text-medium-emphasis">/20</span>
                  </div>
                </template>

                <!-- Absent -->
                <template #cell-absent="{ item }">
                  <VCheckbox
                    v-model="notesLocales[item.id].absent"
                    label="ABS"
                    density="compact" hide-details
                    @update:model-value="(v) => { if (v) notesLocales[item.id].grade = null }"
                  />
                </template>

                <!-- Statut -->
                <template #cell-statut="{ item }">
                  <span v-if="getStatut(item.id) === 'saisi'"      class="text-success  text-body-2 font-weight-bold">● Saisi</span>
                  <span v-else-if="getStatut(item.id) === 'absent'" class="text-error    text-body-2 font-weight-bold">● Absent</span>
                  <span v-else                                       class="text-medium-emphasis text-body-2">● En attente</span>
                </template>
              </AppTable>

              <div v-if="gradeCandidatesPagination.lastPage > 1" class="d-flex justify-center mt-4">
                <VPagination
                  v-model="gradeOverviewPage"
                  :length="gradeCandidatesPagination.lastPage"
                  :total-visible="7"
                  active-color="#1a3a6b"
                  @update:modelValue="onGradeOverviewPageChange"
                />
              </div>

              <!-- Pied de tableau -->
              <div class="d-flex align-center justify-space-between mt-4 flex-wrap gap-3 pt-2">
                <div class="d-flex gap-4 text-body-2 text-medium-emphasis">
                  <span>Saisies : <strong class="text-high-emphasis">{{ nbSaisies }} / {{ gradeCandidates.length }}</strong></span>
                  <span v-if="moyProvisoire">Moy. provisoire : <strong class="text-high-emphasis">{{ moyProvisoire }} / 20</strong></span>
                  <span>Absents : <strong class="text-high-emphasis">{{ nbAbsents }}</strong></span>
                </div>
                <div class="d-flex gap-2">
                  <VBtn variant="outlined" prepend-icon="mdi-content-save" :loading="loadingCandidates" @click="validerMatiere">
                    Enregistrer brouillon
                  </VBtn>
                  <VBtn color="#1a3a6b" prepend-icon="mdi-check-circle" :loading="loadingCandidates" @click="validerMatiere">
                    Valider la matière
                  </VBtn>
                </div>
              </div>
           

            </VCardText>
          </VWindowItem>
        </VWindow>
				  
      </VCard>
    </VCol>

    <!-- État vide -->
    <VCol v-else-if="!loadingCandidates" cols="12">
      <VCard elevation="0" border rounded="lg">
        <VCardText class="text-center text-medium-emphasis py-12">
          <VIcon icon="mdi-clipboard-text-outline" size="48" class="mb-3" />
          <p class="text-body-1">Sélectionnez une session et une spécialité, puis cliquez sur <strong>Charger</strong>.</p>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Loader -->
    <VCol v-else cols="12" class="d-flex justify-center py-10">
      <VProgressCircular indeterminate color="primary" />
    </VCol>

  </VRow>

  <VSnackbar v-model="feedback.visible" :color="feedback.color" timeout="3200" location="top right">
    {{ feedback.text }}
  </VSnackbar>
</template>

<style scoped>
.table-row:hover { background: #f9fafb; }

.note-saisie :deep(.v-field__outline) {
  --v-field-border-color: #4caf50 !important;
  border-color: #4caf50 !important;
}
</style>
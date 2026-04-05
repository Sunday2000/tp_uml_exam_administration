<script setup lang="ts">
import { candidateApi } from '@/api/candidate'
import { useCandidate } from '@/composables/useCandidate'
import { useExams } from '@/composables/useExam'
import AppTable from '@/layouts/AppTable.vue'

// ─── Composables ──────────────────────────────────────────────────────────────
const route = useRoute()
const examId = computed(() => Number(route.params.id))

const {  deliberationBoard } = useExams()
const { saveDeliberations } = useCandidate()

// ─── Classes & Séries extraites de exam_specialities ──────────────────────────
const classes = computed(() => {
  const specs = deliberationData.value?.exam_specialities ?? []
  const map = new Map<number, { id: number; label: string }>()
  for (const s of specs) {
    if (s.speciality?.grade && !map.has(s.speciality.grade.id)) {
      map.set(s.speciality.grade.id, { id: s.speciality.grade.id, label: s.speciality.grade.label })
    }
  }
  return Array.from(map.values())
})

const series = computed(() => {
  const specs = deliberationData.value?.exam_specialities ?? []
  const map = new Map<number, { id: number; label: string }>()
  for (const s of specs) {
    if (s.speciality?.serie && !map.has(s.speciality.serie.id)) {
      map.set(s.speciality.serie.id, { id: s.speciality.serie.id, label: s.speciality.serie.label })
    }
  }
  return Array.from(map.values())
})

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

// ─── Deliberation Board Data ──────────────────────────────────────────────────
const deliberationData = ref<any>(null)
const loadingDeliberation = ref(false)
const deliberationPage = ref(1)
const deliberationPerPage = ref(20)

const fetchDeliberationBoard = async (page = deliberationPage.value) => {
  if (!examId.value) return

  deliberationPage.value = page
  loadingDeliberation.value = true
  try {
    const data = await deliberationBoard(examId.value, page, deliberationPerPage.value)
    deliberationData.value = data
  } catch (error) {
    console.error('Erreur lors du chargement du tableau de délibération:', error)
  } finally {
    loadingDeliberation.value = false
  }
}

// ─── Filtres ──────────────────────────────────────────────────────────────────
const classeSelectionnee     = ref<number | null>(null)
const serieSelectionnee      = ref<number | null>(null)
const decisionFiltre         = ref<string>('all')
const moyenneFiltre          = ref<string>('all')
const recherche              = ref('')

onMounted(async () => {
  await fetchDeliberationBoard()
})

watch(classes,  val => { if (val.length && !classeSelectionnee.value)  classeSelectionnee.value  = val[0].id }, { immediate: true })
watch(series,   val => { if (val.length && !serieSelectionnee.value)   serieSelectionnee.value   = val[0].id }, { immediate: true })

// ─── Options filtres ──────────────────────────────────────────────────────────
const optionsDecision = [
  { value: 'all',      label: 'Tous' },
  { value: 'Admis',    label: 'Admis' },
  { value: 'ajournes', label: 'Ajournés' },
  // { value: 'lc',       label: 'Liste complémentaire' },
  { value: null,       label: 'Non délibérés' },
]

const optionsMoyenne = [
  { value: 'all',        label: 'Toutes' },
  { value: 'superieur',  label: '>= 10' },
  { value: 'inferieure', label: '< 10' },
  { value: 'gte12',      label: '>= 12' },
  { value: 'gte14',      label: '>= 14' },
]

const optionsDeliberation = [
  { value: null,      label: '— Non Délibérer —',       icon: null },
  { value: 'Admis', label: 'Admis',                icon: '✅' },
  { value: 'Ajourné', label: 'Ajournés',             icon: '⏸' },
  // { value: 'liste_complementaire',    label: 'Liste complémentaire', icon: '📋' },
]

// ─── Données ──────────────────────────────────────────────────────────────────
const gradeCandidates = computed(() => deliberationData.value?.candidates?.data ?? [])
const gradeSubjects   = computed(() => deliberationData.value?.exam_specialities ?? [])
const deliberationCandidatesPagination = computed(() => {
  const pagination = deliberationData.value?.candidates

  return {
    currentPage: Number(pagination?.current_page ?? deliberationPage.value),
    lastPage: Number(pagination?.last_page ?? 1),
    total: Number(pagination?.total ?? gradeCandidates.value.length),
  }
})

const onDeliberationPageChange = (value: unknown) => {
  const page = Number(value)
  if (!Number.isInteger(page) || page < 1)
    return

  fetchDeliberationBoard(page)
}

// Spécialité affichée (label)
const specialiteLabel = computed(() => {
  const c = classes.value.find(c => c.id === classeSelectionnee.value)
  const s = series.value.find((s: any) => s.id === serieSelectionnee.value)
  if (!c || !s) return ''
  return `${c.label} Série ${s.label}`
})

// ─── Délibérations locales ────────────────────────────────────────────────────
const deliberations = ref<Record<number, string | null>>({})
const selections    = ref<Record<number, boolean>>({})

watch(gradeCandidates, (candidates) => {
  candidates.forEach((c: any) => {
    // Valeur par défaut : première option utile (par exemple 'admis')
    if (!deliberations.value[c.id]) deliberations.value[c.id] = c.deliberation ?? null
    if (selections.value[c.id] === undefined) selections.value[c.id] = false
  })
})

// ─── Stats cards ──────────────────────────────────────────────────────────────
const statsCards = computed(() => [
  {
    label: 'Candidats', value: deliberationData.value?.statistics?.total_candidates ?? 0,
    sub: null, color: '#1a3a6b', borderColor: '#1a3a6b',
  },
  {
    label: 'Admis', value: deliberationData.value?.statistics?.successful_candidates ?? 0,
    sub: `${deliberationData.value?.statistics?.success_rate ?? 0}% taux de réussite`,
    subColor: 'success', color: '#2e7d32', borderColor: '#2e7d32',
  },
  {
    label: 'Ajournés', value: deliberationData.value?.statistics?.postponed_candidates ?? 0,
    sub: null, color: '#b45309', borderColor: '#f59e0b',
  },
  {
    label: 'Absents', value: deliberationData.value?.statistics?.fully_absent_candidates ?? 0,
    sub: null, color: '#a52c2c', borderColor: '#ef4444',
  },
  {
    label: 'Taux délibération', value: deliberationData.value?.statistics?.deliberation_rate ?? 0,
    sub: '% délibéré', color: '#6a1b9a', borderColor: '#9c27b0',
  },
])

// IDs des 10 premiers candidats de la saisie (même slice)
const idsTest = computed(() =>
  (gradeCandidates.value as any[]).slice(0, 10).map((c: any) => c.id)
)

// ─── IDs fixes pour tests ─────────────────────────────────────────────────────
// const IDS_TEST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const candidatsFiltres = computed(() => {
  let list = (gradeCandidates.value as any[])
  const q = recherche.value.toLowerCase().trim()
  if (!q) return list
  return list.filter((c: any) =>
    (c.name ?? '').toLowerCase().includes(q) ||
    (c.code ?? '').toLowerCase().includes(q),
  )
})


// ─── Modal détail candidat ────────────────────────────────────────────────────
const dialogDetail   = ref(false)
const candidatDetail = ref<any>(null)
	const dialogReleve   = ref(false)
const loadingReleveCandidateId = ref<number | null>(null)
// const candidatReleve = ref<any>(null)

const ouvrirDetail = (candidat: any) => {
  candidatDetail.value = candidat
  dialogDetail.value   = true
}

const ouvrirReleve = async (candidat: any) => {
  loadingReleveCandidateId.value = Number(candidat?.id)

  try {
    const transcriptBlob = await candidateApi.downloadTranscript(candidat.id)

    if (transcriptBlob.type.includes('application/json')) {
      const payloadText = await transcriptBlob.text()
      const payload = JSON.parse(payloadText)
      const transcriptUrl = typeof payload === 'string'
        ? payload
        : (payload?.url ?? payload?.data?.url ?? payload?.data)

      if (typeof transcriptUrl === 'string' && transcriptUrl.trim()) {
        const opened = window.open(transcriptUrl, '_blank')
        if (!opened)
          alert('Impossible d\'ouvrir le relevé de note. Vérifiez le bloqueur de fenêtres.')
      }
      else {
        alert('Réponse invalide lors de la génération du relevé de note.')
      }

      return
    }

    const pdfUrl = window.URL.createObjectURL(transcriptBlob)
    const opened = window.open(pdfUrl, '_blank')
    if (!opened)
      alert('Impossible d\'ouvrir le relevé de note. Vérifiez le bloqueur de fenêtres.')

    setTimeout(() => window.URL.revokeObjectURL(pdfUrl), 60_000)
  }
  catch (error: any) {
    alert(error?.response?.data?.message ?? 'Erreur lors de l\'ouverture du relevé de note.')
  }
  finally {
    loadingReleveCandidateId.value = null
  }
}

const deliberationDetail = ref('')


watch(dialogDetail, (open) => {
  if (open && candidatDetail.value)
    deliberationDetail.value = deliberations.value[candidatDetail.value.id] ?? ''
})

const enregistrerDetail = () => {
  if (candidatDetail.value)
    deliberations.value[candidatDetail.value.id] = deliberationDetail.value
  dialogDetail.value = false
}
const getMention = (moyenne: number | null) => {
  if (moyenne === null) return { label: '—',           color: 'default' }
  if (moyenne >= 16)    return { label: 'Très Bien',   color: '#1565c0', bg: '#e3f2fd' }
  if (moyenne >= 14)    return { label: 'Bien',        color: '#2e7d32', bg: '#e8f5e9' }
  if (moyenne >= 12)    return { label: 'Assez Bien',  color: '#2e7d32', bg: '#e8f5e9' }
  if (moyenne >= 10)    return { label: 'Passable',    color: '#555',    bg: '#f0f0f0' }
  return                       { label: 'Insuffisant', color: '#a52c2c', bg: '#fee2e2' }
}

const getMoyenneColor = (moyenne: number | null) => {
  if (moyenne === null) return { color: '#555', bg: '#f0f0f0' }
  if (moyenne >= 12)    return { color: '#2e7d32', bg: '#e8f5e9' }
  if (moyenne >= 10)    return { color: '#1565c0', bg: '#e3f2fd' }
  return                       { color: '#a52c2c', bg: '#fee2e2' }
}

// ─── Note chip couleur ────────────────────────────────────────────────────────
const getNoteColor = (note: number | null) => {
  if (note === null) return { color: '#555', bg: '#f0f0f0' }
  if (note >= 10)    return { color: '#2e7d32', bg: '#e8f5e9' }
  return                    { color: '#a52c2c', bg: '#fee2e2' }
}

// ─── Décision couleur et label ────────────────────────────────────────────────
const stats = computed(() => {
  const grades = candidatDetail.value?.candidate_subjects?.map((s: any) => s.exam_grade).filter((g: any) => g !== null) || []
  const maxNote = grades.length ? Math.max(...grades) : 0
  const minNote = grades.length ? Math.min(...grades) : 0
  const totalPoints = candidatDetail.value?.candidate_subjects?.reduce((acc: any, s: any) => acc + ((s.exam_grade ?? 0) * s.coefficient), 0) || 0

  return [
    {
      label: 'Moyenne générale',
      value: candidatDetail.value?.computed_average?.toFixed(2) ?? '—',
      suffix: '/ 20',
      colorClass: 'text-success'
    },
    {
      label: 'Note la plus haute',
      value: maxNote.toFixed(2),
      colorClass: 'text-primary'
    },
    {
      label: 'Note la plus basse',
      value: minNote.toFixed(2),
      colorClass: 'text-error'
    },
    {
      label: 'Total points pondérés',
      value: totalPoints.toFixed(1),
      colorClass: 'text-purple'
    }
  ]
})


const imprimerReleve = () => {
  window.print()
}

// ─── Colonnes ─────────────────────────────────────────────────────────────────
const columns = [
  { key: 'select',    label: '' },
  { key: 'candidat',  label: 'Candidat' },
  { key: 'table',     label: 'N° Table' },
  { key: 'notes',     label: 'Notes par matière' },
  { key: 'moyenne',   label: 'Moy.' },
  { key: 'mention',   label: 'Mention' },
  { key: 'decision',  label: 'Décision' },
  { key: 'action',    label: 'Actions', align: 'end' as const },
]

// ─── Sauvegarder ─────────────────────────────────────────────────────────────
const sauvegarder = async () => {
  if (!examId.value) {
    afficherFeedback('Aucun examen sélectionné pour la validation officielle.', 'warning')
    return
  }
  const specialitySubjectId = deliberationData.value?.exam_specialities?.[0]?.id
  if (!specialitySubjectId) {
    afficherFeedback('Impossible de déterminer la matière à valider.', 'warning')
    return
  }

  loadingDeliberation.value = true
  try {
    const response = await saveDeliberations({
      exam_id: examId.value,
      // ← transformer Record<number, string> en tableau d'objets
      deliberations: candidatsFiltres.value
        .filter((c: any) => deliberations.value[c.id] && deliberations.value[c.id] !== null && ['Admis', 'Ajourné'].includes(deliberations.value[c.id] as string)) // ← seulement ceux délibérés avec valeur valide
        .map((c: any) => ({
          candidate_id: c.id,
          deliberation: deliberations.value[c.id],
        })),
    })

    const successMessage = response?.message ?? response?.data?.message ?? 'Validation officielle effectuée avec succès.'
    afficherFeedback(successMessage, 'success')
  }
  catch (error: any) {
    afficherFeedback(error?.response?.data?.message ?? error?.message ?? 'La validation officielle a échoué.', 'error')
  }
  finally {
    loadingDeliberation.value = false
  }
}

</script>

<template>
  <VRow>
    <!-- ── En-tête ── -->
    <VCol cols="12">
      <div class="d-flex align-center justify-space-between flex-wrap gap-3">
        <div>
          <h1 class="text-h5 font-weight-bold">Validation des Notes</h1>
          <p class="text-body-2 text-medium-emphasis mt-1 mb-0">
            <VChip size="x-small" color="primary" class="me-2">CU05</VChip>
            Jury — Vérification et délibération des résultats
          </p>
        </div>
        <div class="d-flex gap-2">
          <!-- <VBtn variant="outlined" prepend-icon="mdi-download">Exporter rapport</VBtn> -->
          <VBtn color="#1a3a6b" prepend-icon="mdi-lightning-bolt">Délibérer automatiquement</VBtn>
        </div>
      </div>
    </VCol>

    <!-- ── Stats cards ── -->
    <VCol v-for="stat in statsCards" :key="stat.label" cols="12" sm="6" lg="auto" style="flex: 1;">
      <VCard elevation="0" border rounded="lg" :style=" { borderTop: '3px solid ' + stat.borderColor }">
        <VCardText class="pa-4">
          <div class="text-h4 font-weight-bold mb-1" :style="{ color: stat.color }">{{ stat.value }}</div>
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis">{{ stat.label }}</div>
          <div v-if="stat.sub" class="text-caption mt-1" :class="`text-${stat.subColor}`">{{ stat.sub }}</div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- ── Filtres ── -->
    <VCol cols="12">
      <VCard elevation="0" border rounded="lg">
        <VCardText class="pa-4">
          <VRow dense>
            <VCol cols="12" md="2">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Classe</div>
              <VSelect
                v-model="classeSelectionnee"
                :items="classes" item-title="label" item-value="id"
                variant="outlined" density="compact" hide-details
              />
            </VCol>
            <VCol cols="12" md="2">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Série</div>
              <VSelect
                v-model="serieSelectionnee"
                :items="series" item-title="label" item-value="id"
                variant="outlined" density="compact" hide-details
              />
            </VCol>
            <VCol cols="12" md="2">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Décision</div>
              <VSelect
                v-model="decisionFiltre"
                :items="optionsDecision" item-title="label" item-value="value"
                variant="outlined" density="compact" hide-details
              />
            </VCol>
            <VCol cols="12" md="2">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Moyenne</div>
              <VSelect
                v-model="moyenneFiltre"
                :items="optionsMoyenne" item-title="label" item-value="value"
                variant="outlined" density="compact" hide-details
              />
            </VCol>
            <VCol cols="12" md="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Rechercher</div>
              <VTextField
                v-model="recherche"
                placeholder="Nom, matricule..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined" density="compact" hide-details
              />
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>

    <!-- ── Tableau ── -->
    <VCol cols="12">
      <AppTable
        title="Tableau de délibération"
        :columns="columns"
        :items="candidatsFiltres"
        :count="candidatsFiltres.length"
        :loading="loadingDeliberation"
        :per-page="Math.max(candidatsFiltres.length, 1)"
      >
        <!-- En-tête titre avec spécialité -->
        <!-- Checkbox tout sélectionner -->
        <template #cell-select="{ item }">
          <VCheckbox
            v-model="selections[item.id]"
            density="compact" hide-details
          />
        </template>

        <!-- Candidat -->
        <template #cell-candidat="{ item }">
          <div class="text-body-2 font-weight-bold">{{ item.name }} {{ item.firstname }}</div>
          <div class="text-caption text-medium-emphasis">{{ item.matricule ?? '—' }}</div>
        </template>

        <!-- N° Table -->
        <template #cell-table="{ item }">
          <span class="text-body-2 font-weight-bold">{{ item.table_number ?? '—' }}</span>
        </template>

        <!-- Notes par matière -->
        <template #cell-notes="{ item }">
          <div class="d-flex flex-wrap gap-1">
            <span
              v-for="subject in (item.candidate_subjects ?? [])"
              :key="subject.id"
              class="note-chip text-caption font-weight-bold px-2 py-1 rounded"
              :style="{ color: getNoteColor(subject.exam_grade).color, background: getNoteColor(subject.exam_grade).bg }"
            >
              {{ subject.subject.label }} {{ subject.exam_grade ?? '—' }}
              <span v-if="subject.absent" class="text-error">(Absent)</span>
            </span>
            <span v-if="!item.candidate_subjects?.length" class="text-caption text-medium-emphasis">—</span>
          </div>
        </template>

        <!-- Moyenne -->
        <template #cell-moyenne="{ item }">
          <span
            class="moyenne-badge text-body-2 font-weight-bold px-3 py-1 rounded-pill"
            :style="{ color: getMoyenneColor(item.computed_average).color, background: getMoyenneColor(item.computed_average).bg }"
          >
            {{ item.computed_average?.toFixed(2) ?? '—' }}
          </span>
        </template>

        <!-- Mention -->
        <template #cell-mention="{ item }">
          <span
            class="text-caption font-weight-bold px-2 py-1 rounded"
            :style="{ color: getMention(item.computed_average).color, background: getMention(item.computed_average).bg }"
          >
            {{ item.mention ?? (item.computed_mention ?? '—') }}
          </span>
        </template>

        <!-- Décision -->
        <template #cell-decision="{ item }">
          <VSelect
            v-model="deliberations[item.id]"
              :items="optionsDeliberation.filter(o => o.value !== '')"
            item-title="label"
            item-value="value"
            variant="outlined"
            density="compact"
            hide-details
            style="min-width: 180px; height: 28px;"
          />
        </template>

        <!-- Action -->
        <template #cell-action="{ item }">
          <div class="d-flex justify-end">
            <VBtn class="mr-2" size="small" variant="outlined" prepend-icon="mdi-file-document" :loading="loadingReleveCandidateId === item.id" @click="ouvrirReleve(item)">Relevé de note</VBtn>
            <VBtn size="small" variant="outlined" prepend-icon="mdi-information" @click="ouvrirDetail(item)">Détail</VBtn>
          </div>
        </template>
      </AppTable>

      <div v-if="deliberationCandidatesPagination.lastPage > 1" class="d-flex justify-center mt-4">
        <VPagination
          v-model="deliberationPage"
          :length="deliberationCandidatesPagination.lastPage"
          :total-visible="7"
          active-color="#1a3a6b"
          @update:modelValue="onDeliberationPageChange"
        />
      </div>

      <!-- Pied de tableau -->
      <div class="d-flex align-center justify-space-between mt-3 flex-wrap gap-3">
        <div class="d-flex align-center gap-3">
          <span class="text-body-2 text-medium-emphasis">Délibérations :</span>
          <VProgressLinear
            :model-value="deliberationData?.statistics?.deliberation_rate ?? 0"
            color="success"
            rounded height="8"
            style="width: 200px;"
          />
          <span class="text-body-2 font-weight-bold text-success">
            {{ deliberationData?.statistics?.deliberation_rate ?? 0 }}%
          </span>
        </div>
        <div class="d-flex gap-2">
          <VBtn variant="outlined" prepend-icon="mdi-content-save" :loading="loadingDeliberation" @click="sauvegarder">
            Sauvegarder
          </VBtn>
          <VBtn color="#1a3a6b" prepend-icon="mdi-lock" :loading="loadingDeliberation" @click="sauvegarder">
            Validation officielle
          </VBtn>
        </div>
      </div>
    </VCol>
  </VRow>

  <!-- ─── Modal Détail candidat ──────────────────────────────────────────────── -->
  <VDialog v-model="dialogDetail" max-width="560" persistent>
    <VCard rounded="xl">
      <VCardText class="pa-7">
        <!-- Titre -->
        <div class="d-flex align-center justify-space-between mb-5">
          <h2 class="text-h6 font-weight-bold">
            Détail — {{ candidatDetail?.name }} {{ candidatDetail?.firstname }}
          </h2>
          <VBtn icon variant="text" size="small" @click="dialogDetail = false">
            <VIcon icon="mdi-close" />
          </VBtn>
        </div>
        <VDivider class="mb-5" />

        <!-- Grille notes par matière -->
        <VRow class="mb-5">
          <VCol
            v-for="subject in (candidatDetail?.candidate_subjects ?? [])"
            :key="subject.id"
            cols="12" sm="4"
          >
            <div class="note-detail-card pa-3 rounded-lg">
              <div class="text-caption font-weight-bold text-medium-emphasis mb-1">{{ subject.subject.label }}</div>
              <div class="d-flex align-center gap-1 mb-1">
                <span
                  class="text-h6 font-weight-bold"
                  :style="{ color: getNoteColor(subject.exam_grade).color }"
                >{{ subject.exam_grade ?? '—' }}</span>
                <span v-if="subject.absent" class="text-body-2 text-error">(Absent)</span>
                <span v-else class="text-body-2 text-medium-emphasis">/ 20</span>
              </div>
              <div class="text-caption text-medium-emphasis">
                Coef. ×{{ subject.coefficient }} → {{ subject.exam_grade !== null && !subject.absent ? (subject.exam_grade * subject.coefficient).toFixed(1) : '—' }} pts
              </div>
            </div>
          </VCol>

          <VCol v-if="!candidatDetail?.candidate_subjects?.length" cols="12">
            <p class="text-body-2 text-medium-emphasis text-center py-4">Aucune note disponible.</p>
          </VCol>
        </VRow>

        <VDivider class="mb-5" />

        <!-- Moyenne + Mention + Décision -->
        <VRow align="end">
          <VCol cols="12" sm="4">
            <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-1">Moyenne pondérée</div>
            <div class="d-flex align-center gap-1">
              <span class="text-h4 font-weight-bold">{{ candidatDetail?.computed_average?.toFixed(2) ?? '—' }}</span>
              <span class="text-h6 text-medium-emphasis">/ 20</span>
            </div>
          </VCol>
          <VCol cols="12" sm="3">
            <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Mention</div>
            <span
              class="text-caption font-weight-bold px-3 py-1 rounded-pill"
              :style="{ color: getMention(candidatDetail?.computed_average).color, background: getMention(candidatDetail?.computed_average).bg }"
            >
              {{ candidatDetail?.mention ?? (candidatDetail?.computed_mention ?? '—') }}
            </span>
          </VCol>
          <VCol cols="12" sm="5">
            <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Décision</div>
            <VSelect
              v-model="deliberationDetail"
              :items="optionsDeliberation.filter(o => o.value !== '')"
              item-title="label"
              item-value="value"
              placeholder="— Choisir —"
              variant="outlined"
              density="compact"
              hide-details
            >
              <template #item="{ item, props }">
                <VListItem v-bind="props">
                  <template #prepend>
                    <span class="me-2">{{ optionsDeliberation.find(o => o.value === item.value)?.icon }}</span>
                  </template>
                </VListItem>
              </template>
            </VSelect>
          </VCol>
        </VRow>

        <VDivider class="mt-5 mb-4" />

        <!-- Actions -->
        <div class="d-flex justify-end gap-3">
          <VBtn variant="outlined" @click="dialogDetail = false">Fermer</VBtn>
          <VBtn color="#1a3a6b" @click="enregistrerDetail">Enregistrer</VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

	  <!-- ─── Modal relevé candidat ──────────────────────────────────────────────── -->
  <VDialog v-model="dialogReleve" max-width="960" persistent>
    <VCard rounded="xl" class="print-card">
      <div class="d-flex align-center justify-space-between bg-primary text-white rounded-tl-xl rounded-tr-xl px-7 py-4 no-print">        <h2 class="text-h6 font-weight-bold">
					Relevé — {{ candidatDetail?.name }} {{ candidatDetail?.firstname }}
        </h2>
				<div>
					<VBtn class="text-primary mr-2" prepend-icon="mdi-printer" @click="imprimerReleve">Imprimer le relevé</VBtn>
					<VBtn class="" icon variant="text" size="small" @click="dialogReleve = false">
						<VIcon icon="mdi-close" />
					</VBtn>
				</div>
      </div>
			<VCardText class="pa-3">
				<div class="releve-card-header d-flex align-center justify-space-between pb-4">
									<div>
										<div class="text-error text-caption font-weight-bold">REPUBLIQUE DU BENIN</div>
										<div class="text-caption text-medium-emphasis">Ministère de l'Education Nationale</div>
										<div class="text-caption text-medium-emphasis">Direction des Examens et Concours — DEC</div>
									</div>
									<div class="text-center">
										<h2 class="text-h4 font-weight-bold mb-1">Relevé de Notes Officiel</h2>
										<div class="text-caption text-medium-emphasis">Baccalauréat Général — Session 2025-2026</div>
									</div>
									<div class="text-end">
										<VChip color="primary" text-color="#fff" class="font-weight-bold">{{ candidatDetail.grade.label ?? 'TLE-C-001' }}</VChip>
										<div class="text-caption text-medium-emphasis mt-1">Emis le {{ new Date().toLocaleDateString('fr-FR') }}</div>
									</div>
				</div>

        <div class="info-grid-container mx-4 my-6">
  				<VRow class="info-grid ">
						<VCol cols="12" sm="6" class="info-cell border-right border-bottom p-3">
							<div class="text-caption text-uppercase text-medium-emphasis mb-1">Nom & Prénoms</div>
							<div class="text-h6 font-weight-bold">{{ candidatDetail?.name }} {{ candidatDetail?.firstname }}</div>
						</VCol>
						<VCol cols="12" sm="6" class="info-cell border-bottom">
							<div class="text-caption text-uppercase text-medium-emphasis mb-1">Matricule</div>
							<div class="text-h6 font-weight-bold text-primary">{{ candidatDetail?.matricule ?? 'TLE-C-001' }}</div>
						</VCol>

						<VCol cols="12" sm="6" class="info-cell border-right border-bottom">
							<div class="text-caption text-uppercase text-medium-emphasis mb-1">Date de naissance</div>
							<div class="text-body-1 font-weight-bold">{{ candidatDetail?.birth_date ?? '12 Jan 2006' }}</div>
						</VCol>
						<VCol cols="12" sm="6" class="info-cell border-bottom">
							<div class="text-caption text-uppercase text-medium-emphasis mb-1">Lieu de naissance</div>
							<div class="text-body-1 font-weight-bold">{{ candidatDetail?.birth_place ?? 'Abidjan' }}</div>
						</VCol>

						<VCol cols="12" sm="6" class="info-cell border-right border-bottom">
							<div class="text-caption text-uppercase text-medium-emphasis mb-1">Établissement d'origine</div>
							<div class="text-body-1 font-weight-bold">{{ candidatDetail?.school_name ?? 'Lycée Moderne de Cocody' }}</div>
						</VCol>
						<VCol cols="12" sm="6" class="info-cell border-bottom">
							<div class="text-caption text-uppercase text-medium-emphasis mb-1">Spécialité / Série</div>
							<div class="text-body-1 font-weight-bold text-primary">{{ candidatDetail?.speciality_label ?? 'Terminale C' }}</div>
						</VCol>
						<VCol cols="12" sm="6" class="info-cell border-right">
							<div class="text-caption text-uppercase text-medium-emphasis mb-1">N° de Table</div>
							<div class="text-h5 font-weight-bold text-primary">{{ candidatDetail?.table_number ?? 'T-001' }}</div>
						</VCol>
						<VCol cols="12" sm="6" class="info-cell">
							<div class="text-caption text-uppercase text-medium-emphasis mb-1">Centre d'examen</div>
							<div class="text-body-1 font-weight-bold">{{ candidatDetail?.centre_name ?? 'Centre Jean Mermoz — Abidjan' }}</div>
						</VCol>
  				</VRow>
				</div>

 				<VCol cols="12" class="mb-3 rounded-lg">
					<VCard variant="flat" color="#e8f5e9" class=" rounded-lg pa-4 border-success">
						<div class="d-flex align-center justify-space-between">
							<div class="d-flex align-center">
								<VAvatar color="success" size="48" class="mr-4">
									<VIcon icon="mdi-check" color="white" size="32" />
								</VAvatar>
								<div>
									<div class="text-h5 font-weight-bold text-success">Admis</div>
									<div class="text-subtitle-1 text-success">Mention : Assez Bien</div>
								</div>
							</div>
							<div class="text-right">
								<div class="text-caption text-medium-emphasis mb-n1">MOYENNE GÉNÉRALE</div>
								<div class="text-h3 font-weight-bold text-success">
									{{ candidatDetail?.computed_average?.toFixed(2) ?? '13.15' }}<span class="text-h6">/20</span>
								</div>
							</div>
						</div>
					</VCard>
        </VCol>

				<VCol cols="12" class="py-0">
											<div class="detail-epreuve">
												<div class="ml-1">Détail des épreuves</div>
											</div>
				</VCol>

				<VTable class="releve-table mx-4">
					<thead>
						<tr class="bg-blue-darken-4 text-white">
							<th class="text-uppercase font-weight-bold">Matière</th>
							<th class="text-uppercase font-weight-bold">Type</th>
							<th class="text-uppercase font-weight-bold">Coef.</th>
							<th class="text-uppercase font-weight-bold">Note / 20</th>
							<th class="text-uppercase font-weight-bold">Points pondérés</th>
						</tr>
					</thead>
					<tbody>
					<tr v-for="subject in (candidatDetail?.candidate_subjects ?? [])" :key="subject.id">
							<td class="font-weight-medium">{{ subject.subject?.label ?? '—' }}</td>
							<td class="text-primary">{{ subject.subject?.label ?? '—' }}</td>
							<td class="font-weight-bold">{{ subject.coefficient ?? '—' }}</td>
							<td>
								<div class="d-flex align-center">
								<span class="font-weight-bold text-success mr-1">
									{{ subject.exam_grade != null ? subject.exam_grade.toFixed(2) : '—' }}
								</span>
								<VProgressLinear
									:model-value="subject.exam_grade != null ? subject.exam_grade * 5 : 0"
									color="success"
									height="6"
									rounded
									style="width: 60px"
								/>
							</div>
						</td>
						<td class="font-weight-bold text-blue-darken-4 text-end">
							{{ subject.exam_grade != null && subject.coefficient != null ? (subject.exam_grade * subject.coefficient).toFixed(2) : '—' }}
						</td>
						</tr>
					</tbody>
				</VTable>

        <VCol cols="12" class="py-0 mt-6">
					<div class="detail-epreuve"><div class="ml-1">Indicateurs statistiques</div></div>
				</VCol>

        <VRow class="px-4">
  <VCol v-for="stat in stats" :key="stat.label" cols="12" sm="3">
    <VCard variant="outlined" class="rounded-lg pa-3 bg-grey-lighten-5" border="sm">
      <div class="text-caption text-medium-emphasis mb-1">{{ stat.label }}</div>
      <div class="text-h4 font-weight-bold" :class="stat.colorClass">
        {{ stat.value }}<span v-if="stat.suffix" class="text-caption ml-1">{{ stat.suffix }}</span>
      </div>
    </VCard>
  </VCol>
			  </VRow>

        <VDivider class="my-4" />

  		  <VRow class="mt-8 px-6 text-center">
				  <VCol cols="12" sm="4">
					  <div class="text-caption text-uppercase text-medium-emphasis mb-10">Le Candidat</div>
					  <VDivider class="mb-2" color="primary" />
					  <div class="text-body-1 font-weight-bold">{{ candidatDetail?.name }} {{ candidatDetail?.firstname }}</div>
					  <div class="text-caption text-medium-emphasis">{{ candidatDetail?.matricule }}</div>
				  </VCol>

  			  <VCol cols="12" sm="4" class="d-flex flex-column align-center">
    			  <div class="text-caption text-uppercase text-medium-emphasis mb-2">Le Directeur des Examens et Concours</div>
    
            <div class="stamp-circle d-flex align-center justify-center mb-2">
              <div class="text-center" style="font-size: 8px; line-height: 1; font-weight: bold; color: #1a3a6b;">
               MIN.<br>ÉDU.<br>NAT.
              </div>
            </div>

           <VDivider class="w-100 mb-2" color="primary" />
           <div class="text-body-1 font-weight-bold">Dr. KOFFI Aimé Emmanuel</div>
           <div class="text-caption text-medium-emphasis">Direction des Examens et Concours — DEC</div>
  			  </VCol>

				  <VCol cols="12" sm="4">
					  <div class="text-caption text-uppercase text-medium-emphasis mb-2">Cachet Officiel</div>
					  <div class="cachet-box d-flex align-center justify-center mb-2">
						  <span class="text-caption text-medium-emphasis">CACHET DEC</span>
					  </div>
					  <div class="text-caption text-medium-emphasis">Ministère de l'Éducation Nationale</div>
				  </VCol>
        </VRow>

				<div class="px-6 mt-6">
					<VDivider class="mb-2" />
					<div class="d-flex justify-space-between text-caption text-medium-emphasis flex-wrap">
						<span>Document officiel certifié conforme</span>
						<span>Session BAC 2025–2026</span>
						<span>Plateforme ExamGest</span>
						<span>www.examens.gouv.ci</span>
						<span>Réf. {{ candidatDetail?.matricule }} — Table {{ candidatDetail?.table_number }}</span>
					</div>
				</div>

        <div class="d-flex justify-end gap-3 mt-4 px-6 no-print">
          <VBtn variant="outlined" @click="dialogReleve = false">Fermer</VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <VSnackbar v-model="feedback.visible" :color="feedback.color" timeout="3200" location="top right">
    {{ feedback.text }}
  </VSnackbar>
</template>

<style scoped>
.note-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.moyenne-badge {
  display: inline-block;
  min-width: 56px;
  text-align: center;
}

.releve-card-header {
  border-bottom: 2px solid #1a3a6b;
  background: #fff;
}

.releve-card-header .text-error {
  color: #d32f2f;
  font-size: 0.78rem;
}

.note-detail-card {
  border: 1px solid #e0e0e0;
  background: #f9fafb;
  transition: background 0.15s;
  font-size: 0.88rem;
  color: #1a3a6b;
}
.note-detail-card:hover {
  background: #f0f4ff;
}

.print-card {
  box-shadow: 0 0 1rem rgba(0,0,0,.1);
  border-radius: 1rem;
  background: #fff;
}

.print-card {
  font-family: 'Inter', sans-serif; /* Ou une police similaire */
}

.releve-table :deep(thead th) {
  background-color: #1a3a6b !important; /* Couleur bleu foncé de l'entête */
  color: white !important;
  height: 48px !important;
}

.releve-table :deep(tbody tr:nth-child(even)) {
  background-color: #f8fafc;
}

/* Style pour les puces en haut à droite */
.chip-id {
  background-color: #e3f2fd !important;
  color: #1976d2 !important;
  border-radius: 8px !important;
}

/* Bordure pour le bloc Admis */
.border-success {
  border: 1px solid #c3e6cb !important;
}

.stamp-circle {
  width: 60px;
  height: 60px;
  border: 2px solid #1a3a6b;
  border-radius: 50%;
  margin-top: -10px; /* Pour l'ajuster au dessus de la ligne */
  background: white;
}

.cachet-box {
  height: 60px;
  border: 1px dashed #ced4da;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.text-purple {
  color: #6f42c1 !important;
}

.info-grid-container {
  border: 1px solid #d4d8e0;
  border-radius: 12px;
  overflow: hidden; /* Pour que les coins arrondis coupent les bordures internes */
}

.info-cell {
  padding: 12px 20px;
  background-color: white;
}

/* Gestion des bordures internes */
.border-right {
  border-right: 1px solid #d4d8e0 !important;
}

.border-bottom {
  border-bottom: 1px solid #d4d8e0 !important;
}

/* Style spécifique pour les textes bleus comme sur la capture */
.text-primary {
  color: #1a3a6b !important;
}

/* Optionnel : un léger effet au survol pour faire "pro" */
.info-cell:hover {
  background-color: #fcfcfc;
}
.detail-epreuve{
margin-bottom: 0.5rem;
    font-size: 0.75rem;
    border-left: 4px solid #c3e6cb;
}

/* --- LOGIQUE D'IMPRESSION --- */
@media print {
  /* On cache tout ce qui ne doit pas être imprimé */
  .no-print, .v-btn, .v-overlay__scrim, .v-navigation-drawer {
    display: none !important;
  }

  /* On force le modal à prendre toute la page sans marges de navigateur */
  .v-dialog > .v-overlay__content {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    top: 0 !important;
    left: 0 !important;
  }

  .print-card {
    box-shadow: none !important;
    border: none !important;
    width: 100% !important;
  }

  /* Force le fond blanc et enlève les arrondis inutiles sur papier */
  .v-card {
    background-color: white !important;
    border-radius: 0 !important;
  }

  /* Optionnel : Ajuster la taille pour que ça tienne sur une feuille A4 */
  .releve-table {
    font-size: 12px;
  }
}
</style>
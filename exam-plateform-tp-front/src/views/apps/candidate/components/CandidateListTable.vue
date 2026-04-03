<script setup lang="ts">
import { candidateApi } from '@/api/candidate'
import { useStudents } from '@/composables/useStudent'
import AppTable from '@/layouts/AppTable.vue'
import AppModal from '@/views/components/modal/AppModal.vue'

type CandidateListItem = {
  id: number
  nom: string
  prenoms: string
  matricule: string
  specialite: string
  ecole: string
  centre: string
  session: string
  examStatus: string
}

const props = withDefaults(defineProps<{
  schoolId?: number | null
  examSchoolId?: number | null
  examId?: number | null
  canAssignCenter?: boolean
  isSchoolViewer?: boolean
}>(), {
  schoolId: null,
  examSchoolId: null,
  examId: null,
  canAssignCenter: true,
  isSchoolViewer: false,
})

const { students, loading, error, fetchAll, fetchBySchool, fetchBySchoolAndExam } = useStudents()

const columns = [
  { key: 'nom', label: 'Nom' },
  { key: 'prenoms', label: 'Prénoms' },
  { key: 'matricule', label: 'Matricule' },
  { key: 'specialite', label: 'Spécialité' },
  { key: 'ecole', label: 'École' },
  { key: 'centre', label: 'Centre' },
  { key: 'session', label: 'Session' },
  { key: 'actions', label: 'Actions', align: 'end' as const },
]

const rechercheCandidats = ref('')
const filtreEcole = ref<string | null>(null)
const filtreSpecialite = ref<string | null>(null)
const filtreCentre = ref<string | null>(null)
const centreOverrides = ref<Record<number, string>>({})

const dialogAffectation = ref(false)
const candidatSelectionne = ref<CandidateListItem | null>(null)
const centreSelectionne = ref<string | null>(null)

const loadingInvitationCandidateId = ref<number | null>(null)
const loadingBulkConvocations = ref(false)
const loadingBulkReleves = ref(false)

const feedback = ref({
  visible: false,
  text: '',
  color: 'success',
})

const studentsScoped = computed(() => {
  if (!props.examId)
    return students.value

  const examId = Number(props.examId)
  return students.value.filter(student => {
    const studentExamId = Number(
      student.exam_school?.exam_id
      ?? student.exam_school?.exam?.id
      ?? student.candidate?.exam_school_id,
    )

    return studentExamId === examId
  })
})

const normalizedCandidates = computed<CandidateListItem[]>(() =>
  studentsScoped.value.map(student => {
    const rawCandidate = student.candidate as any
    const rawExamSchool = student.exam_school as any
    const rawSchool = rawExamSchool?.school
    const rawSpeciality = rawCandidate?.speciality
    const rawTestCenter = rawCandidate?.test_center

    return {
      id: student.id,
      nom: student.user?.name ?? '',
      prenoms: student.user?.firstname ?? '',
      matricule: rawCandidate?.matricule ?? student.code ?? '—',
      specialite: rawCandidate?.speciality_name ?? rawSpeciality?.code ?? '—',
      ecole: rawCandidate?.school_name ?? rawSchool?.name ?? '—',
      centre: centreOverrides.value[student.id] ?? rawCandidate?.test_center_name ?? rawTestCenter?.title ?? '—',
      session: rawExamSchool?.exam?.title ?? `Session #${student.exam_school_id}`,
      examStatus: rawExamSchool?.exam?.status ?? '',
    }
  }),
)

const optionsEcoles = computed(() => [...new Set(normalizedCandidates.value.map(candidate => candidate.ecole).filter(value => value && value !== '—'))].sort())
const optionsSpecialites = computed(() => [...new Set(normalizedCandidates.value.map(candidate => candidate.specialite).filter(value => value && value !== '—'))].sort())
const optionsCentres = computed(() => [...new Set(normalizedCandidates.value.map(candidate => candidate.centre).filter(value => value && value !== '—'))].sort())

const hasAnyDeliberation = computed(() =>
  studentsScoped.value.some(student => {
    const candidateData = (student as any)?.candidate
    const deliberation = (student as any)?.deliberation ?? candidateData?.deliberation
    return deliberation !== null && deliberation !== undefined
  }),
)

const afficherFeedback = (text: string, color: 'success' | 'error' | 'warning' = 'success') => {
  feedback.value = {
    visible: true,
    text,
    color,
  }
}

const candidatsFiltres = computed(() =>
  normalizedCandidates.value.filter(candidate => {
    const query = rechercheCandidats.value.toLowerCase().trim()
    const matchSearch = !query
      || candidate.nom.toLowerCase().includes(query)
      || candidate.prenoms.toLowerCase().includes(query)
      || candidate.matricule.toLowerCase().includes(query)
      || candidate.session.toLowerCase().includes(query)

    const matchEcole = props.isSchoolViewer || !filtreEcole.value || candidate.ecole === filtreEcole.value
    const matchSpecialite = !filtreSpecialite.value || candidate.specialite === filtreSpecialite.value
    const matchCentre = !filtreCentre.value || candidate.centre === filtreCentre.value

    return matchSearch && matchEcole && matchSpecialite && matchCentre
  }),
)

const centresAssignables = computed(() => optionsCentres.value)

const ouvrirAffectation = (candidate: CandidateListItem) => {
  candidatSelectionne.value = candidate
  centreSelectionne.value = candidate.centre !== '—' ? candidate.centre : null
  dialogAffectation.value = true
}

const confirmerAffectation = () => {
  if (!candidatSelectionne.value || !centreSelectionne.value?.trim()) {
    afficherFeedback('Veuillez sélectionner ou saisir un centre.', 'warning')
    return
  }

  centreOverrides.value = {
    ...centreOverrides.value,
    [candidatSelectionne.value.id]: centreSelectionne.value.trim(),
  }

  dialogAffectation.value = false
  afficherFeedback(`Centre affecté à ${candidatSelectionne.value.prenoms} ${candidatSelectionne.value.nom}.`)
}

const ouvrirConvocation = async (candidate: CandidateListItem) => {
  loadingInvitationCandidateId.value = candidate.id
  try {
    const pdfBlob = await candidateApi.downloadInvitation(candidate.id)
    const url = window.URL.createObjectURL(pdfBlob)
    const opened = window.open(url, '_blank')

    if (!opened)
      afficherFeedback('Impossible d’ouvrir la convocation. Vérifiez le bloqueur de fenêtres.', 'error')

    setTimeout(() => window.URL.revokeObjectURL(url), 60_000)
  }
  catch (e: any) {
    afficherFeedback(e?.response?.data?.message ?? 'Erreur lors de l\'ouverture de la convocation.', 'error')
  }
  finally {
    loadingInvitationCandidateId.value = null
  }
}

const telechargerFichier = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => window.URL.revokeObjectURL(url), 60_000)
}

const telechargerToutesConvocations = async () => {
  if (!candidatsFiltres.value.length) {
    afficherFeedback('Aucun candidat à traiter.', 'warning')
    return
  }

  loadingBulkConvocations.value = true
  let successCount = 0

  try {
    for (const candidate of candidatsFiltres.value) {
      try {
        const pdfBlob = await candidateApi.downloadInvitation(candidate.id)
        const safeName = `${candidate.nom}_${candidate.prenoms}`.replace(/\s+/g, '_')
        telechargerFichier(pdfBlob, `convocation_${safeName}_${candidate.id}.pdf`)
        successCount += 1
      }
      catch {
        // Continue downloading remaining files even if one fails.
      }
    }

    if (!successCount)
      afficherFeedback('Aucune convocation n\'a pu être téléchargée.', 'error')
    else
      afficherFeedback(`${successCount} convocation(s) téléchargée(s).`)
  }
  finally {
    loadingBulkConvocations.value = false
  }
}

const telechargerTousReleves = async () => {
  const candidatsAvecDeliberation = studentsScoped.value.filter(student => {
    const candidateData = (student as any)?.candidate
    const deliberation = (student as any)?.deliberation ?? candidateData?.deliberation
    return deliberation !== null && deliberation !== undefined
  })

  if (!candidatsAvecDeliberation.length) {
    afficherFeedback('Aucun relevé disponible.', 'warning')
    return
  }

  loadingBulkReleves.value = true
  try {
    let successCount = 0

    for (const student of candidatsAvecDeliberation) {
      const candidateData = (student as any)?.candidate
      const deliberation = (student as any)?.deliberation ?? candidateData?.deliberation
      const resultUrl = deliberation?.releve_url ?? deliberation?.file_url ?? deliberation?.url ?? deliberation?.pdf_url

      if (!resultUrl)
        continue

      const fileName = `releve_${student.user?.name ?? 'candidat'}_${student.user?.firstname ?? ''}_${student.id}.pdf`.replace(/\s+/g, '_')
      const link = document.createElement('a')
      link.href = String(resultUrl)
      link.download = fileName
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      successCount += 1
    }

    if (!successCount)
      afficherFeedback('Aucun lien de relevé exploitable trouvé.', 'warning')
    else
      afficherFeedback(`${successCount} relevé(s) lancé(s) en téléchargement.`)
  }
  finally {
    loadingBulkReleves.value = false
  }
}

onMounted(async () => {
  if (props.schoolId && props.examSchoolId) {
    await fetchBySchoolAndExam(props.schoolId, props.examSchoolId)
    return
  }

  if (props.schoolId) {
    await fetchBySchool(props.schoolId)
    return
  }

  await fetchAll()
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div v-if="props.isSchoolViewer" class="d-flex flex-wrap gap-2 mb-4">
        <VBtn
          color="#1a3a6b"
          variant="outlined"
          class="text-none"
          :loading="loadingBulkConvocations"
          @click="telechargerToutesConvocations"
        >
          Télécharger toutes les convocations
        </VBtn>

        <VBtn
          v-if="hasAnyDeliberation"
          color="secondary"
          variant="outlined"
          class="text-none"
          :loading="loadingBulkReleves"
          @click="telechargerTousReleves"
        >
          Télécharger tout les relevés
        </VBtn>
      </div>

      <VRow dense>
        <VCol cols="12" md="3">
          <VTextField
            v-model="rechercheCandidats"
            placeholder="Rechercher un candidat..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
            clearable
          />
        </VCol>
        <VCol v-if="!props.isSchoolViewer" cols="12" md="3">
          <VAutocomplete
            v-model="filtreEcole"
            :items="optionsEcoles"
            placeholder="Filtrer par école"
            variant="outlined"
            density="compact"
            hide-details
            clearable
          />
        </VCol>
        <VCol cols="12" md="3">
          <VAutocomplete
            v-model="filtreSpecialite"
            :items="optionsSpecialites"
            placeholder="Filtrer par spécialité"
            variant="outlined"
            density="compact"
            hide-details
            clearable
          />
        </VCol>
        <VCol cols="12" md="3">
          <VAutocomplete
            v-model="filtreCentre"
            :items="optionsCentres"
            placeholder="Filtrer par centre"
            variant="outlined"
            density="compact"
            hide-details
            clearable
          />
        </VCol>
      </VRow>
    </VCol>

    <VCol v-if="loading" cols="12" class="d-flex justify-center py-6">
      <VProgressCircular indeterminate color="primary" size="38" />
    </VCol>

    <VCol v-else-if="error" cols="12">
      <VAlert type="error" variant="tonal">{{ error }}</VAlert>
    </VCol>

    <VCol v-else cols="12">
      <AppTable
        title="Candidats inscrits"
        :columns="columns"
        :items="candidatsFiltres"
        :count="candidatsFiltres.length"
      >
        <template #cell-specialite="{ item }">
          <VChip size="small" color="primary" variant="tonal">
            {{ item.specialite }}
          </VChip>
        </template>

        <template #cell-actions="{ item }">
          <div class="d-flex justify-end flex-wrap gap-2">
            <VBtn
              size="small"
              variant="outlined"
              color="#1a3a6b"
              class="text-none"
              :loading="loadingInvitationCandidateId === item.id"
              @click="ouvrirConvocation(item)"
            >
              Convocation
            </VBtn>
            <VBtn
              size="small"
              variant="outlined"
              class="text-none"
              :to="{ name: 'apps-candidate-details', params: { id: item.id } }"
            >
              Détail
            </VBtn>
          </div>
        </template>
      </AppTable>
    </VCol>
  </VRow>

  <AppModal
    v-if="props.canAssignCenter"
    v-model="dialogAffectation"
    title="Affecter un centre au candidat"
    :max-width="520"
    @close="dialogAffectation = false"
  >
    <p class="text-body-2 text-medium-emphasis mb-4">
      Sélectionnez ou saisissez un centre pour
      <strong>{{ candidatSelectionne?.prenoms }} {{ candidatSelectionne?.nom }}</strong>.
    </p>

    <VCombobox
      v-model="centreSelectionne"
      :items="centresAssignables"
      label="Centre d'examen"
      variant="outlined"
      density="compact"
      hide-details
      clearable
    />

    <template #actions>
      <VBtn variant="outlined" @click="dialogAffectation = false">Annuler</VBtn>
      <VBtn color="#1a3a6b" @click="confirmerAffectation">
        Affecter
      </VBtn>
    </template>
  </AppModal>

  <VSnackbar v-model="feedback.visible" :color="feedback.color" timeout="2800" location="top right">
    {{ feedback.text }}
  </VSnackbar>
</template>

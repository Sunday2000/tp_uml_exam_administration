<script setup lang="ts">
import { useExams } from '@/composables/useExam'
import { useStudents } from '@/composables/useStudent'
import AppTable from '@/layouts/AppTable.vue'
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted, ref, watch } from 'vue'
import StudentImport from './Import.vue'

const authStore = useAuthStore()
const { subscriptions, loading: loadingSubscriptions, error: subscriptionError, fetchSchoolSubscriptions } = useExams()
const { students, loading, error, fetchBySchoolAndExam } = useStudents()

const columns = [
  { key: 'nom_complet', label: 'Étudiant' },
  { key: 'code', label: 'Code' },
  { key: 'specialite', label: 'Spécialité' },
  { key: 'examens', label: 'Examens présentés' },
  { key: 'actions', label: 'Actions', align: 'end' as const },
]

const recherche = ref('')
const sessionSelectionnee = ref<number | null>(null)
const importDialog = ref(false)
const shouldLoadStudents = ref(false)

const schoolId = computed(() => Number(authStore.session?.user?.school_id ?? 0))

const optionsSessions = computed(() =>
  subscriptions.value
    .map((row: any) => ({
      value: Number(row?.id),
      title: row?.exam?.title || `Examen #${row?.exam_id ?? row?.id}`,
    }))
    .filter(option => Number.isFinite(option.value) && option.value > 0),
)

onMounted(async () => {
  if (schoolId.value)
    await fetchSchoolSubscriptions(schoolId.value)
})

watch(sessionSelectionnee, async value => {
  if (!value || !schoolId.value) {
    shouldLoadStudents.value = false
    return
  }

  shouldLoadStudents.value = true
  await fetchBySchoolAndExam(schoolId.value, value)
})

const etudiantsFiltres = computed(() =>
  students.value.filter(s => {
    const q = recherche.value.toLowerCase().trim()
    const name = `${s.user?.name ?? ''}`.toLowerCase()
    const firstname = `${s.user?.firstname ?? ''}`.toLowerCase()
    const code = `${s.code ?? ''}`.toLowerCase()
    const matchRecherche = !q || code.includes(q) || name.includes(q) || firstname.includes(q)
    const matchSession = !sessionSelectionnee.value || Number(s.exam_school_id) === sessionSelectionnee.value
    return matchRecherche && matchSession
  }),
)

const toCsvCell = (value: string) => `"${value.replace(/"/g, '""')}"`

const exporterExcel = () => {
  if (!etudiantsFiltres.value.length) return

  const rows = [
    ['Nom', 'Prenoms', 'Code', 'Sessions'],
    ...etudiantsFiltres.value.map(student => [
      student.user?.name ?? '',
      student.user?.firstname ?? '',
      student.code,
      student.exam_school?.exam?.title ?? '',
    ]),
  ]

  const csv = `\uFEFF${rows.map(row => row.map(col => toCsvCell(col)).join(';')).join('\n')}`
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = window.URL.createObjectURL(blob)
  const lien = document.createElement('a')
  lien.href = url
  lien.download = `etudiants-${sessionSelectionnee.value ? String(sessionSelectionnee.value) : 'toutes-sessions'}.csv`
  document.body.appendChild(lien)
  lien.click()
  document.body.removeChild(lien)
  window.URL.revokeObjectURL(url)
}

const ouvrirDialogImport = () => {
  importDialog.value = true
}

const fermerDialogImport = () => {
  importDialog.value = false
}

const onImportSuccess = async () => {
  fermerDialogImport()
  if (sessionSelectionnee.value && schoolId.value)
    await fetchBySchoolAndExam(schoolId.value, sessionSelectionnee.value)
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div class="d-flex align-center justify-space-between flex-wrap gap-3">
        <div>
          <h1 class="text-h5 font-weight-bold">Étudiants de l'école</h1>
          <p class="text-body-2 text-medium-emphasis mt-1 mb-0">Liste des étudiants inscrits via votre école</p>
        </div>
        <div class="d-flex gap-2">
          <VBtn color="#1a3a6b" prepend-icon="mdi-plus" :to="{ name: 'apps-school-student-register' }" class="text-none">
            Inscrire un étudiant
          </VBtn>
          <VBtn variant="outlined" color="#1a3a6b" prepend-icon="mdi-file-excel" class="text-none" @click="ouvrirDialogImport">
            Import Excel
          </VBtn>
          <VBtn
            variant="tonal"
            color="success"
            prepend-icon="mdi-microsoft-excel"
            class="text-none"
            :disabled="!etudiantsFiltres.length"
            @click="exporterExcel"
          >
            Export Excel
          </VBtn>
        </div>
      </div>
    </VCol>

    <VCol cols="12">
      <VRow dense>
        <VCol cols="12" md="4">
          <VTextField
            v-model="recherche"
            placeholder="Nom ou code étudiant..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
          />
        </VCol>
        <VCol cols="12" md="4">
          <VSelect
            v-model="sessionSelectionnee"
            :items="optionsSessions"
            item-title="title"
            item-value="value"
            placeholder="Filtrer par session d'examen"
            variant="outlined"
            density="compact"
            hide-details
            clearable
          />
        </VCol>
      </VRow>
    </VCol>

    <VCol v-if="!sessionSelectionnee" cols="12">
      <VAlert type="info" variant="tonal">
        Veuillez d'abord sélectionner une session d'examen pour charger la liste des étudiants.
      </VAlert>
    </VCol>

    <VCol v-else-if="loadingSubscriptions" cols="12" class="d-flex justify-center py-6">
      <VProgressCircular indeterminate color="primary" size="38" />
    </VCol>

    <VCol v-else-if="subscriptionError" cols="12">
      <VAlert type="error" variant="tonal">{{ subscriptionError }}</VAlert>
    </VCol>

    <VCol v-else-if="loading" cols="12" class="d-flex justify-center py-6">
      <VProgressCircular indeterminate color="primary" size="38" />
    </VCol>

    <VCol v-else-if="error" cols="12">
      <VAlert type="error" variant="tonal">{{ error }}</VAlert>
    </VCol>

    <VCol cols="12">
      <AppTable
        title="Liste des étudiants"
        :columns="columns"
        :items="shouldLoadStudents ? etudiantsFiltres : []"
        :count="shouldLoadStudents ? etudiantsFiltres.length : 0"
      >
        <template #cell-nom_complet="{ item }">
          <div>
            <span class="text-body-2 font-weight-semibold text-high-emphasis">{{ item.user?.name }} {{ item.user?.firstname }}</span>
          </div>
        </template>

        <template #cell-code="{ item }">
          <span class="text-body-2 text-medium-emphasis">{{ item.code }}</span>
        </template>

        <template #cell-specialite="{ item }">
          <VChip size="x-small" color="secondary" variant="tonal">
            {{ item.candidate?.speciality?.code ?? '—' }}
          </VChip>
        </template>

        <template #cell-examens="{ item }">
          <div class="d-flex gap-1 flex-wrap">
            <VChip size="x-small" color="primary" variant="tonal">
              {{ item.exam_school?.exam?.title ?? `Exam #${item.exam_school_id}` }}
            </VChip>
          </div>
        </template>

        <template #cell-actions="{ item }">
          <VBtn
            size="small"
            variant="outlined"
            class="text-none"
            :to="{ name: 'apps-candidate-details', params: { id: item.id } }"
          >
            Détail
          </VBtn>
        </template>
      </AppTable>
    </VCol>

    <VDialog v-model="importDialog" max-width="550" scrollable>
      <VCard>
        <VCardTitle class="d-flex align-center justify-space-between">
          <span class="text-subtitle-1 font-weight-bold">Import Excel des candidats</span>
          <VBtn icon="mdi-close" variant="text" @click="fermerDialogImport" />
        </VCardTitle>
        <VCardSubtitle>
          Importez vos candidats en masse via un fichier Excel
        </VCardSubtitle>
        <VDivider />
        <VCardText class="pt-4">
          <StudentImport embedded @close="fermerDialogImport" @success="onImportSuccess" />
        </VCardText>
      </VCard>
    </VDialog>
  </VRow>
</template>

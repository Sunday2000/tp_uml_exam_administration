<script setup lang="ts">
import { useExams } from '@/composables/useExam'
import AppTable from '@/layouts/AppTable.vue'
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  statusBgColors,
  statusColors,
  statusLabels,
} from './schoolSessionData'

const authStore = useAuthStore()
const router = useRouter()
const { exams: schoolSessions, loading, error, fetchBySchool } = useExams()

const columns = [
  { key: 'title', label: 'Titre' },
  { key: 'start_date', label: 'Date début' },
  { key: 'end_date', label: 'Date fin' },
  { key: 'registration_deadline', label: 'Fin inscriptions' },
  { key: 'status', label: 'Statut' },
  { key: 'candidates_count', label: 'Candidats' },
  { key: 'actions', label: 'Actions', align: 'end' as const },
]

// Load exams on mount
onMounted(async () => {
  const schoolId = authStore.session?.user?.school_id
  if (schoolId) {
    await fetchBySchool(Number(schoolId))
  }
})

const recherche = ref('')
const sessionsFiltrees = computed(() =>
  schoolSessions.value.filter(s =>
    (s.title ?? '').toLowerCase().includes(recherche.value.toLowerCase()),
  ),
)

const sessionsOuvertes = computed(() => schoolSessions.value.filter(session => session.inscriptions_open))

const allerPageRechercheExamen = () => {
  router.push({ name: 'apps-school-session-search' })
}

const allerPageCandidatsSession = (examId: number | string | null | undefined) => {
  const normalizedExamId = Number(examId)
  if (!Number.isFinite(normalizedExamId) || normalizedExamId <= 0)
    return

  router.push({
    name: 'apps-school-session-candidates',
    params: { exam_id: String(normalizedExamId) },
  })
}

const formatDate = (date: string | null | undefined) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div class="d-flex align-center justify-space-between flex-wrap gap-3">
        <div>
          <h1 class="text-h5 font-weight-bold">Mes sessions d'examen</h1>
          <p class="text-body-2 text-medium-emphasis mt-1 mb-0">Sessions auxquelles votre école participe</p>
        </div>
        <VBtn
          color="#1a3a6b"
          prepend-icon="mdi-magnify"
          class="text-none"
          @click="allerPageRechercheExamen"
        >
          S'inscrire à un examen
        </VBtn>
      </div>
    </VCol>

    <VCol cols="12">
      <VTextField
        v-model="recherche"
        placeholder="Rechercher une session..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        style="max-width: 300px;"
      />
    </VCol>

    <!-- Loading State -->
    <VCol v-if="loading" cols="12" class="d-flex justify-center py-8">
      <VProgressCircular indeterminate color="primary" size="48" />
    </VCol>

    <!-- Error State -->
    <VCol v-else-if="error" cols="12">
      <VAlert type="error" variant="tonal">
        {{ error }}
      </VAlert>
    </VCol>

    <!-- Table -->
    <VCol v-else cols="12">
      <AppTable
        title="Mes sessions"
        :columns="columns"
        :items="sessionsFiltrees"
        :count="sessionsFiltrees.length"
      >
        <template #cell-title="{ item }">
          <span class="text-body-2 font-weight-semibold text-primary">{{ item.title }}</span>
        </template>

        <template #cell-start_date="{ item }">
          <span class="text-body-2">{{ formatDate(item.start_date) }}</span>
        </template>

        <template #cell-end_date="{ item }">
          <span class="text-body-2">{{ formatDate(item.end_date) }}</span>
        </template>

        <template #cell-registration_deadline="{ item }">
          <span class="text-body-2">{{ formatDate(item.registration_deadline) }}</span>
        </template>

        <template #cell-status="{ item }">
            <span
              v-if="item.status"
              class="d-inline-flex align-center gap-1 rounded-pill px-2 py-1 text-caption font-weight-bold"
              :style="{ backgroundColor: statusBgColors[item.status] || '#f3f4f6', color: statusColors[item.status] || '#6b7280' }"
            >
              <span style="font-size: 0.5rem;">●</span>
              {{ statusLabels[item.status] }}
            </span>
            <VChip v-if="item.inscriptions_open" class="d-block my-2" size="x-small" color="success" variant="tonal">
              Inscriptions ouvertes
            </VChip>
        </template>

        <template #cell-candidates_count="{ item }">
          <span class="text-body-2 font-weight-semibold">{{ item.candidates_count }}</span>
        </template>

        <template #cell-actions="{ item }">
          <div class="d-flex gap-2 justify-end">
            <VBtn
              size="small"
              variant="outlined"
              class="text-none"
              @click="allerPageCandidatsSession(item.id)"
            >
              Candidats
            </VBtn>
          </div>
        </template>
      </AppTable>
    </VCol>
  </VRow>
</template>

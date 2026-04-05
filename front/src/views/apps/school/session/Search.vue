<script setup lang="ts">
import { useExams } from '@/composables/useExam'
import type { Exam } from '@/interfaces/exam'
import AppTable from '@/layouts/AppTable.vue'
import { useAuthStore } from '@/stores/auth'
import AppModal from '@/views/components/modal/AppModal.vue'
import { computed, onMounted, ref } from 'vue'

const authStore = useAuthStore()
const {
  exams,
  loading,
  error,
  subscriptions,
  fetchAll,
  fetchSchoolSubscriptions,
  extractSubscribedExamIds,
  subscribeSchoolToExam,
} = useExams()

const columns = [
  { key: 'title', label: 'Titre' },
  { key: 'start_date', label: 'Date début' },
  { key: 'end_date', label: 'Date fin' },
  { key: 'registration_deadline', label: 'Fin inscriptions' },
  { key: 'specialities', label: 'Spécialités' },
  { key: 'actions', label: 'Actions', align: 'end' as const },
]

const recherche = ref('')
const erreurInscription = ref('')
const succesInscription = ref('')

const schoolId = computed(() => Number(authStore.session?.user?.school_id ?? 0))

onMounted(async () => {
  if (!schoolId.value)
    return

  await Promise.all([
    fetchAll(),
    fetchSchoolSubscriptions(schoolId.value),
  ])
})

const examensDisponibles = computed(() => {
  const now = Date.now()
  const subscribedExamIds = new Set(extractSubscribedExamIds(subscriptions.value))

  return exams.value.filter((exam: Exam) => {
    const isOngoing = (exam.status ?? '').toLowerCase() === 'ongoing'
    const deadline = exam.registration_deadline ? new Date(exam.registration_deadline).getTime() : 0
    const deadlineOpen = deadline > now
    const notAlreadySubscribed = !subscribedExamIds.has(exam.id)

    return isOngoing && deadlineOpen && notAlreadySubscribed
  })
})

const sessionsFiltrees = computed(() => {
  const q = recherche.value.toLowerCase().trim()
  if (!q) return examensDisponibles.value

  return examensDisponibles.value.filter(s =>
    (s.title ?? '').toLowerCase().includes(q),
  )
})

const specialitesExam = (exam: Exam) => {
  return (exam.specialities ?? []).map(spec => spec.code || spec.grade?.label || spec.serie?.label || `Spécialité ${spec.id}`)
}

// ─── Dialog inscription ───────────────────────────────────────────────────────
const dialogInscrire = ref(false)
const inscriptionLoading = ref(false)
const sessionAInscrire = ref<Exam | null>(null)

const ouvrirInscrire = (session: Exam) => {
  erreurInscription.value = ''
  succesInscription.value = ''
  sessionAInscrire.value = session
  dialogInscrire.value = true
}

const confirmerInscription = async () => {
  erreurInscription.value = ''
  succesInscription.value = ''

  if (!schoolId.value || !sessionAInscrire.value?.id) {
    erreurInscription.value = 'Impossible de recuperer les informations d\'inscription.'
    return
  }

  inscriptionLoading.value = true
  const ok = await subscribeSchoolToExam(sessionAInscrire.value.id, schoolId.value)
  inscriptionLoading.value = false

  if (!ok) {
    erreurInscription.value = error.value || 'Echec de l\'inscription a la session.'
    return
  }

  await fetchSchoolSubscriptions(schoolId.value)
  succesInscription.value = 'Inscription effectuee avec succes.'
  dialogInscrire.value = false
  sessionAInscrire.value = null
}

const formatDate = (date: string) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div>
        <h1 class="text-h5 font-weight-bold">Rechercher un examen</h1>
        <p class="text-body-2 text-medium-emphasis mt-1 mb-0">Trouvez et inscrivez-vous à une session d'examen</p>
      </div>
    </VCol>

    <VCol cols="12">
      <VTextField
        v-model="recherche"
        placeholder="Rechercher par titre..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        style="max-width: 350px;"
      />
    </VCol>

    <VCol v-if="loading" cols="12" class="d-flex justify-center py-8">
      <VProgressCircular indeterminate color="primary" size="48" />
    </VCol>

    <VCol v-else-if="error" cols="12">
      <VAlert type="error" variant="tonal">{{ error }}</VAlert>
    </VCol>

    <VCol v-else cols="12">
      <VAlert
        v-if="succesInscription"
        type="success"
        variant="tonal"
        class="mb-4"
      >
        {{ succesInscription }}
      </VAlert>

      <AppTable
        title="Sessions disponibles"
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

        <template #cell-specialities="{ item }">
          <div class="d-flex gap-1 flex-wrap">
            <VChip v-for="spec in specialitesExam(item)" :key="spec" size="x-small" color="primary" variant="tonal">
              {{ spec }}
            </VChip>
            <span v-if="!specialitesExam(item).length" class="text-caption text-medium-emphasis">—</span>
          </div>
        </template>

        <template #cell-actions="{ item }">
          <VBtn size="small" color="#1a3a6b" class="text-none" @click="ouvrirInscrire(item)">
            S'inscrire
          </VBtn>
        </template>
      </AppTable>
    </VCol>
  </VRow>

  <!-- Dialog confirmation -->
  <AppModal
    v-model="dialogInscrire"
    title="Confirmer l'inscription"
    :max-width="440"
    @close="dialogInscrire = false"
  >
    <p class="text-body-1">
      Voulez-vous inscrire votre école à la session
      <strong>{{ sessionAInscrire?.title }}</strong> ?
    </p>
    <p class="text-body-2 text-medium-emphasis mt-2">
      Date limite d'inscription : {{ sessionAInscrire ? formatDate(sessionAInscrire.registration_deadline) : '' }}
    </p>

    <template #actions>
      <VBtn variant="outlined" @click="dialogInscrire = false">Annuler</VBtn>
      <VBtn color="#1a3a6b" :loading="inscriptionLoading" @click="confirmerInscription">Confirmer l'inscription</VBtn>
    </template>
  </AppModal>
</template>

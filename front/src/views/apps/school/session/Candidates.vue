<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import CandidateListTable from '@/views/apps/candidate/components/CandidateListTable.vue'

const authStore = useAuthStore()
const route = useRoute()

const schoolId = computed(() => {
  const value = Number(authStore.session?.user?.school_id)
  return Number.isFinite(value) && value > 0 ? value : null
})

const examId = computed(() => {
  const value = Number(route.params.exam_id)
  return Number.isFinite(value) && value > 0 ? value : null
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div class="d-flex align-center justify-space-between flex-wrap gap-3">
        <div>
          <h1 class="text-h5 font-weight-bold">Liste des candidats</h1>
          <p class="text-body-2 text-medium-emphasis mt-1 mb-0">
            Vue globale des candidats inscrits avec les mêmes filtres que sur le tableau de bord des sessions.
          </p>
        </div>
      </div>
    </VCol>

    <VCol v-if="!examId" cols="12">
      <VAlert type="warning" variant="tonal">
        Paramètre d'URL invalide: `exam_id` est requis.
      </VAlert>
    </VCol>

    <VCol v-else cols="12">
      <CandidateListTable
        :school-id="schoolId"
        :exam-id="examId"
        :can-assign-center="false"
        :is-school-viewer="true"
      />
    </VCol>
  </VRow>
</template>

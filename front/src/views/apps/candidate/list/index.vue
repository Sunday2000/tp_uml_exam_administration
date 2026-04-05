<script setup lang="ts">
import CandidateListTable from '@/views/apps/candidate/components/CandidateListTable.vue'

const route = useRoute()

const schoolId = computed(() => {
  const value = Number(route.query.school_id)
  return Number.isFinite(value) && value > 0 ? value : null
})

const examSchoolId = computed(() => {
  const value = Number(route.query.exam_school_id)
  return Number.isFinite(value) && value > 0 ? value : null
})

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Candidates',
    disabled: false,
    to: { name: 'apps-candidate-list' },
  },
  {
    title: 'List',
    disabled: true,
  },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VBreadcrumbs :items="breadcrumbs" divider="-" class="px-0" />
    </VCol>

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

    <VCol cols="12">
      <CandidateListTable :school-id="schoolId" :exam-school-id="examSchoolId" />
    </VCol>
  </VRow>
</template>
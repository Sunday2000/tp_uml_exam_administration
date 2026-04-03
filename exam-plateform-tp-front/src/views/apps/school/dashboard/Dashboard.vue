<script setup lang="ts">
import { schoolsApi } from '@/api/school'
import type { SchoolInfo } from '@/interfaces/school'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const schoolId = computed(() => Number(authStore.session?.user?.school_id ?? 0))

const schoolInfo = ref<SchoolInfo | null>(null)
const loadingSchool = ref(false)
const schoolError = ref<string | null>(null)

onMounted(async () => {
  if (!schoolId.value) return
  loadingSchool.value = true
  try {
    const [schoolData] = await Promise.all([
      schoolsApi.getOne(schoolId.value),
    ])
    schoolInfo.value = (schoolData.data as any)?.data ?? schoolData.data
  }
  catch (e: any) {
    schoolError.value = e.response?.data?.message ?? e.message
  }
  finally {
    loadingSchool.value = false
  }
})

const totalSessions = computed(() => schoolInfo.value?.exams_subscribed_count ?? 0)
const sessionsOuvertes = computed(() => schoolInfo.value?.ongoing_exams_count ?? 0)
const totalCandidats = computed(() => schoolInfo.value?.candidates_count ?? 0)

const metrics = computed(() => [
  {
    label: 'Sessions souscrites',
    value: totalSessions.value,
    icon: 'mdi-file-document-multiple-outline',
    color: '#1a3a6b',
    bg: '#eef3fa',
    route: { name: 'apps-school-session-list' },
  },
  {
    label: 'Sessions ouvertes',
    value: sessionsOuvertes.value,
    icon: 'mdi-calendar-check-outline',
    color: '#3d6f1f',
    bg: '#f0f9eb',
    route: { name: 'apps-school-session-list' },
  },
  {
    label: 'Candidats inscrits',
    value: totalCandidats.value,
    icon: 'mdi-account-group-outline',
    color: '#9b5e16',
    bg: '#fdf3e7',
    route: { name: 'apps-school-student-list' },
  },
])

const quickLinks = [
  { label: 'Sessions en cours', icon: 'mdi-calendar-clock', route: { name: 'apps-school-session-list' }, color: '#1a3a6b' },
  { label: 'Gestion étudiants', icon: 'mdi-account-group', route: { name: 'apps-school-student-list' }, color: '#3d6f1f' },
  { label: 'Gestion utilisateurs', icon: 'mdi-account-cog', route: { name: 'apps-school-user-list' }, color: '#9b5e16' },
]

const formatDate = (date: string | null | undefined) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>

<template>
  <VRow>
    <VCol cols="12" class="d-flex align-center justify-space-between flex-wrap gap-3">
      <div>
        <h1 class="text-h5 font-weight-bold">Tableau de bord de l'école</h1>
        <p class="text-body-2 text-medium-emphasis mt-1 mb-0">Vue d'ensemble de votre établissement</p>
      </div>
      <VBtn
        color="#1a3a6b"
        size="large"
        class="text-none"
        prepend-icon="mdi-plus-circle"
        :to="{ name: 'apps-school-session-search' }"
      >
        S'inscrire à un examen
      </VBtn>
    </VCol>

    <!-- School info card -->
    <VCol cols="12">
      <VCard elevation="0" border rounded="lg">
        <VCardText class="pa-5">
          <div class="d-flex align-center gap-3 mb-4">
            <VAvatar color="#1a3a6b" size="48" rounded="lg">
              <VIcon icon="mdi-school" color="white" size="24" />
            </VAvatar>
            <div>
              <div class="text-subtitle-1 font-weight-bold">
                <template v-if="loadingSchool">
                  <VSkeletonLoader type="text" width="200" />
                </template>
                <template v-else>
                  {{ schoolInfo?.name ?? '—' }}
                </template>
              </div>
              <div class="text-caption text-medium-emphasis">Informations de l'établissement</div>
            </div>
            <VSpacer />
            <VChip
              v-if="!loadingSchool && schoolInfo"
              :color="schoolInfo.status ? 'success' : 'default'"
              variant="tonal"
              size="small"
            >
              {{ schoolInfo.status ? 'Actif' : 'Inactif' }}
            </VChip>
          </div>

          <VAlert v-if="schoolError" type="error" variant="tonal" density="compact" class="mb-3">
            {{ schoolError }}
          </VAlert>

          <VRow v-if="loadingSchool" dense>
            <VCol v-for="n in 4" :key="n" cols="12" sm="6" md="3">
              <VSkeletonLoader type="text" />
            </VCol>
          </VRow>

          <VRow v-else-if="schoolInfo" dense>
            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">Code</div>
              <div class="text-body-2 font-weight-semibold">{{ schoolInfo.code || '—' }}</div>
            </VCol>
            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">Téléphone</div>
              <div class="text-body-2 font-weight-semibold">{{ schoolInfo.phone || '—' }}</div>
            </VCol>
            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">Autorisation</div>
              <div class="text-body-2 font-weight-semibold">{{ schoolInfo.authorization || '—' }}</div>
            </VCol>
            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">Date de création</div>
              <div class="text-body-2 font-weight-semibold">{{ formatDate(schoolInfo.creation_date) }}</div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Métriques -->
    <VCol v-for="metric in metrics" :key="metric.label" cols="12" sm="6" md="4">
      <VCard elevation="0" border rounded="lg" class="cursor-pointer metric-card" :to="metric.route">
        <VCardText class="pa-5">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                {{ metric.label }}
              </div>
              <div v-if="loadingSchool" class="mt-2">
                <VSkeletonLoader type="text" width="60" />
              </div>
              <div v-else class="text-h4 font-weight-bold" :style="{ color: metric.color }">
                {{ metric.value }}
              </div>
            </div>
            <VAvatar :color="metric.bg" size="52" rounded="lg">
              <VIcon :icon="metric.icon" :color="metric.color" size="26" />
            </VAvatar>
          </div>
        </VCardText>
      </VCard>
    </VCol>


    <!-- Accès rapides -->
    <VCol cols="12">
      <h2 class="text-h6 font-weight-bold mb-3">Accès rapides</h2>
    </VCol>

    <VCol v-for="link in quickLinks" :key="link.label" cols="12" sm="6" md="4">
      <VCard
        elevation="0"
        border
        rounded="lg"
        class="cursor-pointer quick-link-card"
        :to="link.route"
      >
        <VCardText class="d-flex align-center gap-4 pa-5">
          <VAvatar :color="link.color" size="48" rounded="lg">
            <VIcon :icon="link.icon" color="white" />
          </VAvatar>
          <div>
            <div class="text-subtitle-1 font-weight-bold">{{ link.label }}</div>
            <div class="text-caption text-medium-emphasis">Accéder →</div>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.quick-link-card:hover,
.metric-card:hover {
  border-color: #1a3a6b !important;
  transition: border-color 0.2s;
}
</style>

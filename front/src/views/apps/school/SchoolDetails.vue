<script setup lang="ts">
import { schoolsApi } from '@/api/school'
import type { SchoolInfo } from '@/interfaces/school'
import { useRoute } from 'vue-router'

const route = useRoute()

const school = ref<SchoolInfo | null>(null)
const loading = ref(false)
const error   = ref<string | null>(null)

// ─── Status helpers (boolean | null → display) ────────────────────────────────
type StatusKey = 'en_attente' | 'validee' | 'rejetee'

const resolveStatusKey = (status: boolean | null): StatusKey =>
  status === true ? 'validee' : status === false ? 'rejetee' : 'en_attente'

const statusLabels: Record<StatusKey, string> = {
  en_attente: 'En attente',
  validee:    'Validée',
  rejetee:    'Rejetée',
}
const statusColors: Record<StatusKey, string> = {
  en_attente: '#9b5e16',
  validee:    '#3d6f1f',
  rejetee:    '#a52c2c',
}
const statusBgColors: Record<StatusKey, string> = {
  en_attente: '#fef3c7',
  validee:    '#dcfce7',
  rejetee:    '#fee2e2',
}

const statusKey = computed(() => school.value ? resolveStatusKey(school.value.status) : 'en_attente')

// ─── GPS helper ───────────────────────────────────────────────────────────────
const gpsLabel = computed(() => {
  if (!school.value) return '—'
  const { latitude: lat, longitude: lng } = school.value
  if (lat == null && lng == null) return '—'
  return `${lat ?? '?'} / ${lng ?? '?'}`
})

// ─── Date helper ─────────────────────────────────────────────────────────────
const formatDate = (iso: string | null) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// ─── Fetch ────────────────────────────────────────────────────────────────────
onMounted(async () => {
  const id = Number(route.params.id)
  loading.value = true
  error.value   = null
  try {
    const { data } = await schoolsApi.getOne(id)
    school.value = (data as any)?.data ?? data
  }
  catch (e: any) {
    error.value = e.response?.data?.message ?? e.message
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Loading -->
  <div v-if="loading" class="d-flex justify-center py-16">
    <VProgressCircular indeterminate color="primary" />
  </div>

  <!-- Error -->
  <VAlert v-else-if="error" type="error" variant="tonal">{{ error }}</VAlert>

  <!-- Content -->
  <div v-else-if="school" class="school-details-page">
    <VRow>
      <VCol cols="12" class="pb-1">
        <RouterLink :to="{ name: 'apps-school-list' }" class="back-link">
          &larr; Écoles
        </RouterLink>
      </VCol>

      <VCol cols="12" class="pt-0">
        <div class="d-flex align-start justify-space-between gap-4 flex-wrap">
          <div>
            <h1 class="text-h4 font-weight-bold mb-1">{{ school.name }}</h1>
            <div class="d-flex align-center flex-wrap gap-2">
              <span class="text-medium-emphasis">{{ school.code }}</span>
              <span
                class="status-pill"
                :style="{ backgroundColor: statusBgColors[statusKey], color: statusColors[statusKey] }"
              >
                <span class="status-dot">●</span>
                {{ statusLabels[statusKey] }}
              </span>
            </div>
          </div>

          <div class="d-flex align-center gap-2 flex-wrap">
            <VBtn variant="outlined" color="default" class="text-none">Modifier</VBtn>
            <template v-if="school.status === null">
              <VBtn variant="outlined" color="error" class="text-none">Rejeter</VBtn>
              <VBtn color="#3d6f1f" class="text-none">Valider l'inscription</VBtn>
            </template>
          </div>
        </div>
      </VCol>

      <!-- Left column -->
      <VCol cols="12" md="6">
        <VCard class="info-card" elevation="0">
          <VCardTitle class="text-subtitle-1 font-weight-bold">Informations générales</VCardTitle>
          <VDivider />
          <VCardText>
            <div class="info-row">
              <span>Nom</span>
              <strong>{{ school.name }}</strong>
            </div>
            <div class="info-row">
              <span>Code</span>
              <strong>{{ school.code }}</strong>
            </div>
            <div class="info-row">
              <span>N° Autorisation</span>
              <strong>{{ school.authorization ?? '—' }}</strong>
            </div>
            <div class="info-row">
              <span>Téléphone</span>
              <strong>{{ school.phone ?? '—' }}</strong>
            </div>
            <div class="info-row">
              <span>Coordonnées GPS</span>
              <strong>{{ gpsLabel }}</strong>
            </div>
            <div class="info-row">
              <span>Date de création</span>
              <strong>{{ formatDate(school.creation_date) }}</strong>
            </div>
          </VCardText>
        </VCard>

        <VCard class="info-card mt-4" elevation="0">
          <VCardTitle class="text-subtitle-1 font-weight-bold">Responsable</VCardTitle>
          <VDivider />
          <VCardText>
            <template v-if="school.responsible">
              <div class="info-row">
                <span>Nom complet</span>
                <strong>{{ school.responsible.name }} {{ school.responsible.firstname }}</strong>
              </div>
              <div class="info-row">
                <span>Email</span>
                <strong>{{ school.responsible.email }}</strong>
              </div>
              <div class="info-row">
                <span>Téléphone</span>
                <strong>{{ school.responsible.phone_number ?? '—' }}</strong>
              </div>
              <div class="info-row">
                <span>Compte actif</span>
                <strong>{{ school.responsible.is_active ? 'Oui' : 'Non' }}</strong>
              </div>
            </template>
            <div v-else class="text-body-2 text-medium-emphasis">Aucun responsable enregistré.</div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Right column -->
      <VCol cols="12" md="6">
        <VCard class="info-card" elevation="0">
          <VCardTitle class="text-subtitle-1 font-weight-bold">Statistiques</VCardTitle>
          <VDivider />
          <VCardText>
            <div class="d-flex gap-3 flex-wrap">
              <div class="stat-tile stat-tile--blue">
                <div class="stat-tile__value">{{ school.candidates_count ?? school.total_candidates ?? 0 }}</div>
                <div class="stat-tile__label">CANDIDATS</div>
              </div>
              <div class="stat-tile stat-tile--green">
                <div class="stat-tile__value">{{ school.total_exam_sessions_subscribed ?? school.exams_subscribed_count ?? 0 }}</div>
                <div class="stat-tile__label">SESSIONS</div>
              </div>
              <div class="stat-tile stat-tile--orange">
                <div class="stat-tile__value">{{ school.ongoing_exams_count ?? 0 }}</div>
                <div class="stat-tile__label">EN COURS</div>
              </div>
            </div>
          </VCardText>
        </VCard>

        <VCard class="info-card mt-4" elevation="0">
          <VCardTitle class="text-subtitle-1 font-weight-bold">Sessions de l'école</VCardTitle>
          <VDivider />
          <VCardText>
            <template v-if="school.exam_sessions && school.exam_sessions.length">
              <div
                v-for="session in school.exam_sessions"
                :key="session.exam_id"
                class="session-row mb-2"
              >
                <div>
                  <div class="font-weight-bold text-primary">{{ session.exam_title }}</div>
                  <div class="d-flex align-center gap-2 mt-1">
                    <span class="session-status-pill" :class="`session-status-pill--${session.exam_status}`">
                      {{ session.exam_status }}
                    </span>
                    <span class="text-caption text-medium-emphasis">
                      {{ session.presented_candidates_count }} candidat{{ session.presented_candidates_count !== 1 ? 's' : '' }} présenté{{ session.presented_candidates_count !== 1 ? 's' : '' }}
                    </span>
                  </div>
                  <div v-if="session.subscription_date" class="text-caption text-medium-emphasis mt-1">
                    Inscrit le {{ formatDate(session.subscription_date) }}
                  </div>
                </div>
                <VBtn
                  size="small"
                  variant="outlined"
                  color="primary"
                  class="text-none"
                  :to="{
                    name: 'apps-candidate-list',
                    query: { exam_school_id: session.exam_school_id, school_id: school.id },
                  }"
                >
                  Candidats &rarr;
                </VBtn>
              </div>
            </template>
            <div v-else class="text-body-2 text-medium-emphasis">
              Aucune session enregistrée.
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>

  <VAlert v-else type="warning" variant="tonal">
    École introuvable.
  </VAlert>
</template>

<style scoped>
.school-details-page {
  color: #1f2f48;
}

.back-link {
  color: #4d78ab;
  font-size: 0.95rem;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.info-card {
  border: 1px solid #e2e6ee;
  border-radius: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid #eff2f6;
}

.info-row:last-child {
  border-bottom: 0;
}

.info-row span {
  color: #7b8797;
}

.info-row strong {
  color: #1f2f48;
  text-align: end;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  padding: 0.3rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.status-dot {
  font-size: 0.5rem;
  line-height: 1;
}

.stat-tile {
  flex: 1 1 180px;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

.stat-tile--blue {
  background: #dce8f4;
  color: #24568f;
}

.stat-tile--green {
  background: #e2ecd8;
  color: #3d6f1f;
}

.stat-tile--orange {
  background: #fef3c7;
  color: #9b5e16;
}

.stat-tile__value {
  font-size: 2rem;
  line-height: 1;
  font-weight: 800;
}

.stat-tile__label {
  margin-top: 0.45rem;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  font-weight: 700;
}

.session-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 10px;
  background: #f4f3ef;
  padding: 0.85rem;
}

.session-status-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.15rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: capitalize;
}

.session-status-pill--ongoing {
  background: #dcfce7;
  color: #3d6f1f;
}

.session-status-pill--finished {
  background: #e2e6ee;
  color: #4a5568;
}

.session-status-pill--pending {
  background: #fef3c7;
  color: #9b5e16;
}

@media (max-width: 960px) {
  .info-row {
    flex-direction: column;
    gap: 0.25rem;
  }

  .info-row strong {
    text-align: start;
  }
}
</style>

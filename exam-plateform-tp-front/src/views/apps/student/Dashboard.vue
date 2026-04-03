<script setup lang="ts">
import { candidateApi } from '@/api/candidate'
import { studentApi } from '@/api/student'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const userName = computed(() => {
  const u = authStore.session?.user
  return u ? `${u.firstname ?? ''} ${u.name ?? ''}`.trim() : ''
})

// ── State ──────────────────────────────────────────────────────────────────
const exams = ref<any[]>([])
const loading = ref(false)
const errorMsg = ref<string | null>(null)

const loadingInvitation = ref<number | null>(null)
const loadingTranscript = ref<number | null>(null)

const feedback = ref({ visible: false, text: '', color: 'success' })
function showFeedback(text: string, color = 'success') {
  feedback.value = { visible: true, text, color }
}

// ── Fetch ──────────────────────────────────────────────────────────────────
async function fetchMyExams() {
  loading.value = true
  errorMsg.value = null
  try {
    const response = await studentApi.getMyExams()
    const data = (response.data as any)?.data ?? response.data
    exams.value = Array.isArray(data) ? data : []
  } catch (e: any) {
    errorMsg.value = e.response?.data?.message ?? e.message ?? 'Erreur lors du chargement.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchMyExams)

// ── Helpers ────────────────────────────────────────────────────────────────
const formatDate = (d: string | null | undefined) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}

const statusColor = (status?: string) => {
  if (!status) return 'default'
  const s = status.toLowerCase()
  if (['en cours', 'ongoing', 'active'].includes(s)) return 'success'
  if (['terminé', 'closed', 'ended'].includes(s)) return 'error'
  if (['planifié', 'planned', 'upcoming'].includes(s)) return 'info'
  return 'default'
}

const mentionColor = (mention?: string) => {
  if (!mention) return 'default'
  const m = mention.toLowerCase()
  if (m.includes('très bien') || m.includes('excellent')) return 'success'
  if (m.includes('bien')) return 'info'
  if (m.includes('assez bien')) return 'primary'
  if (m.includes('passable')) return 'warning'
  if (m.includes('ajourné') || m.includes('échec') || m.includes('echoue')) return 'error'
  return 'default'
}

// ── Downloads ──────────────────────────────────────────────────────────────
async function downloadInvitation(candidateId: number) {
  loadingInvitation.value = candidateId
  try {
    const blob = await candidateApi.downloadInvitation(candidateId)
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
  } catch (e: any) {
    showFeedback(e.response?.data?.message ?? 'Impossible de télécharger l\'invitation.', 'error')
  } finally {
    loadingInvitation.value = null
  }
}

async function downloadTranscript(candidateId: number) {
  loadingTranscript.value = candidateId
  try {
    const blob = await candidateApi.downloadTranscript(candidateId)
    if (blob instanceof Blob && blob.type === 'application/json') {
      const text = await blob.text()
      const json = JSON.parse(text)
      if (json.url) {
        window.open(json.url, '_blank')
        return
      }
    }
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
  } catch (e: any) {
    showFeedback(e.response?.data?.message ?? 'Impossible de télécharger le relevé de notes.', 'error')
  } finally {
    loadingTranscript.value = null
  }
}
</script>

<template>
  <VRow>
    <!-- Header -->
    <VCol cols="12" class="d-flex align-center justify-space-between flex-wrap gap-3">
      <div>
        <h1 class="text-h5 font-weight-bold">
          Bienvenue, {{ userName || 'Étudiant' }}
        </h1>
        <p class="text-body-2 text-medium-emphasis mt-1 mb-0">
          Retrouvez ici vos sessions d'examen et vos résultats
        </p>
      </div>
      <VBtn color="#1a3a6b" variant="tonal" prepend-icon="mdi-refresh" :loading="loading" @click="fetchMyExams">
        Actualiser
      </VBtn>
    </VCol>

    <!-- Loading -->
    <VCol v-if="loading && exams.length === 0" cols="12">
      <VCard elevation="0" border rounded="lg">
        <VCardText class="text-center pa-8">
          <VProgressCircular indeterminate color="#1a3a6b" size="48" />
          <p class="mt-4 text-body-2 text-medium-emphasis">Chargement de vos sessions…</p>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Error -->
    <VCol v-if="errorMsg" cols="12">
      <VAlert type="error" variant="tonal" density="compact" closable @click:close="errorMsg = null">
        {{ errorMsg }}
      </VAlert>
    </VCol>

    <!-- Empty state -->
    <VCol v-if="!loading && !errorMsg && exams.length === 0" cols="12">
      <VCard elevation="0" border rounded="lg">
        <VCardText class="text-center pa-10">
          <VIcon icon="mdi-school-outline" size="64" color="grey" class="mb-3" />
          <h3 class="text-h6 mb-2">Aucune session d'examen</h3>
          <p class="text-body-2 text-medium-emphasis">
            Vous n'êtes lié à aucune session d'examen pour le moment.
          </p>
        </VCardText>
      </VCard>
    </VCol>

    <!-- Exam sessions list -->
    <VCol v-for="(session, idx) in exams" :key="session.exam?.id ?? idx" cols="12">
      <VCard elevation="0" border rounded="lg">
        <VCardText class="pa-5">
          <!-- Exam header -->
          <div class="d-flex align-center gap-3 mb-4 flex-wrap">
            <VAvatar color="#1a3a6b" size="48" rounded="lg">
              <VIcon icon="mdi-file-document-check-outline" color="white" size="24" />
            </VAvatar>
            <div class="flex-grow-1">
              <div class="text-subtitle-1 font-weight-bold">
                {{ session.exam?.title ?? '—' }}
              </div>
              <div class="text-caption text-medium-emphasis">
                Session d'examen
              </div>
            </div>
            <VChip
              v-if="session.exam?.status"
              :color="statusColor(session.exam.status)"
              variant="tonal"
              size="small"
            >
              {{ session.exam.status }}
            </VChip>
          </div>

          <VDivider class="mb-4" />

          <!-- Details grid -->
          <VRow dense>
            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Date de début
              </div>
              <div class="text-body-2 font-weight-semibold">
                {{ formatDate(session.exam?.start_date) }}
              </div>
            </VCol>

            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Date de fin
              </div>
              <div class="text-body-2 font-weight-semibold">
                {{ formatDate(session.exam?.end_date) }}
              </div>
            </VCol>

            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Date limite inscription
              </div>
              <div class="text-body-2 font-weight-semibold">
                {{ formatDate(session.exam?.registration_deadline) }}
              </div>
            </VCol>

            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Matricule
              </div>
              <div class="text-body-2 font-weight-semibold">
                {{ session.matricule || '—' }}
              </div>
            </VCol>
          </VRow>

          <VRow dense class="mt-2">
            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Spécialité
              </div>
              <div class="text-body-2 font-weight-semibold">
                <template v-if="session.speciality">
                  {{ session.speciality.grade ?? '' }}
                  {{ session.speciality.serie ? '- ' + session.speciality.serie : '' }}
                  {{ session.speciality.code ? '(' + session.speciality.code + ')' : '' }}
                </template>
                <span v-else>—</span>
              </div>
            </VCol>

            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                École
              </div>
              <div class="text-body-2 font-weight-semibold">
                {{ session.school?.name ?? '—' }}
              </div>
            </VCol>

            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Centre d'examen
              </div>
              <div class="text-body-2 font-weight-semibold">
                {{ session.test_center?.name ?? '—' }}
              </div>
            </VCol>

            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Code école
              </div>
              <div class="text-body-2 font-weight-semibold">
                {{ session.school?.code ?? '—' }}
              </div>
            </VCol>
          </VRow>

          <!-- Results row (average & mention) -->
          <VRow dense class="mt-2">
            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Moyenne
              </div>
              <div class="text-body-2 font-weight-semibold">
                <template v-if="session.exam_average">
                  <span class="text-h6 font-weight-bold" :class="Number(session.exam_average) >= 10 ? 'text-success' : 'text-error'">
                    {{ Number(session.exam_average).toFixed(2) }} / 20
                  </span>
                </template>
                <template v-else>
                  <VChip size="small" variant="tonal" color="grey">Non disponible</VChip>
                </template>
              </div>
            </VCol>

            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Mention
              </div>
              <div class="text-body-2 font-weight-semibold">
                <VChip
                  v-if="session.mention"
                  :color="mentionColor(session.mention)"
                  variant="tonal"
                  size="small"
                >
                  {{ session.mention }}
                </VChip>
                <VChip v-else size="small" variant="tonal" color="grey">Non disponible</VChip>
              </div>
            </VCol>

            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Délibération
              </div>
              <div class="text-body-2 font-weight-semibold">
                {{ session.deliberation || '—' }}
              </div>
            </VCol>
            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Date délibération
              </div>
              <div class="text-body-2 font-weight-semibold">
                {{ formatDate(session.deliberation_date) }}
              </div>
            </VCol>
          </VRow>

          <VRow dense class="mt-2">


            <VCol cols="12" sm="6" md="3">
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold mb-1">
                Code centre
              </div>
              <div class="text-body-2 font-weight-semibold">
                {{ session.test_center?.code ?? '—' }}
              </div>
            </VCol>
          </VRow>

          <VDivider class="my-4" />

          <!-- Action buttons -->
          <div class="d-flex gap-3 flex-wrap">
            <VBtn
              v-if="session.id"
              color="#1a3a6b"
              variant="tonal"
              size="small"
              prepend-icon="mdi-file-download-outline"
              :loading="loadingInvitation === session.id"
              @click="downloadInvitation(session.id)"
            >
              Télécharger l'invitation
            </VBtn>

            <VBtn
              v-if="session.id && session.mention"
              color="success"
              variant="tonal"
              size="small"
              prepend-icon="mdi-file-certificate-outline"
              :loading="loadingTranscript === session.id"
              @click="downloadTranscript(session.id)"
            >
              Relevé de notes
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- Snackbar feedback -->
  <VSnackbar
    v-model="feedback.visible"
    :color="feedback.color"
    :timeout="4000"
    location="top end"
  >
    {{ feedback.text }}
  </VSnackbar>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>

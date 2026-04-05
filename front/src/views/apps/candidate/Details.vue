<script setup lang="ts">
import api from '@/api/axios'
import { useStudents } from '@/composables/useStudent'
import type { Student } from '@/interfaces/student'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const candidateId = computed(() => Number(route.params.id))
const { loading, error, fetchById } = useStudents()
const student = ref<Student | null>(null)
const profilePictureUrl = ref<string | null>(null)

const clearProfilePictureUrl = () => {
  if (profilePictureUrl.value) {
    URL.revokeObjectURL(profilePictureUrl.value)
    profilePictureUrl.value = null
  }
}

const loadProfilePicture = async (path: string | null | undefined) => {
  clearProfilePictureUrl()
  if (!path) return

  try {
    const { data } = await api.get<Blob>('/files/download', {
      params: { path },
      responseType: 'blob',
    })
    profilePictureUrl.value = URL.createObjectURL(data)
  }
  catch {
    try {
      const { data } = await api.get<Blob>('/files/download', {
        params: { path, disk: 'public' },
        responseType: 'blob',
      })
      profilePictureUrl.value = URL.createObjectURL(data)
    }
    catch {
      profilePictureUrl.value = null
    }
  }
}

onMounted(async () => {
  if (!candidateId.value)
    return

  student.value = await fetchById(candidateId.value)
  await loadProfilePicture(student.value?.user?.profile_picture)
})

onBeforeUnmount(() => {
  clearProfilePictureUrl()
})

const formatDate = (date: string | null | undefined) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>

<template>
  <div v-if="loading" class="d-flex justify-center py-16">
    <VProgressCircular indeterminate color="primary" size="48" />
  </div>

  <VAlert v-else-if="error" type="error" variant="tonal">
    {{ error }}
  </VAlert>

  <div v-else-if="student">
    <VRow>
      <VCol cols="12" class="pb-1">
        <a class="text-primary text-decoration-none cursor-pointer" @click="$router.back()">
          ← Retour
        </a>
      </VCol>

      <VCol cols="12" class="pt-0">
        <div class="d-flex align-center gap-4 flex-wrap">
          <VAvatar size="76" class="profile-avatar" rounded="lg">
            <VImg v-if="profilePictureUrl" :src="profilePictureUrl" cover />
            <span v-else class="avatar-fallback">
              {{ (student.user?.name?.[0] ?? 'C').toUpperCase() }}
            </span>
          </VAvatar>

          <div>
            <h1 class="text-h4 font-weight-bold mb-1">{{ student.user?.name }} {{ student.user?.firstname }}</h1>
            <span class="text-body-2 text-medium-emphasis">{{ student.code }}</span>
          </div>
        </div>
      </VCol>

      <!-- Identité -->
      <VCol cols="12" md="6">
        <VCard elevation="0" border rounded="lg">
          <VCardTitle class="text-subtitle-1 font-weight-bold">Identité</VCardTitle>
          <VDivider />
          <VCardText>
            <div class="info-row">
              <span>Nom</span>
              <strong>{{ student.user?.name ?? '—' }}</strong>
            </div>
            <div class="info-row">
              <span>Prénoms</span>
              <strong>{{ student.user?.firstname ?? '—' }}</strong>
            </div>
            <div class="info-row">
              <span>Email</span>
              <strong>{{ student.user?.email ?? '—' }}</strong>
            </div>
            <div class="info-row">
              <span>Téléphone</span>
              <strong>{{ student.user?.phone_number ?? '—' }}</strong>
            </div>
            <div class="info-row">
              <span>ID étudiant</span>
              <strong>{{ student.code }}</strong>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Examen -->
      <VCol cols="12" md="6">
        <VCard elevation="0" border rounded="lg">
          <VCardTitle class="text-subtitle-1 font-weight-bold">Examen</VCardTitle>
          <VDivider />
          <VCardText>
            <div class="info-row">
              <span>Matricule</span>
              <strong>{{ student.candidate?.matricule ?? '—' }}</strong>
            </div>
            <div class="info-row">
              <span>Spécialité</span>
              <strong>
                <VChip size="small" color="primary" variant="tonal">{{ student.candidate?.speciality?.code ?? '—' }}</VChip>
              </strong>
            </div>
            <div class="info-row">
              <span>Session</span>
              <strong>{{ student.exam_school?.exam?.title ?? '—' }}</strong>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Affectation -->
      <VCol cols="12" md="6">
        <VCard elevation="0" border rounded="lg">
          <VCardTitle class="text-subtitle-1 font-weight-bold">Affectation</VCardTitle>
          <VDivider />
          <VCardText>
            <div class="info-row">
              <span>École de provenance</span>
              <strong>{{ student.exam_school?.school ? student.exam_school?.school.name + ` (${student.exam_school?.school?.code})` : '—' }}</strong>
            </div>
            <div class="info-row">
              <span>Date limite inscription</span>
              <strong>{{ formatDate(student.exam_school?.exam?.registration_deadline) }}</strong>
            </div>
            <div class="info-row">
              <span>Statut session</span>
              <strong>{{ student.exam_school?.exam?.status ?? '—' }}</strong>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Tuteur légal -->
      <VCol cols="12" md="6">
        <VCard elevation="0" border rounded="lg">
          <VCardTitle class="text-subtitle-1 font-weight-bold">Tuteur légal</VCardTitle>
          <VDivider />
          <VCardText>
            <div class="info-row">
              <span>Nom</span>
              <strong>{{ student.guardian_name ?? '—' }}</strong>
            </div>
            <div class="info-row">
              <span>Prénom</span>
              <strong>{{ student.guardian_surname ?? '—' }}</strong>
            </div>
            <div class="info-row">
              <span>Téléphone</span>
              <strong>{{ student.guardian_phone ?? '—' }}</strong>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>

  <VAlert v-else type="warning" variant="tonal">
    Etudiant introuvable.
  </VAlert>
</template>

<style scoped>
.profile-avatar {
  border: 1px solid #e2e6ee;
  background: #f3f4f6;
}

.avatar-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  block-size: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2f48;
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

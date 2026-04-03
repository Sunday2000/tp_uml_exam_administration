<script setup lang="ts">
import { useExams } from '@/composables/useExam'
import { useStudents } from '@/composables/useStudent'
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { subscriptions, loading: loadingSubscriptions, error: subscriptionError, fetchSchoolSubscriptions } = useExams()
const { create, loading, error } = useStudents()

const schoolId = computed(() => Number(authStore.session?.user?.school_id ?? 0))
const sessionId = ref(route.query.session ? Number(route.query.session) : null)

onMounted(async () => {
  if (schoolId.value)
    await fetchSchoolSubscriptions(schoolId.value)
})

const sessionOptions = computed(() =>
  subscriptions.value
    .map((row: any) => ({
      value: Number(row?.id),
      label: row?.exam?.title || `Examen #${row?.exam_id ?? row?.id}`,
      exam: row?.exam,
    }))
    .filter(option => Number.isFinite(option.value) && option.value > 0),
)

const selectedSession = computed(() =>
  sessionOptions.value.find(option => option.value === Number(form.session_id)) ?? null,
)

const specialityOptions = computed(() =>
  (selectedSession.value?.exam?.specialities ?? []).map((spec: any) => ({
    value: Number(spec.id),
    label: spec.code || spec.grade?.label || spec.serie?.label || `Spécialité ${spec.id}`,
  })),
)

const form = reactive({
  nom: '',
  prenoms: '',
  email: '',
  telephone: '',
  profile_picture: '',
  code: '',
  tuteur_nom: '',
  tuteur_prenom: '',
  tuteur_telephone: '',
  speciality: null as number | null,
  session_id: sessionId.value,
})

const erreurs = reactive({
  nom: '',
  prenoms: '',
  email: '',
  telephone: '',
  profile_picture: '',
  code: '',
  tuteur_nom: '',
  tuteur_prenom: '',
  tuteur_telephone: '',
  speciality: '',
  session_id: '',
})

const resetErrors = () => {
  Object.keys(erreurs).forEach(k => (erreurs as any)[k] = '')
}

const validerForm = (): boolean => {
  resetErrors()
  let ok = true
  if (!form.nom.trim()) { erreurs.nom = 'Champ requis'; ok = false }
  if (!form.prenoms.trim()) { erreurs.prenoms = 'Champ requis'; ok = false }
  if (!form.email.trim()) { erreurs.email = 'Champ requis'; ok = false }
  if (!form.code.trim()) { erreurs.code = 'Champ requis'; ok = false }
  if (!form.speciality) { erreurs.speciality = 'Champ requis'; ok = false }
  if (!form.session_id) { erreurs.session_id = 'Champ requis'; ok = false }

  if (inscriptionBloquee.value) {
    erreurs.session_id = 'Les inscriptions sont fermées pour cette session.'
    ok = false
  }

  return ok
}

const inscriptionErreur = ref('')

const inscrire = async () => {
  if (!validerForm()) return
  inscriptionErreur.value = ''

  const payload = {
    exam_school_id: Number(form.session_id),
    speciality_id: Number(form.speciality),
    user: {
      name: form.nom,
      firstname: form.prenoms,
      email: form.email,
      phone_number: form.telephone || null,
      profile_picture: form.profile_picture || null,
    },
    student: {
      code: form.code,
      guardian_name: form.tuteur_nom || null,
      guardian_surname: form.tuteur_prenom || null,
      guardian_phone: form.tuteur_telephone || null,
    },
  }

  const created = await create(payload)
  if (!created) {
    inscriptionErreur.value = error.value || 'Echec de l\'inscription de l\'étudiant.'
    return
  }

  router.push({ name: 'apps-school-student-list' })
}

const inscriptionBloquee = ref(false)

watch(
  () => form.session_id,
  value => {
    form.speciality = null
    const selected = sessionOptions.value.find(option => option.value === Number(value))
    const deadline = selected?.exam?.registration_deadline ? new Date(selected.exam.registration_deadline).getTime() : 0
    const isOngoing = `${selected?.exam?.status || ''}`.toLowerCase() === 'ongoing'
    inscriptionBloquee.value = !selected || !isOngoing || (deadline > 0 && deadline <= Date.now())
  },
  { immediate: true },
)
</script>

<template>
  <VRow>
    <VCol cols="12">
      <RouterLink :to="{ name: 'apps-school-student-list' }" class="text-primary text-decoration-none">
        ← Étudiants
      </RouterLink>
    </VCol>

    <VCol cols="12">
      <h1 class="text-h5 font-weight-bold">Inscrire un étudiant à une session</h1>
      <p class="text-body-2 text-medium-emphasis mt-1 mb-0">
        L'étudiant sera créé automatiquement s'il n'existe pas encore sur la plateforme.
      </p>
    </VCol>

    <VCol v-if="loadingSubscriptions" cols="12" class="d-flex justify-center py-4">
      <VProgressCircular indeterminate color="primary" size="36" />
    </VCol>

    <VCol v-else-if="subscriptionError" cols="12">
      <VAlert type="error" variant="tonal">{{ subscriptionError }}</VAlert>
    </VCol>

    <VCol v-if="inscriptionBloquee" cols="12">
      <VAlert type="error" variant="tonal">
        La date de fin des inscriptions est dépassée. Vous ne pouvez plus inscrire d'étudiants à cette session.
      </VAlert>
    </VCol>

    <VCol cols="12">
      <VCard elevation="0" border rounded="lg">
        <VCardText class="pa-6">
          <VRow>
            <!-- Session -->
            <VCol cols="12" sm="6">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Session d'examen *</div>
              <VSelect
                v-model="form.session_id"
                :items="sessionOptions"
                item-title="label"
                item-value="value"
                placeholder="-- Sélectionner --"
                variant="outlined"
                density="compact"
                hide-details="auto"
                :error-messages="erreurs.session_id"
              />
            </VCol>

            <!-- Spécialité -->
            <VCol cols="12" sm="6">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Spécialité *</div>
              <VSelect
                v-model="form.speciality"
                :items="specialityOptions"
                item-title="label"
                item-value="value"
                placeholder="-- Sélectionner --"
                variant="outlined"
                density="compact"
                hide-details="auto"
                :error-messages="erreurs.speciality"
              />
            </VCol>

            <VCol cols="12"><VDivider class="my-2" /><div class="text-subtitle-2 font-weight-bold">Identité de l'étudiant</div></VCol>

            <VCol cols="12" sm="6">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Nom *</div>
              <VTextField v-model="form.nom" placeholder="NOM" variant="outlined" density="compact" hide-details="auto" :error-messages="erreurs.nom" />
            </VCol>
            <VCol cols="12" sm="6">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Prénoms *</div>
              <VTextField v-model="form.prenoms" placeholder="Prénoms" variant="outlined" density="compact" hide-details="auto" :error-messages="erreurs.prenoms" />
            </VCol>
            <VCol cols="12" sm="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Email *</div>
              <VTextField v-model="form.email" placeholder="email@exemple.com" variant="outlined" density="compact" hide-details="auto" :error-messages="erreurs.email" />
            </VCol>
            <VCol cols="12" sm="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Téléphone</div>
              <VTextField v-model="form.telephone" placeholder="+229 97 00 00 00" variant="outlined" density="compact" hide-details="auto" :error-messages="erreurs.telephone" />
            </VCol>
            <VCol cols="12" sm="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Photo de profil (chemin)</div>
              <VTextField v-model="form.profile_picture" placeholder="uploads/profiles/etudiant.jpg" variant="outlined" density="compact" hide-details="auto" :error-messages="erreurs.profile_picture" />
            </VCol>
            <VCol cols="12" sm="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Code étudiant *</div>
              <VTextField v-model="form.code" placeholder="ETU-001" variant="outlined" density="compact" hide-details="auto" :error-messages="erreurs.code" />
            </VCol>

            <VCol cols="12"><VDivider class="my-2" /><div class="text-subtitle-2 font-weight-bold">Tuteur légal</div></VCol>

            <VCol cols="12" sm="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Nom du tuteur</div>
              <VTextField v-model="form.tuteur_nom" placeholder="NOM" variant="outlined" density="compact" hide-details="auto" :error-messages="erreurs.tuteur_nom" />
            </VCol>
            <VCol cols="12" sm="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Prénom du tuteur</div>
              <VTextField v-model="form.tuteur_prenom" placeholder="Prénom" variant="outlined" density="compact" hide-details="auto" :error-messages="erreurs.tuteur_prenom" />
            </VCol>
            <VCol cols="12" sm="4">
              <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Téléphone du tuteur</div>
              <VTextField v-model="form.tuteur_telephone" placeholder="+229 97 00 00 00" variant="outlined" density="compact" hide-details="auto" :error-messages="erreurs.tuteur_telephone" />
            </VCol>
          </VRow>

          <VDivider class="my-6" />

          <VAlert v-if="inscriptionErreur" type="error" variant="tonal" class="mb-4">
            {{ inscriptionErreur }}
          </VAlert>

          <div class="d-flex justify-end gap-3">
            <VBtn variant="outlined" :to="{ name: 'apps-school-student-list' }">Annuler</VBtn>
            <VBtn color="#1a3a6b" :loading="loading" :disabled="inscriptionBloquee" @click="inscrire">Inscrire l'étudiant</VBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

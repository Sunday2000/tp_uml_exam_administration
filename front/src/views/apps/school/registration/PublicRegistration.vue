<script setup lang="ts">
import api from '@/api/axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const submitted = ref(false)
const loading = ref(false)
const apiError = ref<string | null>(null)

// ─── Formulaire ───────────────────────────────────────────────────────────────
const form = reactive({
  // Infos responsable (user)
  name: '',
  firstname: '',
  email: '',
  phone_number: '',
  password: '',
  password_confirmation: '',
  // Infos école
  school: {
    name: '',
    authorization: '',
    creation_date: '',
    phone: '',
    latitude: null as number | null,
    longitude: null as number | null,
    status: null as boolean | null,
  },
})

// ─── Erreurs ──────────────────────────────────────────────────────────────────
const erreurs = reactive({
  name: '',
  firstname: '',
  email: '',
  phone_number: '',
  password: '',
  password_confirmation: '',
  school_name: '',
  school_authorization: '',
  school_creation_date: '',
  school_phone: '',
  school_latitude: '',
  school_longitude: '',
})

const resetErrors = () => {
  Object.keys(erreurs).forEach(k => (erreurs as any)[k] = '')
  apiError.value = null
}

// ─── Validation ───────────────────────────────────────────────────────────────
const validerForm = (): boolean => {
  resetErrors()
  let ok = true

  if (!form.name.trim())                    { erreurs.name = 'Requis'; ok = false }
  if (!form.firstname.trim())               { erreurs.firstname = 'Requis'; ok = false }
  if (!form.email.trim())                   { erreurs.email = 'Email requis'; ok = false }
  if (!form.password)                       { erreurs.password = 'Mot de passe requis (min 8 caractères)'; ok = false }
  if (form.password.length < 8)             { erreurs.password = 'Minimum 8 caractères'; ok = false }
  if (form.password !== form.password_confirmation) {
    erreurs.password_confirmation = 'Les mots de passe ne correspondent pas'
    ok = false
  }
  if (!form.school.name.trim())             { erreurs.school_name = 'Requis'; ok = false }
  if (!form.school.authorization.trim())    { erreurs.school_authorization = 'Requis'; ok = false }
  if (!form.school.creation_date)           { erreurs.school_creation_date = 'Requis'; ok = false }

  return ok
}

// ─── Soumission ───────────────────────────────────────────────────────────────
const soumettre = async () => {
  if (!validerForm()) return

  loading.value = true
  apiError.value = null

  try {
    await api.post('/auth/register-school', {
      name:                  form.name,
      firstname:             form.firstname,
      email:                 form.email,
      phone_number:          form.phone_number || null,
      password:              form.password,
      password_confirmation: form.password_confirmation,
      school: {
        name:          form.school.name,
        authorization: form.school.authorization,
        creation_date: form.school.creation_date,
        phone:         form.school.phone || null,
        latitude:      form.school.latitude,
        longitude:     form.school.longitude,
        status:        form.school.status,
      },
    })

    submitted.value = true
  }
  catch (e: any) {
    // Gestion des erreurs de validation Laravel (422)
    const errors = e.response?.data?.errors
    if (errors) {
      if (errors.name)                  erreurs.name = errors.name[0]
      if (errors.firstname)             erreurs.firstname = errors.firstname[0]
      if (errors.email)                 erreurs.email = errors.email[0]
      if (errors.password)              erreurs.password = errors.password[0]
      if (errors['school.name'])        erreurs.school_name = errors['school.name'][0]
      if (errors['school.authorization']) erreurs.school_authorization = errors['school.authorization'][0]
      if (errors['school.creation_date']) erreurs.school_creation_date = errors['school.creation_date'][0]
    }
    else {
      apiError.value = e.response?.data?.message ?? 'Une erreur est survenue. Veuillez réessayer.'
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper">
    <VCard max-width="700" min-width="350">

      <!-- ── Formulaire ── -->
      <template v-if="!submitted">
        <VCardText class="pa-sm-8 pa-5">
          <!-- En-tête -->
          <div class="text-center mb-6">
            <VIcon icon="mdi-school" size="48" color="primary" class="mb-2" />
            <h1 class="text-h5 font-weight-bold">Inscription de votre école</h1>
            <p class="text-body-2 text-medium-emphasis mt-2">
              Soumettez votre demande d'inscription sur la plateforme d'examens.
              Vous recevrez un email de confirmation après validation.
            </p>
          </div>

          <!-- Erreur API globale -->
          <VAlert v-if="apiError" type="error" variant="tonal" closable class="mb-4">
            {{ apiError }}
          </VAlert>

          <!-- ── Section responsable ── -->
          <div class="section-title mb-3">Informations du responsable</div>

          <VRow>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="form.name"
                label="Nom *"
                placeholder="Ex: HOUNTONDJI"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.name"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="form.firstname"
                label="Prénom *"
                placeholder="Ex: Nadine"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.firstname"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="form.email"
                label="Email *"
                placeholder="Ex: responsable@ecole.bj"
                type="email"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.email"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="form.phone_number"
                label="Téléphone"
                placeholder="Ex: +229 01 90 00 00 00"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.phone_number"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="form.password"
                label="Mot de passe *"
                type="password"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.password"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="form.password_confirmation"
                label="Confirmer le mot de passe *"
                type="password"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.password_confirmation"
              />
            </VCol>
          </VRow>

          <VDivider class="my-5" />

          <!-- ── Section école ── -->
          <div class="section-title mb-3">Informations de l'établissement</div>

          <VRow>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="form.school.name"
                label="Nom de l'établissement *"
                placeholder="Ex: Lycée National A. Boganda"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.school_name"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="form.school.authorization"
                label="N° Autorisation *"
                placeholder="Ex: AUTH-2024-001"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.school_authorization"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="form.school.phone"
                label="Téléphone école"
                placeholder="Ex: +229 21 00 00 00"
                variant="outlined"
                density="compact"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="form.school.creation_date"
                label="Date de création *"
                type="datetime-local"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.school_creation_date"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model.number="form.school.latitude"
                label="Latitude"
                placeholder="Ex: 6.3654"
                type="number"
                step="any"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.school_latitude"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model.number="form.school.longitude"
                label="Longitude"
                placeholder="Ex: 2.4183"
                type="number"
                step="any"
                variant="outlined"
                density="compact"
                :error-messages="erreurs.school_longitude"
              />
            </VCol>
          </VRow>

          <!-- Bouton soumettre -->
          <VBtn
            block
            color="primary"
            size="large"
            class="mt-6 text-none font-weight-bold"
            :loading="loading"
            @click="soumettre"
          >
            Soumettre la demande
          </VBtn>

          <div class="text-center mt-4">
            <RouterLink
              :to="{ name: 'login' }"
              class="text-body-2 text-primary text-decoration-none"
            >
              Déjà inscrit ? Se connecter
            </RouterLink>
          </div>
        </VCardText>
      </template>

      <!-- ── Confirmation ── -->
      <template v-else>
        <VCardText class="pa-sm-8 pa-5 text-center">
          <VIcon icon="mdi-check-circle" size="64" color="success" class="mb-4" />
          <h2 class="text-h5 font-weight-bold mb-2">Demande envoyée !</h2>
          <p class="text-body-1 text-medium-emphasis">
            Votre demande d'inscription a été soumise avec succès.
            Vous recevrez un email de confirmation sous peu.
          </p>
          <p class="text-body-2 text-medium-emphasis mt-2">
            L'Autorité de Régulation examinera votre dossier et vous informera du résultat.
          </p>
          <VBtn color="primary" class="mt-4 text-none" :to="{ name: 'login' }">
            Retour à la connexion
          </VBtn>
        </VCardText>
      </template>

    </VCard>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #1a3a6b;
  border-left: 3px solid #1a3a6b;
  padding-left: 0.5rem;
}

.upload-zone {
  border: 2px dashed #c5cad3;
  background: #f9fafb;
  cursor: pointer;
  transition: border-color 0.2s;
}

.upload-zone:hover {
  border-color: #1a3a6b;
}
</style>

<style lang="scss">
@use "@/styles/pages/auth.scss";
</style>
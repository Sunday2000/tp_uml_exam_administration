<script setup lang="ts">
import authBgDark from '@/assets/pages/auth-bg-dark.svg'
import authBgLight from '@/assets/pages/auth-bg-light.svg'
import authForgotPasswordImg from '@/assets/pages/girl-forgot-something.png'
import Logo from '@/components/Logo.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { VForm } from 'vuetify/components/VForm'

const forgetPasswordForm = ref<VForm>()
const theme = useTheme()
const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const supportPoints = [
  'Adresse institutionnelle requise',
  'Code envoyé par e-mail',
  'Demande sécurisée et tracée',
]

const authBgThemeVariant = computed(() => {
  return theme.current.value.dark ? authBgDark : authBgLight
})

const submitForgotPassword = () => {
  forgetPasswordForm.value?.validate().then(async isValid => {
    if (!isValid.valid)
      return

    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const result = await authStore.forgotPassword({ email: email.value })

    if (!result.ok) {
      errorMessage.value = result.message
      loading.value = false
      return
    }

    successMessage.value = result.message
    loading.value = false

    setTimeout(() => {
      router.push({
        name: 'reset-password',
        query: { email: email.value },
      })
    }, 600)
  })
}
</script>

<template>
  <div class="auth-wrapper gov-auth-page">
    <VCard
      class="gov-auth-card"
      max-width="1100"
      min-width="350"
      width="100%"
    >
      <VRow no-gutters>
        <VCol
          md="5"
          cols="12"
          class="border-e pa-sm-8 pa-5"
        >
          <div class="d-flex align-center justify-space-between mb-6">
            <div class="d-flex align-center gap-3">
              <div class="gov-logo-box">
                <Logo />
              </div>

              <div>
                <div class="text-overline">Portail officiel</div>
                <div class="text-h6 font-weight-bold">Gestion des examens</div>
              </div>
            </div>
          </div>

          <VChip
            color="primary"
            variant="tonal"
            class="mb-4"
          >
            Réinitialisation sécurisée
          </VChip>

          <h1 class="text-h4 font-weight-bold mb-2">
            Réinitialiser l’accès
          </h1>
          <p class="text-body-1 text-medium-emphasis mb-5">
            Entrez votre e-mail institutionnel pour recevoir votre code.
          </p>

          <VAlert
            color="info"
            variant="tonal"
            icon="mdi-email-fast-outline"
            class="mb-6"
          >
            Un code de réinitialisation vous sera envoyé.
          </VAlert>

          <VAlert
            v-if="errorMessage"
            color="error"
            variant="tonal"
            class="mb-4"
          >
            {{ errorMessage }}
          </VAlert>

          <VAlert
            v-if="successMessage"
            color="success"
            variant="tonal"
            class="mb-4"
          >
            {{ successMessage }}
          </VAlert>

          <VForm
            ref="forgetPasswordForm"
            @submit.prevent="submitForgotPassword"
          >
            <VTextField
              v-model="email"
              label="E-mail institutionnel"
              placeholder="nom@institution.gouv"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              rounded="lg"
              :rules="[v => !!v || 'L’adresse e-mail est requise']"
              type="email"
              class="mb-4"
            />

            <VBtn
              block
              type="submit"
              color="primary"
              size="large"
              rounded="lg"
              class="mb-3"
              :loading="loading"
              :disabled="loading"
            >
              Envoyer le code
            </VBtn>

            <VBtn
              block
              variant="text"
              color="secondary"
              size="small"
              prepend-icon="mdi-chevron-double-left"
              :to="{ name: 'login' }"
            >
              Retour à la connexion
            </VBtn>
          </VForm>

          <div class="info-box mt-6">
            <div class="font-weight-medium mb-2">
              Conseil
            </div>
            <p class="text-body-2 text-medium-emphasis mb-0">
              Utilisez l’adresse liée à votre compte pour éviter tout blocage.
            </p>
          </div>
        </VCol>

        <VCol
          md="7"
          cols="12"
          class="d-none d-md-flex"
        >
          <div
            class="auth-side-panel"
            :style="`background-image:url(${authBgThemeVariant});`"
          >
            <div class="panel-overlay">
              <div>
                <VChip
                  color="white"
                  class="text-primary mb-4"
                >
                  Administration publique
                </VChip>

                <h2 class="text-h4 text-white font-weight-bold mb-3">
                  Récupération rapide et sécurisée
                </h2>
                <p class="panel-text mb-6">
                  Relancez votre accès sans interrompre vos opérations.
                </p>

                <div class="feature-list mb-6">
                  <div
                    v-for="item in supportPoints"
                    :key="item"
                    class="feature-item"
                  >
                    <VIcon
                      icon="mdi-check-circle-outline"
                      size="20"
                      class="me-2 mt-1"
                    />
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>

              <div class="illustration-card">
                <img
                  :src="authForgotPasswordImg"
                  alt="Illustration récupération d'accès"
                >

                <div>
                  <div class="text-subtitle-1 font-weight-bold text-white mb-1">
                    Besoin d’assistance ?
                  </div>
                  <p class="panel-text mb-0">
                    Contactez l’administrateur si le problème persiste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@/styles/pages/auth.scss";
</style>

<style scoped lang="scss">
.gov-auth-page {
  min-block-size: 100dvh;
  padding: 24px;
  background:
    linear-gradient(135deg, rgba(var(--v-theme-primary), 0.08), transparent 45%),
    linear-gradient(315deg, rgba(var(--v-theme-info), 0.08), transparent 35%),
    rgb(var(--v-theme-surface));
}

.gov-auth-card {
  overflow: hidden;
  border: 1px solid rgba(var(--v-border-color), 0.08);
  border-radius: 20px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
}

.gov-logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-info)));
  block-size: 44px;
  inline-size: 44px;
  box-shadow: 0 10px 20px rgba(var(--v-theme-primary), 0.18);

  :deep(svg) {
    block-size: 22px;
    inline-size: 22px;
  }
}

.info-box {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 12px;
  background-color: rgba(var(--v-theme-surface-variant), 0.25);
  padding: 16px;
}

.auth-side-panel {
  display: flex;
  inline-size: 100%;
  min-block-size: 100%;
  padding: 28px;
  background-position: center;
  background-size: cover;
}

.panel-overlay {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  inline-size: 100%;
  border-radius: 18px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(12, 39, 91, 0.94), rgba(var(--v-theme-primary), 0.84));
}

.panel-text {
  color: rgba(255, 255, 255, 0.88);
}

.feature-list {
  display: grid;
  gap: 12px;
}

.feature-item {
  display: flex;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  color: white;
  background: rgba(255, 255, 255, 0.08);
}

.illustration-card {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);

  img {
    max-inline-size: 100%;
  }
}

@media (max-width: 959px) {
  .gov-auth-page {
    padding: 12px;
  }

  .gov-auth-card {
    border-radius: 16px;
  }
}
</style>

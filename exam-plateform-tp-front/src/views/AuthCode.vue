<script setup lang="ts">
import authBgDark from '@/assets/pages/auth-bg-dark.svg'
import authBgLight from '@/assets/pages/auth-bg-light.svg'
import authLoginImg from '@/assets/pages/working-desk-with-laptop.png'
import Logo from '@/components/Logo.vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const authStore = useAuthStore()
const theme = useTheme()
const route = useRoute()
const router = useRouter()

const otpCode = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const email = computed(() => (route.query.email as string) || authStore.pendingOtpEmail || '')

const otpInstructions = [
  'Utilisez le code reçu par e-mail',
  'Ne partagez jamais ce code',
  'Relancez la connexion si nécessaire',
]

const authBgThemeVariant = computed(() => {
  return theme.current.value.dark ? authBgDark : authBgLight
})

const verifyCode = async () => {
  if (!otpCode.value || otpCode.value.length < 6) {
    errorMessage.value = 'Le code OTP doit contenir 6 caractères.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const result = await authStore.verifyOtp({
    email: email.value,
    code: otpCode.value,
  })

  if (!result.ok)
    errorMessage.value = result.message
  else
    successMessage.value = result.message

  loading.value = false
}

const restartLogin = () => {
  router.replace({ name: 'login' })
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
            Vérification OTP
          </VChip>

          <h1 class="text-h4 font-weight-bold mb-2">
            Confirmer la connexion
          </h1>
          <p class="text-body-1 text-medium-emphasis mb-5">
            Saisissez le code envoyé à votre adresse institutionnelle.
          </p>

          <VAlert
            color="info"
            variant="tonal"
            icon="mdi-shield-lock-outline"
            class="mb-6"
          >
            Compte : <strong>{{ email || 'votre adresse e-mail' }}</strong>
          </VAlert>

          <VAlert
            v-if="errorMessage"
            color="error"
            variant="tonal"
            class="mb-6"
          >
            <p class="mb-1">{{ errorMessage }}</p>
          </VAlert>

          <VAlert
            v-if="successMessage"
            color="success"
            variant="tonal"
            class="mb-6"
          >
            <p class="mb-1">{{ successMessage }}</p>
          </VAlert>

          <VForm @submit.prevent="verifyCode">
            <VTextField
              v-model="otpCode"
              class="mb-6"
              label="Code OTP"
              placeholder="123456"
              prepend-inner-icon="mdi-shield-key-outline"
              variant="outlined"
              rounded="lg"
              maxlength="6"
              counter="6"
              autocomplete="one-time-code"
              :disabled="loading"
            />

            <VBtn
              block
              type="submit"
              color="primary"
              size="large"
              rounded="lg"
              :disabled="loading"
              :loading="loading"
              class="mb-4"
            >
              Valider le code
            </VBtn>

            <VBtn
              block
              variant="outlined"
              rounded="lg"
              :disabled="loading"
              @click="restartLogin"
            >
              Revenir à la connexion
            </VBtn>
          </VForm>

          <div class="info-box mt-6">
            <div class="font-weight-medium mb-2">
              Rappels utiles
            </div>
            <ul class="mb-0 ps-4 text-body-2 text-medium-emphasis">
              <li
                v-for="item in otpInstructions"
                :key="item"
                class="mb-1"
              >
                {{ item }}
              </li>
            </ul>
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
                  Accès renforcé aux espaces sensibles
                </h2>
                <p class="panel-text mb-6">
                  Cette étape protège la supervision, les notes et les résultats officiels.
                </p>

                <div class="feature-list mb-6">
                  <div
                    v-for="item in otpInstructions"
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
                  :src="authLoginImg"
                  alt="Illustration vérification OTP"
                >

                <div>
                  <div class="text-subtitle-1 font-weight-bold text-white mb-1">
                    Dernière étape
                  </div>
                  <p class="panel-text mb-0">
                    Après validation, votre espace sécurisé sera disponible.
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

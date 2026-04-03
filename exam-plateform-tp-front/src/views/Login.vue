<script setup lang="ts">
import authBgDark from '@/assets/pages/auth-bg-dark.svg'
import authBgLight from '@/assets/pages/auth-bg-light.svg'
import authLoginImg from '@/assets/pages/working-desk-with-laptop.png'
import Logo from '@/components/Logo.vue'
import { useAuthStore } from '@/stores/auth'
import Role from '@/utils/role'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { VForm } from 'vuetify/components/VForm'

const loginForm = ref<VForm>()
const isPasswordVisible = ref(false)
const isContentExpand = ref(true)
const theme = useTheme()
const authStore = useAuthStore()

const loginData = ref({
  email: '',
  password: '',
})

const errors = ref({
  message: '',
  password: '',
})

const isLoading = ref(false)

const accessProfiles = [
  Role.ADMINISTRATOR,
  Role.REGULATOR,
  Role.JURY,
  Role.SCHOOL,
  Role.STUDENT,
]

const portalHighlights = [
  'Sessions et centres sous contrôle',
  'Gestion des acteurs habilités',
  'Notes et délibérations sécurisées',
]

const authBgThemeVariant = computed(() => {
  return theme.current.value.dark ? authBgDark : authBgLight
})

const router = useRouter()
const route = useRoute()

const goToPasswordStep = () => {
  errors.value.message = ''

  if (!loginData.value.email) {
    errors.value.message = 'Veuillez renseigner votre adresse e-mail.'
    return
  }

  isContentExpand.value = false
}

const login = () => {
  loginForm.value?.validate().then(isValid => {
    if (isValid.valid) {
      isLoading.value = true
      errors.value.message = ''
      authStore.login({
        email: loginData.value.email,
        password: loginData.value.password,
      }).then(result => {
        if (!result.ok) {
          errors.value.message = result.message
          return
        }

        router.replace({
          name: 'verify-otp',
          query: { email: loginData.value.email, to: route.query.to ? String(route.query.to) : '/' },
        })
      }).finally(() => {
        isLoading.value = false
      })
    }
  })
}
</script>

<template>
  <div class="auth-wrapper gov-login-page">
    <VCard
      class="gov-login-card"
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

            <RouterLink
              :to="{ name: 'register' }"
              class="text-body-2 text-primary d-block d-md-none"
            >
              Inscription
            </RouterLink>
          </div>

          <VChip
            color="primary"
            variant="tonal"
            class="mb-4"
          >
            Connexion sécurisée
          </VChip>

          <h1 class="text-h4 font-weight-bold mb-2">
            Accéder à la plateforme
          </h1>
          <p class="text-body-1 text-medium-emphasis mb-5">
            Connectez-vous à l’espace officiel de gestion des examens.
          </p>

          <VAlert
            v-if="errors.message"
            color="error"
            variant="tonal"
            class="mb-6"
          >
            <p class="mb-0">{{ errors.message }}</p>
          </VAlert>

          <VAlert
            color="info"
            variant="tonal"
            icon="mdi-shield-lock-outline"
            class="mb-6"
          >
            Une vérification OTP est demandée après la connexion.
          </VAlert>

          <VForm
            ref="loginForm"
            @submit.prevent="login"
          >
            <div class="step-header mb-4">
              <span class="step-label">Connexion en 2 étapes</span>

              <div class="step-progress" aria-hidden="true">
                <span class="step-dot active" />
                <span :class="['step-dot', { active: !isContentExpand }]" />
              </div>
            </div>

            <VExpandTransition>
              <div v-show="isContentExpand">
                <VTextField
                  v-model="loginData.email"
                  label="Adresse e-mail"
                  placeholder="nom@institution.gouv"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  rounded="lg"
                  :rules="[v => !!v || 'L’adresse e-mail est requise']"
                  class="mb-6"
                />

                <VBtn
                  block
                  color="primary"
                  size="large"
                  rounded="lg"
                  append-icon="mdi-arrow-right"
                  :disabled="!loginData.email"
                  @click="goToPasswordStep"
                >
                  Continuer
                </VBtn>
              </div>
            </VExpandTransition>

            <VExpandTransition>
              <div v-show="!isContentExpand">
                <div
                  class="selected-email d-flex align-center py-2 px-3 mb-6"
                  :style="!loginData.email ? 'border-color:rgb(var(--v-theme-error)) !important' : ''"
                >
                  <VIcon
                    icon="mdi-account-circle-outline"
                    class="me-2"
                  />
                  <span class="text-body-2">{{ loginData.email }}</span>

                  <VSpacer />

                  <VBtn
                    size="small"
                    color="primary"
                    variant="text"
                    @click="isContentExpand = true"
                  >
                    Modifier
                  </VBtn>
                </div>

                <VTextField
                  v-model="loginData.password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="Mot de passe"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  rounded="lg"
                  :rules="[v => !!v || 'Le mot de passe est requis']"
                  :append-inner-icon="isPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                  :error-messages="errors.password"
                  class="mb-4"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="text-center mb-6">
                  <RouterLink :to="{ name: 'forgot-password' }">
                    Mot de passe oublié ?
                  </RouterLink>
                </div>

                <VBtn
                  block
                  type="submit"
                  color="primary"
                  size="large"
                  rounded="lg"
                  :loading="isLoading"
                  :disabled="isLoading"
                >
                  Se connecter
                </VBtn>
              </div>
            </VExpandTransition>
          </VForm>

          <div class="mt-6">
            <div class="text-caption text-medium-emphasis mb-2">
              Profils habilités
            </div>

            <div class="d-flex flex-wrap gap-2">
              <VChip
                v-for="profile in accessProfiles"
                :key="profile"
                size="small"
                variant="outlined"
              >
                {{ profile }}
              </VChip>
            </div>
          </div>
        </VCol>

        <VCol
          md="7"
          cols="12"
          class="d-none d-md-flex"
        >
          <div
            class="login-side-panel"
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
                  Pilotage des examens
                </h2>
                <p class="panel-text mb-6">
                  Un portail unique pour superviser les opérations en toute sécurité.
                </p>

                <div class="feature-list mb-6">
                  <div
                    v-for="item in portalHighlights"
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
                  alt="Illustration connexion plateforme examens"
                >

                <div>
                  <div class="text-subtitle-1 font-weight-bold text-white mb-1">
                    Besoin d’un accès établissement ?
                  </div>
                  <p class="panel-text mb-3">
                    Déposez votre demande en quelques étapes.
                  </p>
                  <VBtn
                    :to="{ name: 'register' }"
                    variant="outlined"
                    color="white"
                    append-icon="mdi-account-plus-outline"
                  >
                    Demander un accès
                  </VBtn>
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
.gov-login-page {
  min-block-size: 100dvh;
  padding: 24px;
  background:
    linear-gradient(135deg, rgba(var(--v-theme-primary), 0.08), transparent 45%),
    linear-gradient(315deg, rgba(var(--v-theme-info), 0.08), transparent 35%),
    rgb(var(--v-theme-surface));
}

.gov-login-card {
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

.step-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.step-label {
  display: inline-block;
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.step-progress {
  display: flex;
  gap: 6px;
}

.step-dot {
  border-radius: 999px;
  background-color: rgba(var(--v-theme-on-surface), 0.16);
  block-size: 6px;
  inline-size: 28px;
  transition: all 0.2s ease;
}

.step-dot.active {
  background-color: rgb(var(--v-theme-primary));
}

.selected-email {
  min-block-size: 52px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 12px;
  background-color: rgba(var(--v-theme-surface-variant), 0.25);
}

.login-side-panel {
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
  .gov-login-page {
    padding: 12px;
  }

  .gov-login-card {
    border-radius: 16px;
  }
}
</style>

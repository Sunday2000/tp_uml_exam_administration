<script setup lang="ts">
import authBgDark from '@/assets/pages/auth-bg-dark.svg'
import authBgLight from '@/assets/pages/auth-bg-light.svg'
import authResetPasswordImg from '@/assets/pages/girl-holding-tablet-device.png'
import { useTheme } from 'vuetify'
import { VForm } from 'vuetify/components/VForm'

const theme = useTheme()

const resetPasswordForm = ref<VForm>()

const email = ref('')

const authBgThemeVariant = computed(() => {
  return theme.current.value.dark ? authBgDark : authBgLight
})
</script>

<template>
  <div class="auth-wrapper">
    <VCard
      max-width="900"
      min-width="350"
    >
      <VRow no-gutters>
        <VCol
          md="6"
          cols="12"
          class="pa-sm-8 pa-4"
        >
          <VCardItem>
            <VCardTitle>Reset Password</VCardTitle>
          </VCardItem>

          <VCardText>
            <p>Enter your new password.</p>

            <VForm
              ref="resetPasswordForm"
              @submit.prevent="() => {}"
            >
              <VRow>
                <VCol cols="12">
                  <VTextField
                    v-model="email"
                    label="Password"
                  />
                </VCol>

                <VCol cols="12">
                  <VTextField
                    v-model="email"
                    label="New Password"
                  />
                </VCol>

                <VCol cols="12">
                  <VBtn
                    block
                    type="submit"
                    color="primary"
                    class="mb-3"
                  >
                    Set New Password
                  </VBtn>

                  <VBtn
                    block
                    variant="text"
                    color="secondary"
                    size="small"
                    prepend-icon="mdi-chevron-double-left"
                    :to="{ name: 'auth-login' }"
                  >
                    Back to login
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCol>

        <VCol
          cols="6"
          class="pa-8 text-center border-s d-none d-md-block"
          :style="`background-image:url(${authBgThemeVariant});`"
        >
          <div class="d-flex align-center justify-center">
            <img
              width="280"
              :src="authResetPasswordImg"
            >
          </div>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@/styles/pages/auth.scss";
</style>

<script setup lang="ts">
import forgotPasswordDark from '@/assets/illustration/forgot-password-cover-dark.svg'
import forgotPassword from '@/assets/illustration/forgot-password-cover.svg'
import { appConfig } from '@appConfig'
import { useTheme } from 'vuetify'
import { VForm } from 'vuetify/components/VForm'

const email = ref('')

const { global } = useTheme()

appConfig.isBoxLayout.value = false

const forgetPasswordForm = ref<VForm>()

const illustration = computed(() => {
  return global.current.value.dark ? forgotPasswordDark : forgotPassword
})
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper-v2"
  >
    <VCol
      cols="12"
      md="4"
      class="d-flex flex-column bg-surface justify-center align-center"
    >
      <VCard
        flat
        max-width="400"
      >
        <VCardItem>
          <VCardTitle>Forgot Password?</VCardTitle>
        </VCardItem>

        <VCardText>
          <p>Enter your registered email address to change your mail account password.</p>

          <VForm
            ref="forgetPasswordForm"
            @submit.prevent="() => {}"
          >
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  label="Email"
                />
              </VCol>

              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                  color="primary"
                  class="mb-3"
                >
                  Send Reset Link
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
      </VCard>
    </VCol>

    <VCol
      md="8"
      class="d-none d-md-flex align-center justify-center"
    >
      <img
        :src="illustration"
        width="600"
      >
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@/styles/pages/auth.scss";
</style>

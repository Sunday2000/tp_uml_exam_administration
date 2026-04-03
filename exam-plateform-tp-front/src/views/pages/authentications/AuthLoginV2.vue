<script setup lang="ts">
import login2Dark from '@/assets/illustration/login-cover-dark.svg'
import login2 from '@/assets/illustration/login-cover.svg'
import { appConfig } from '@appConfig'
import { useTheme } from 'vuetify'
import { VForm } from 'vuetify/components/VForm'

const loginData = ref({
  email: '',
  password: '',
})

const { global } = useTheme()

appConfig.isBoxLayout.value = false

const isPasswordVisible = ref(false)
const loginForm = ref<VForm>()

const illustration = computed(() => {
  return global.current.value.dark ? login2Dark : login2
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
          <VCardTitle>Sign in</VCardTitle>
          <VCardSubtitle>To access template</VCardSubtitle>

          <template #append>
            <RouterLink
              :to="{ name: 'auth-register' }"
              class="text-body-2 text-medium-emphasis d-block d-md-none"
            >
              Register
            </RouterLink>
          </template>
        </VCardItem>

        <VCardText>
          <VForm
            ref="loginForm"
            @submit.prevent="() => {}"
          >
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="loginData.email"
                  label="Email"
                  :rules="[v => !!v || 'Email is required']"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="loginData.password"
                  :type="isPasswordVisible ? 'password' : 'text'"
                  label="Password"
                  :rules="[v => !!v || 'User Name is required']"
                  :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                class="text-center"
              >
                <RouterLink :to="{ name: 'auth-forgot-password' }">
                  Forgot Password?
                </RouterLink>
              </VCol>

              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                  color="primary"
                >
                  Login
                </VBtn>
              </VCol>
            </VRow>
          </VForm>

          <div>
            <div class="d-flex align-center my-6">
              <VDivider />
              <span class="mx-3">OR</span>
              <VDivider />
            </div>

            <div class="d-flex justify-center gap-4">
              <VBtn
                icon
                variant="text"
                color="primary"
                size="small"
              >
                <VIcon
                  size="24"
                  icon="mdi-facebook"
                />
              </VBtn>

              <VBtn
                icon
                variant="text"
                color="info"
                size="small"
              >
                <VIcon
                  size="24"
                  icon="mdi-twitter"
                />
              </VBtn>

              <VBtn
                icon
                variant="text"
                size="small"
              >
                <VIcon
                  size="24"
                  icon="mdi-github"
                />
              </VBtn>

              <VBtn
                icon
                variant="text"
                color="error"
                size="small"
              >
                <VIcon
                  size="24"
                  icon="mdi-google"
                />
              </VBtn>
            </div>
          </div>
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

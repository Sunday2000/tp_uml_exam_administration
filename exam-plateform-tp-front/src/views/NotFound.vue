<script setup lang="ts">
import mics404 from '@/assets/pages/error-message-404.png'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();
console.log(authStore.getRoleDashboardMenuName())
</script>

<template>
  <div class="misc-wrapper">
    <div class="w-100">
      <VImg
        :src="mics404"
        width="500"
        class="mx-auto"
      />
    </div>
    <h5 class="text-h5 font-weight-semibold mb-3">
      Page not found.
    </h5>
    <p>
      La page à laquelle vous essayez d'accéder n'existe pas ou vous n'avez pas les autorisations nécessaire.
    </p>
    <VBtn
      :to="{ name: authStore.getRoleDashboardMenuName() }"
      variant="outlined"
      color="primary"
    >
      Retourner au Tableau de bord
    </VBtn>
  </div>
</template>

<style lang="scss">
@use "@/styles/pages/misc.scss";
</style>

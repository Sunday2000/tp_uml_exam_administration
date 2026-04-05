<script setup lang="ts">
import ActiviteNotes from './ActiviteNotes.vue'
import BannerSession from './BannerSession.vue'
import InscriptionsRecentes from './InscriptionsRecentes.vue'
import StatCards from './StatCards.vue'

/* this is just demo purpose to demonstrate how suspense loader work when you put top level await function
you can simply remove it */
await new Promise(resolve => setTimeout(() => resolve(true), 1000))
</script>


<template>
  <VRow>
    <!-- Bannière session active -->
    <VCol cols="12">
      <BannerSession />
    </VCol>

    <!-- 4 cartes stats -->
    <VCol cols="12">
      <StatCards />
    </VCol>

    <!-- Inscriptions récentes -->
    <VCol cols="12" md="7">
      <InscriptionsRecentes />
    </VCol>

    <!-- Activité récente + Avancement notes -->
    <VCol cols="12" md="5">
      <ActiviteNotes />
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const toggle = ref(null)
</script>

<template>
  <VBtnToggle
    v-model="toggle"
    color="primary"
    variant="outlined"
  >
    <VBtn icon="mdi-format-align-left" />
    <VBtn icon="mdi-format-align-center" />
    <VBtn icon="mdi-format-align-right" />
    <VBtn icon="mdi-format-align-justify" />
  </VBtnToggle>
</template>

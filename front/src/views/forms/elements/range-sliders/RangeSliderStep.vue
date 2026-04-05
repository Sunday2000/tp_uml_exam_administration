<script setup lang="ts">
const value = ref([20, 40])
</script>

<template>
  <VRangeSlider
    v-model="value"
    step="10"
    thumb-label="always"
  />
</template>

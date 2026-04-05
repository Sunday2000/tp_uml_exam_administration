<script setup lang="ts">
const value = ref([20, 40])
</script>

<template>
  <VRangeSlider
    v-model="value"
    direction="vertical"
  />
</template>

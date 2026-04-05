<script setup lang="ts">
const value = ref([30, 60])
</script>

<template>
  <VRangeSlider
    v-model="value"
    disabled
    label="Disabled"
  />
</template>

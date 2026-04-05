<script setup lang="ts">
const rating = ref(3.5)
</script>

<template>
  <VRating
    v-model="rating"
    empty-icon="mdi-circle-outline"
    full-icon="mdi-circle"
    half-icon="mdi-circle-half"
    half-increments
    hover
  />
</template>

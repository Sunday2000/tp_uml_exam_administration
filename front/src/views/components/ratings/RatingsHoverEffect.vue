<script setup lang="ts">
const rating = ref(3)
</script>

<template>
  <VRating
    v-model="rating"
    hover
  />
</template>

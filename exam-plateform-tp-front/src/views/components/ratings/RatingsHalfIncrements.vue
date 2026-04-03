<script setup lang="ts">
const rating = ref(3.5)
</script>

<template>
  <VRating
    v-model="rating"
    hover
    half-increments
  />
  <div class="font-weight-bold ps-4">
    {{ rating }}
  </div>
</template>

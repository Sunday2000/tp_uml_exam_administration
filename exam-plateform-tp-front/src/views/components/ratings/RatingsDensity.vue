<script setup lang="ts">
const rating = ref(3)
</script>

<template>
  <div class="d-flex flex-column gap-4">
    <VRating
      v-model="rating"
      density="default"
    />

    <VRating
      v-model="rating"
      density="comfortable"
    />

    <VRating
      v-model="rating"
      density="compact"
    />
  </div>
</template>

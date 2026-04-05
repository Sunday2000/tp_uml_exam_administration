<script setup lang="ts">
const rating = ref(3)
</script>

<template>
  <div class="d-flex flex-column">
    <VRating
      v-model="rating"
      color="secondary"
      active-color="primary"
    />

    <VRating
      v-model="rating"
      color="error"
      active-color="warning"
    />

    <VRating
      v-model="rating"
      color="warning"
      active-color="info"
    />
  </div>
</template>

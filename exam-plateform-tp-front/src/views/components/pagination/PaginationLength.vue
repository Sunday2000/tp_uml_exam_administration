<script setup lang="ts">
const page = ref(1)
</script>

<template>
  <VPagination
    v-model="page"
    :length="15"
  />
</template>

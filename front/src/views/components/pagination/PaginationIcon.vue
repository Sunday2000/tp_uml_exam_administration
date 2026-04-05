<script setup lang="ts">
const page = ref(1)
</script>

<template>
  <VPagination
    v-model="page"
    :length="4"
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
  />
</template>

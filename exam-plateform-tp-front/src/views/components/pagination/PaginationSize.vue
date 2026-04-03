<script setup lang="ts">
const page = ref(1)
const size = ref('default')
</script>

<template>
  <VSelect
    v-model="size"
    label="Size"
    :items="['large', 'default', 'small', 'x-small']"
    class="mb-6"
    style="max-width: 10rem;"
  />

  <VPagination
    v-model="page"
    length="4"
    :size="size"
    color="secondary"
    active-color="primary"
  />
</template>

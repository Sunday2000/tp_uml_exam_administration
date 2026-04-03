<script setup lang="ts">
type Variant = 'elevated' | 'outlined' | 'flat' | 'tonal' | 'plain' | 'text'
const page = ref(1)
const variant = ref<Variant>('elevated')
</script>

<template>
  <VSelect
    v-model="variant"
    label="Variant"
    :items="['elevated', 'outlined', 'flat', 'tonal', 'plain', 'text']"
    class="mb-6"
    style="max-width: 10rem;"
  />

  <VPagination
    v-model="page"
    length="4"
    :variant="variant"
    color="secondary"
    active-color="primary"
  />
</template>

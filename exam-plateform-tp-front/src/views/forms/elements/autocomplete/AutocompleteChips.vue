<script setup lang="ts">
const selected = ref()
</script>

<template>
  <VAutocomplete
    v-model="selected"
    chips
    label="Autocomplete"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  />
</template>

<script setup lang="ts">
const selected = ref()
</script>

<template>
  <VAutocomplete
    v-model="selected"
    multiple
    label="Autocomplete"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    class="mb-6"
  />
  <VAutocomplete
    v-model="selected"
    multiple
    clearable
    label="Autocomplete"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  />
</template>

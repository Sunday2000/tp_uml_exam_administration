<script setup lang="ts">
const selected = ref()
</script>

<template>
  <VCombobox
    v-model="selected"
    multiple
    label="Combobox"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    class="mb-6"
  />
  <VCombobox
    v-model="selected"
    multiple
    clearable
    label="Combobox"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  />
</template>

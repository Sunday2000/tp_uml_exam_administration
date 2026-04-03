<script setup lang="ts">
const selected = ref()
</script>

<template>
  <VSelect
    v-model="selected"
    multiple
    label="Select"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    class="mb-6"
  />
  <VSelect
    v-model="selected"
    multiple
    clearable
    label="Select"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  />
</template>

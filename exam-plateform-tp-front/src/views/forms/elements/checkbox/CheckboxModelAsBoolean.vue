<script setup lang="ts">
const checkbox1 = ref(true)
const checkbox2 = ref(false)
</script>

<template>
  <VCheckbox
    v-model="checkbox1"
    :label="`Checkbox 1: ${checkbox1.toString()}`"
  />
  <VCheckbox
    v-model="checkbox2"
    :label="`Checkbox 2: ${checkbox2.toString()}`"
  />
</template>

<script setup lang="ts">
const selected = ref(['John'])
</script>

<template>
  <p>{{ selected }}</p>
  <VCheckbox
    v-model="selected"
    label="John"
    value="John"
  />
  <VCheckbox
    v-model="selected"
    label="Jacob"
    value="Jacob"
  />
</template>

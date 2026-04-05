<script setup lang="ts">
const items = ref(['foo', 'bar', 'fizz', 'buzz'])
const value = ref(['foo', 'bar', 'fizz', 'buzz'])
</script>

<template>
  <VSelect
    v-model="value"
    :items="items"
    chips
    label="Chips"
    multiple
  />
</template>

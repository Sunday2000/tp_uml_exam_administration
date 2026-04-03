<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'

const inputValue = ref()
</script>

<template>
  <CleaveInput
    v-model="inputValue"
    label="Delimiter"
    placeholder="Custom Delimiter"
    :options="{
      delimiters: ['.', '.', '-'],
      blocks: [3, 3, 3, 2],
      uppercase: true,
    }"
  />
</template>

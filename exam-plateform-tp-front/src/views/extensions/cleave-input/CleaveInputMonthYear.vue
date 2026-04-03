<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'

const inputValue = ref()
</script>

<template>
  <CleaveInput
    v-model="inputValue"
    label="Month Year"
    placeholder="Enter Month Year"
    :options="{
      date: true,
      datePattern: ['m', 'y'],
    }"
  />
</template>

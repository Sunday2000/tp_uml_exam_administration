<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'

const inputValue = ref()
</script>

<template>
  <CleaveInput
    v-model="inputValue"
    label="Date"
    placeholder="Enter Date"
    :options="{
      date: true,
      delimiter: '-',
      datePattern: ['Y', 'm', 'd'],
    }"
  />
</template>

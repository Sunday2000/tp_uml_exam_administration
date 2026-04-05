<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'

const inputValue = ref()
</script>

<template>
  <CleaveInput
    v-model="inputValue"
    label="Time"
    placeholder="Enter Time"
    :options="{
      time: true,
      timePattern: ['h', 'm', 's'],
    }"
  />
</template>

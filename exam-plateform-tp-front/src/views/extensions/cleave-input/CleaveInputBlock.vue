<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'
import 'cleave.js/dist/addons/cleave-phone.gt'

const inputValue = ref()
</script>

<template>
  <CleaveInput
    v-model="inputValue"
    label="Block"
    placeholder="Custom Block"
    :options="{
      blocks: [4, 3, 3, 4],
      uppercase: true,
    }"
  />
</template>

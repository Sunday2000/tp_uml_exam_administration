<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'
import 'cleave.js/dist/addons/cleave-phone.gt'

const inputValue = ref()
</script>

<template>
  <CleaveInput
    v-model="inputValue"
    label="Prefix"
    placeholder="Custom Prefix"
    :options="{
      prefix: 'PREFIX',
      delimiter: '-',
      blocks: [6, 4, 4, 4],
      uppercase: true,
    }"
  />
</template>

<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'
import 'cleave.js/dist/addons/cleave-phone.gt'

const inputValue = ref()
</script>

<template>
  <CleaveInput
    v-model="inputValue"
    label="Numeral"
    placeholder="Numeral formatting"
    :options="{
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
    }"
  />
</template>

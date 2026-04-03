<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'
import 'cleave.js/dist/addons/cleave-phone.gt'

const inputValue = ref()
</script>

<template>
  <CleaveInput
    v-model="inputValue"
    label="Phone"
    placeholder="Enter Phone Number"
    :options="{
      phone: true,
      phoneRegionCode: 'GT',
    }"
  />
</template>

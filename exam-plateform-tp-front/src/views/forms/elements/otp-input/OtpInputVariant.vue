<script setup lang="ts">
import { VOtpInput } from 'vuetify/labs/VOtpInput'

type Variant = 'solo' | 'solo-inverted' | 'outlined' | 'solo-filled' | 'underlined' | 'filled' | 'plain' | undefined

const selectedVariant = ref<Variant>('outlined')
const variant = ['solo', 'solo-inverted', 'outlined', 'filled', 'underlined', 'solo-filled', 'plain']
const selected = ref('')
</script>

<template>
  <VTabs v-model="selectedVariant">
    <VTab
      v-for="i in variant"
      :key="i"
      :value="i"
    >
      {{ i }}
    </VTab>
  </VTabs>

  <VOtpInput
    v-model="selected"
    label="Text field"
    :variant="selectedVariant"
  />
</template>

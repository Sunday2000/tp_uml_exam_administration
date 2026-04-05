<script setup lang="ts">
import { VFileInput } from 'vuetify/components/VFileInput'

const rules = [
  (value: [{ length: number; size: number }]) => {
    return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
  },
]
</script>

<template>
  <VFileInput
    :rules="rules"
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
    label="Avatar"
  />
</template>

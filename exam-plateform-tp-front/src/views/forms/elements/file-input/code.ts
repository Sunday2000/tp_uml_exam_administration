export const accept = `<template>
  <VFileInput
    accept="image/*"
    label="File input"
    class="mb-8"
  />

  <VFileInput
    accept="image/*"
    label="File input"
  />
</template>
`
export const chips = `<template>
  <VFileInput
    chips
    multiple
    label="File input w/ chips"
  />
</template>
`
export const counter = `<template>
  <VFileInput
    show-size
    counter
    multiple
    label="File input"
  />
</template>
`
export const multiple = `<template>
  <VFileInput
    multiple
    label="File input"
  />
</template>
`
export const showSize = `<template>
  <VFileInput
    show-size
    label="File input"
  />
</template>
`
export const slot = `<script setup lang="ts">
const files = ref([])
</script>

<template>
  <VFileInput
    v-model="files"
    counter
    multiple
    label="File input"
    placeholder="Select your files"
    prepend-icon="mdi-paperclip"
    :show-size="1000"
  >
    <template #selection="{ fileNames }">
      <template
        v-for="(fileName, index) in fileNames"
        :key="fileName"
      >
        <VChip
          v-if="index < 2"
          color="primary"
          label
          size="small"
          class="me-2"
        >
          {{ fileName }}
        </VChip>

        <span
          v-else-if="index === 2"
          class="text-overline mx-2"
        >
          +{{ files.length - 2 }} File(s)
        </span>
      </template>
    </template>
  </VFileInput>
</template>
`
export const validator = `<script setup lang="ts">
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
`
export const variant = `<script setup lang="ts">
type Variant = 'solo' | 'solo-inverted' | 'outlined' | 'solo-filled' | 'underlined' | 'filled' | 'plain' | undefined

const selectedVariant = ref<Variant>('outlined')
const variant = ['solo', 'solo-inverted', 'outlined', 'filled', 'underlined', 'solo-filled', 'plain']
const selected = ref()
</script>

<template>
  <VTabs
    v-model="selectedVariant"
    class="mb-6"
  >
    <VTab
      v-for="i in variant"
      :key="i"
      :value="i"
    >
      {{ i }}
    </VTab>
  </VTabs>

  <VFileInput
    v-model="selected"
    label="File Input"
    :variant="selectedVariant"
  />
</template>
`

export const autoGrow = `<template>
  <VTextarea
    name="input-7-1"
    label="Label"
    auto-grow
    model-value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
  />
</template>
`
export const clearable = `<template>
  <VTextarea
    clearable
    clear-icon="mdi-close-circle-outline"
    label="Text"
    model-value="This is clearable text."
  />
</template>
`
export const counter = `<script setup lang="ts">
const rules = [(v: string | any[]) => v.length <= 25 || 'Max 25 characters']

const value = ref('Hello!')
</script>

<template>
  <VTextarea
    counter
    label="Text"
    :rules="rules"
    :model-value="value"
  />
</template>
`
export const icons = `<template>
  <VTextarea
    class="mx-2"
    label="prepend-icon"
    rows="1"
    prepend-icon="mdi-comment-outline"
    append-inner-icon="mdi-bell-outline"
  />
</template>
`
export const noResize = `<script setup lang="ts">
const value = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
</script>

<template>
  <VTextarea
    label="Text"
    no-resize
    rows="1"
    :model-value="value"
  />
</template>
`
export const rows = `<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="One row"
        auto-grow
        variant="outlined"
        rows="1"
        row-height="15"
      />
    </VCol>
    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        variant="filled"
        auto-grow
        label="Two rows"
        rows="2"
        row-height="20"
      />
    </VCol>
    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        label="Three rows"
        auto-grow
        variant="outlined"
        rows="3"
        row-height="25"
        shaped
      />
    </VCol>
    <VCol
      cols="12"
      sm="6"
    >
      <VTextarea
        variant="filled"
        auto-grow
        label="Four rows"
        rows="4"
        row-height="30"
        shaped
      />
    </VCol>
  </VRow>
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

  <VTextarea
    v-model="selected"
    label="Autocomplete"
    :variant="selectedVariant"
  />
</template>
`

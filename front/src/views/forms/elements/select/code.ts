export const chips = `<script setup lang="ts">
const items = ref(['foo', 'bar', 'fizz', 'buzz'])
const value = ref(['foo', 'bar', 'fizz', 'buzz'])
</script>

<template>
  <VSelect
    v-model="value"
    :items="items"
    chips
    label="Chips"
    multiple
  />
</template>
`
export const multiple = `<script setup lang="ts">
const selected = ref()
</script>

<template>
  <VSelect
    v-model="selected"
    multiple
    label="Select"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    class="mb-6"
  />
  <VSelect
    v-model="selected"
    multiple
    clearable
    label="Select"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  />
</template>
`
export const selection = `<script setup lang="ts">
const items = ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar']

const value = ref(['foo', 'bar', 'fizz'])
</script>

<template>
  <VSelect
    v-model="value"
    :items="items"
    label="Select Item"
    multiple
  >
    <template #selection="{ item, index }">
      <VChip v-if="index < 2">
        <span>{{ item.title }}</span>
      </VChip>
      <span
        v-if="index === 2"
        class="text-grey text-caption align-self-center"
      >
        (+{{ value.length - 2 }} others)
      </span>
    </template>
  </VSelect>
</template>
`
export const titleValue = `<script setup lang="ts">
const select = ref({ state: 'Florida', abbr: 'FL' })

const items = [
  { state: 'Florida', abbr: 'FL' },
  { state: 'Georgia', abbr: 'GA' },
  { state: 'Nebraska', abbr: 'NE' },
  { state: 'California', abbr: 'CA' },
  { state: 'New York', abbr: 'NY' },
]
</script>

<template>
  <VSelect
    v-model="select"
    :hint="\`\${select.state}, \${select.abbr}\`"
    :items="items"
    item-title="state"
    item-value="abbr"
    label="Select"
    persistent-hint
    return-object
    single-line
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

  <VSelect
    v-model="selected"
    label="Select"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    :variant="selectedVariant"
  />
</template>
`

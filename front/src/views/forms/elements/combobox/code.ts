export const chips = `<script setup lang="ts">
const selected = ref()
</script>

<template>
  <VCombobox
    v-model="selected"
    chips
    label="Combobox"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  />
</template>
`
export const density = `<script setup lang="ts">
const items = ['foo', 'bar', 'fizz', 'buzz']

const value = ref('foo')
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCombobox
        v-model="value"
        :items="items"
        density="default"
        label="Default"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="value"
        :items="items"
        density="comfortable"
        label="Comfortable"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="value"
        :items="items"
        density="compact"
        label="Compact"
      />
    </VCol>
  </VRow>
</template>
`
export const multiple = `<script setup lang="ts">
const selected = ref()
</script>

<template>
  <VCombobox
    v-model="selected"
    multiple
    label="Combobox"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    class="mb-6"
  />
  <VCombobox
    v-model="selected"
    multiple
    clearable
    label="Combobox"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  />
</template>
`
export const slot = `<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import avatar5 from '@/assets/avatars/avatar-5.png'

const people = [
  { name: 'Sandra Adams', group: 'Group 1', avatar: avatar1 },
  { name: 'Ali Connors', group: 'Group 1', avatar: avatar2 },
  { name: 'Trevor Hansen', group: 'Group 1', avatar: avatar3 },
  { name: 'Tucker Smith', group: 'Group 1', avatar: avatar2 },
  { name: 'Britta Holt', group: 'Group 2', avatar: avatar4 },
  { name: 'Jane Smith ', group: 'Group 2', avatar: avatar5 },
  { name: 'John Smith', group: 'Group 2', avatar: avatar1 },
  { name: 'Sandra Williams', group: 'Group 2', avatar: avatar3 },
]

const friends = ref([])
</script>

<template>
  <VCombobox
    v-model="friends"
    :items="people"
    chips
    closable-chips
    item-title="name"
    item-value="name"
    label="Select"
    multiple
  >
    <template #chip="{ props, item }">
      <VChip
        v-bind="props"
        :prepend-avatar="item.raw.avatar"
        :text="item.raw.name"
      />
    </template>

    <template #item="{ props, item }">
      <VListItem
        v-bind="props"
        :prepend-avatar="item?.raw?.avatar"
        :title="item?.raw?.name"
        :subtitle="item?.raw?.group"
      />
    </template>
  </VCombobox>
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

  <VCombobox
    v-model="selected"
    label="Combobox"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    :variant="selectedVariant"
  />
</template>
`

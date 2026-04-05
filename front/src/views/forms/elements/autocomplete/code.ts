export const asynchronousItems = `<script setup lang="ts">
const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const loading = ref(false)
const items = ref<string[]>([])
const search = ref(undefined)
const select = ref(null)

watch(search, val => {
  val && val !== select.value && querySelections(val)
})

function querySelections(v: string | undefined) {
  loading.value = true
  setTimeout(() => {
    items.value = states.filter(e => {
      return (e || '').toLowerCase().includes((v || '').toLowerCase())
    })
    loading.value = false
  }, 500)
}
</script>

<template>
  <VAutocomplete
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :items="items"
    hide-no-data
    label="What state are you from?"
  />
</template>
`
export const chips = `<script setup lang="ts">
const selected = ref()
</script>

<template>
  <VAutocomplete
    v-model="selected"
    chips
    label="Autocomplete"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  />
</template>
`
export const multiple = `<script setup lang="ts">
const selected = ref()
</script>

<template>
  <VAutocomplete
    v-model="selected"
    multiple
    label="Autocomplete"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    class="mb-6"
  />
  <VAutocomplete
    v-model="selected"
    multiple
    clearable
    label="Autocomplete"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  />
</template>
`
export const selectFirst = `<script setup lang="ts">
const items = [
  {
    prependIcon: 'mdi-clock-outline',
    title: 'recipe with chicken',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'best hiking trails near me',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'how to learn a new language',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'DIY home organization ideas',
  },
  {
    prependIcon: 'mdi-clock-outline',
    title: 'latest fashion trends',
  },
]
</script>

<template>
  <VAutocomplete
    :items="items"
    auto-select-first
    item-props
    placeholder="Search Google or type a URL"
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

const friends = ref(['Sandra Adams', 'Britta Holt'])
</script>

<template>
  <VAutocomplete
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
  </VAutocomplete>
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

  <VAutocomplete
    v-model="selected"
    label="Autocomplete"
    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    :variant="selectedVariant"
  />
</template>
`

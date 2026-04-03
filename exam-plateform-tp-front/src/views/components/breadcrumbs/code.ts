export const bgColor = `<script setup lang="ts">
const selectedBg = ref(undefined)
</script>

<template>
  <div class="d-flex gap-4 align-center flex-wrap">
    <VBreadcrumbs
      :bg-color="selectedBg"
      :items="['Foo', 'Bar', 'Fizz']"
      class="flex-grow-1"
    />

    <div style="width: 8rem;">
      <VSelect
        v-model="selectedBg"
        label="Select bg"
        :items="['primary', 'secondary', 'success', 'warning', 'info', 'error']"
      />
    </div>
  </div>
</template>
`

export const prepend = `<script setup lang="ts">
const items = [
  {
    title: 'Dashboard',
    disabled: false,
    href: '#',
  },
  {
    title: 'Link 1',
    disabled: false,
    href: '#',
  },
  {
    title: 'Link 2',
    disabled: true,
    href: 'breadcrumbs_link_2',
  },
]
</script>

<template>
  <VBreadcrumbs :items="items">
    <template #prepend>
      <VIcon
        size="small"
        icon="$vuetify"
      />
    </template>
  </VBreadcrumbs>
</template>
`
export const divider = `<script setup lang="ts">
const items = [
  {
    title: 'Dashboard',
    disabled: false,
    href: '#',
  },
  {
    title: 'Link 1',
    disabled: false,
    href: '#',
  },
  {
    title: 'Link 2',
    disabled: true,
    href: '#',
  },
]
</script>

<template>
  <div>
    <VBreadcrumbs
      :items="items"
      divider="-"
    />

    <VBreadcrumbs :items="items">
      <template #divider>
        <VIcon icon="mdi-chevron-right" />
      </template>
    </VBreadcrumbs>
  </div>
</template>
`

export const titleSlot = `<script setup lang="ts">
const items = [
  {
    title: 'Dashboard',
    disabled: false,
    href: '#',
  },
  {
    title: 'Link 1',
    disabled: false,
    href: '#',
  },
  {
    title: 'Link 2',
    disabled: true,
    href: '#',
  },
]
</script>

<template>
  <VBreadcrumbs :items="items">
    <template #title="{ item }">
      {{ item.title.toUpperCase() }}
    </template>
  </VBreadcrumbs>
</template>
`

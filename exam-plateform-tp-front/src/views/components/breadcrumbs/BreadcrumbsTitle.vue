<script setup lang="ts">
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

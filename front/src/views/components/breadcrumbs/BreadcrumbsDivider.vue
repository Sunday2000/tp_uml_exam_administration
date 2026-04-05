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

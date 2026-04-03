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

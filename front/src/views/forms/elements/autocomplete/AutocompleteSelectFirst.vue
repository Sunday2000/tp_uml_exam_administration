<script setup lang="ts">
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

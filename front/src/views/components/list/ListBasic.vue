<script setup lang="ts">
const items = [
  { type: 'subheader', title: 'Group #1' },
  {
    title: 'Item #1',
    value: 1,
  },
  {
    title: 'Item #2',
    value: 2,
  },
  {
    title: 'Item #3',
    value: 3,
  },
  { type: 'divider' },
  { type: 'subheader', title: 'Group #2' },
  {
    title: 'Item #4',
    value: 4,
  },
  {
    title: 'Item #5',
    value: 5,
  },
  {
    title: 'Item #6',
    value: 6,
  },
]
</script>

<template>
  <VList :items="items" />
</template>

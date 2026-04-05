<script setup lang="ts">
const items = [
  {
    id: 1,
    color: 'info',
    icon: 'mdi-information',
  },
  {
    id: 2,
    color: 'error',
    icon: 'mdi-alert-circle',
  },
]
</script>

<template>
  <VTimeline side="end">
    <VTimelineItem
      v-for="item in items"
      :key="item.id"
      :dot-color="item.color"
      size="small"
    >
      <VAlert
        value
        :color="item.color"
        :icon="item.icon"
      >
        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
      </VAlert>
    </VTimelineItem>
  </VTimeline>
</template>

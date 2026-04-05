<script setup lang="ts">
const items = [
  { text: 'Real-Time', icon: 'mdi-clock-outline' },
  { text: 'Audience', icon: 'mdi-account-outline' },
  { text: 'Conversions', icon: 'mdi-flag-outline' },
]
</script>

<template>
  <VList>
    <VListSubheader>REPORTS</VListSubheader>

    <VListItem
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="primary"
      rounded="xl"
    >
      <template #prepend>
        <VIcon :icon="item.icon" />
      </template>

      <VListItemTitle>
        {{ item.text }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>

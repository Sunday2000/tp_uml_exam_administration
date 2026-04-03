<script setup lang="ts">
const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]
</script>

<template>
  <div>
    <VMenu open-on-hover>
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Open on hover
        </VBtn>
      </template>

      <VList>
        <VListItem
          v-for="(item, index) in items"
          :key="index"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>

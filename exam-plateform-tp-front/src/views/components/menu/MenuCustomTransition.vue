<script setup lang="ts">
const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]
</script>

<template>
  <div class="d-flex flex-wrap gap-6">
    <VMenu transition="scale-transition">
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Scale Transition
        </VBtn>
      </template>

      <VList>
        <VListItem
          v-for="(item, i) in items"
          :key="i"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>

    <VMenu transition="slide-x-transition">
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Slide X Transition
        </VBtn>
      </template>

      <VList>
        <VListItem
          v-for="(item, i) in items"
          :key="i"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>

    <VMenu transition="slide-y-transition">
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Slide Y Transition
        </VBtn>
      </template>
      <VList>
        <VListItem
          v-for="(item, i) in items"
          :key="i"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>

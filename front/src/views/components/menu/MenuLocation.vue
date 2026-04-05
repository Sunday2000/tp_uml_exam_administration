<script setup lang="ts">
const location = ref('end')

const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]

const locations = [
  'top',
  'bottom',
  'start',
  'end',
  'center',
]
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VSelect
      v-model="location"
      :items="locations"
      label="Location"
      style="max-width: 8rem;"
    />

    <VMenu :location="location">
      <template #activator="{ props }">
        <VBtn
          color="primary"
          dark
          v-bind="props"
        >
          Dropdown
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

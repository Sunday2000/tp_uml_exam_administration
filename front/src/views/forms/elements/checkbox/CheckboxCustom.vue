<script setup lang="ts">
const selectedCheckbox = ref<string[]>(['checkbox-1'])

const checkboxes = [
  {
    label: 'Option 1',
    value: 'checkbox-1',
    icon: 'mdi-view-compact-outline',
  },
  {
    label: 'Option 2',
    value: 'checkbox-2',
    icon: 'mdi-view-dashboard-outline',
  },
  {
    label: 'Option 3',
    value: 'checkbox-3',
    icon: 'mdi-view-sequential-outline',
  },
]
</script>

<template>
  <div class="d-flex justify-space-between gap-4 w-100">
    <VLabel
      v-for="item in checkboxes"
      :key="item.value"
      class="custom-label border rounded"
      :class="selectedCheckbox.includes(item.value) ? 'text-primary border-primary border-opacity-100' : ''"
    >
      <VIcon
        :icon="item.icon"
        class="custom-label-icon"
      />
      <VCheckbox
        v-model="selectedCheckbox"
        :value="item.value"
      />
      <VTooltip
        activator="parent"
        location="top"
      >
        {{ item.label }}
      </VTooltip>
    </VLabel>
  </div>
</template>

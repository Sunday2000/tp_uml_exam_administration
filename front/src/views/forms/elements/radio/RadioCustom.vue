<script setup lang="ts">
const customRadio = ref('radio-1')

const radios = [
  {
    label: 'Option 1',
    value: 'radio-1',
    icon: 'mdi-view-compact-outline',
  },
  {
    label: 'Option 2',
    value: 'radio-2',
    icon: 'mdi-view-dashboard-outline',
  },
  {
    label: 'Option 3',
    value: 'radio-3',
    icon: 'mdi-view-sequential-outline',
  },
]
</script>

<template>
  <VRadioGroup
    v-model="customRadio"
    inline
  >
    <div class="d-flex justify-space-between gap-4 w-100">
      <VLabel
        v-for="item in radios"
        :key="item.value"
        class="custom-label border rounded"
        :class="customRadio === item.value ? 'text-primary border-primary border-opacity-100' : ''"
      >
        <VIcon
          :icon="item.icon"
          class="custom-label-icon"
        />
        <VRadio :value="item.value" />
        <VTooltip
          activator="parent"
          location="top"
        >
          {{ item.label }}
        </VTooltip>
      </VLabel>
    </div>
  </VRadioGroup>
</template>

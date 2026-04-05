<script setup lang="ts">
const seasons = ref({
  0: 'Winter',
  1: 'Spring',
  2: 'Summer',
  3: 'Fall',
})

const icons = ref([
  'mdi-snowflake',
  'mdi-leaf',
  'mdi-fire',
  'mdi-water',
])

function season(val: string) {
  return icons.value[val]
}
</script>

<template>
  <VRangeSlider
    :ticks="seasons"
    :model-value="[0, 1]"
    min="0"
    :step="1"
    max="3"
    show-ticks="always"
    thumb-label="always"
    tick-size="4"
  >
    <template #thumb-label="{ modelValue }">
      <VIcon :icon="season(modelValue)" />
    </template>
  </VRangeSlider>
</template>

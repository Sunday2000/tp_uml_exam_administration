export const strict = `<script setup lang="ts">
const value = ref([20, 40])
</script>

<template>
  <VRangeSlider
    v-model="value"
    strict
  />
</template>
`
export const disabled = `<script setup lang="ts">
const value = ref([30, 60])
</script>

<template>
  <VRangeSlider
    v-model="value"
    disabled
    label="Disabled"
  />
</template>
`
export const miniMax = `<script setup lang="ts">
const range = ref([-5, 5])
</script>

<template>
  <VRangeSlider
    v-model="range"
    :max="10"
    :min="-10"
    :step="1"
  >
    <template #prepend>
      <VTextField
        :model-value="range[0]"
        single-line
        type="number"
        style="width: 70px;"
        @change="$set(range, 0, $event)"
      />
    </template>
    <template #append>
      <VTextField
        :model-value="range[1]"
        single-line
        type="number"
        style="width: 70px;"
        @change="$set(range, 1, $event)"
      />
    </template>
  </VRangeSlider>
</template>
`
export const slot = `<script setup lang="ts">
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
`
export const step = `<script setup lang="ts">
const value = ref([20, 40])
</script>

<template>
  <VRangeSlider
    v-model="value"
    step="10"
    thumb-label="always"
  />
</template>
`
export const vertical = `<script setup lang="ts">
const value = ref([20, 40])
</script>

<template>
  <VRangeSlider
    v-model="value"
    direction="vertical"
  />
</template>
`

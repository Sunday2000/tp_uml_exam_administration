<script setup lang="ts">
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

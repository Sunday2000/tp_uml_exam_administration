<script setup lang="ts">
const slider1 = ref(0)
const slider2 = ref(50)
const slider3 = ref(100)
</script>

<template>
  <div>
    <VSlider
      v-model="slider1"
      color="secondary"
      label="color"
      class="mb-6"
    />

    <VSlider
      v-model="slider2"
      track-color="info"
      label="track-color"
      class="mb-6"
    />

    <VSlider
      v-model="slider3"
      thumb-color="warning"
      label="thumb-color"
    />
  </div>
</template>

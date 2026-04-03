<script setup lang="ts">
const media = ref(0)
const alarm = ref(0)
const zoom = ref(0)

function zoomOut() {
  zoom.value = (zoom.value - 10) || 0
}
function zoomIn() {
  zoom.value = (zoom.value + 10) || 100
}
</script>

<template>
  <div>
    <div class="text-caption">
      Media volume
    </div>

    <VSlider
      v-model="media"
      prepend-icon="mdi-volume-high"
    />

    <div class="text-caption">
      Alarm volume
    </div>

    <VSlider
      v-model="alarm"
      append-icon="mdi-alarm"
    />

    <div class="text-caption">
      Icon click callback
    </div>

    <VSlider
      v-model="zoom"
      append-icon="mdi-magnify-plus-outline"
      prepend-icon="mdi-magnify-minus-outline"
      @click:append="zoomIn"
      @click:prepend="zoomOut"
    />
  </div>
</template>

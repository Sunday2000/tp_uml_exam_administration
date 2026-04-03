<script setup lang="ts">
const slider1 = ref(50)
const slider2 = ref(50)
const slider3 = ref(50)
const slider4 = ref(50)

const satisfactionEmojis = ['\uD83D\uDE2D', '\uD83D\uDE22', '\u2639\uFE0F', '\uD83D\uDE41', '\uD83D\uDE10', '\uD83D\uDE42', '\uD83D\uDE0A', '\uD83D\uDE01', '\uD83D\uDE04', '\uD83D\uDE0D']
</script>

<template>
  <div class="d-flex flex-column">
    <div>
      <div class="text-caption">
        Show thumb when using slider
      </div>
      <VSlider
        v-model="slider1"
        thumb-label
      />
    </div>

    <div>
      <div class="text-caption">
        Always show thumb label
      </div>
      <VSlider
        v-model="slider2"
        thumb-label="always"
      />
    </div>

    <div>
      <div class="text-caption">
        Custom thumb size
      </div>
      <VSlider
        v-model="slider3"
        :thumb-size="36"
        thumb-label="always"
      />
    </div>

    <div>
      <div class="text-caption">
        Custom thumb label
      </div>
      <VSlider
        v-model="slider4"
        thumb-label="always"
      >
        <template #thumb-label="{ modelValue }">
          {{ satisfactionEmojis[Math.min(Math.floor(modelValue / 10), 9)] }}
        </template>
      </VSlider>
    </div>
  </div>
</template>

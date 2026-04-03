export const colors = `<script setup lang="ts">
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
`
export const icon = `<script setup lang="ts">
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
`
export const steps = `<script setup lang="ts">
const value = ref(0)
</script>

<template>
  <VSlider
    v-model="value"
    :min="0"
    :max="1"
    :step="0.2"
    thumb-label
  />
</template>
`
export const thumb = `<script setup lang="ts">
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
`
export const ticks = `<script setup lang="ts">
const tickLabels = {
  0: 'Figs',
  1: 'Lemon',
  2: 'Pear',
  3: 'Apple',
}
</script>

<template>
  <div>
    <div class="text-caption">
      Show ticks when using slider
    </div>

    <VSlider
      step="10"
      show-ticks
    />

    <div class="text-caption">
      Always show ticks
    </div>

    <VSlider
      step="10"
      show-ticks="always"
    />

    <div class="text-caption">
      Tick size
    </div>

    <VSlider
      step="10"
      show-ticks="always"
      tick-size="4"
    />

    <div class="text-caption">
      Tick labels
    </div>

    <VSlider
      :ticks="tickLabels"
      :max="3"
      step="1"
      show-ticks="always"
      tick-size="4"
    />
  </div>
</template>
`

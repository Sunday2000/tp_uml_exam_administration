<script setup lang="ts">
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

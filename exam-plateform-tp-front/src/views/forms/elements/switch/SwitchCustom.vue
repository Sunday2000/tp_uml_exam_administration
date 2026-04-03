<script setup lang="ts">
const switchToggle = ref(false)
</script>

<template>
  <VLabel
    class="custom-label border rounded w-100"
    :class="switchToggle ? 'text-primary border-primary border-opacity-100' : ''"
  >
    <VIcon
      :icon="switchToggle ? 'mdi-unfold-more-vertical' : 'mdi-unfold-less-vertical'"
      class="custom-label-icon"
    />
    <VSwitch v-model="switchToggle" />

    <VTooltip
      activator="parent"
      location="top"
    >
      {{ switchToggle ? 'Expand' : 'Collapse' }}
    </VTooltip>
  </VLabel>
</template>

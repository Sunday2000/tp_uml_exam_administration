<script setup lang="ts">
const value = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
</script>

<template>
  <VTextarea
    label="Text"
    no-resize
    rows="1"
    :model-value="value"
  />
</template>

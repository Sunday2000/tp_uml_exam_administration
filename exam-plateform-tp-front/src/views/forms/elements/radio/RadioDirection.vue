<script setup lang="ts">
const column = ref(null)
const inline = ref(null)
</script>

<template>
  <VRadioGroup
    v-model="column"
    column
  >
    <VRadio
      label="Option 1"
      value="radio-1"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
    />
  </VRadioGroup>

  <VDivider />

  <VRadioGroup
    v-model="inline"
    inline
  >
    <VRadio
      label="Option 1"
      value="radio-1"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
    />
  </VRadioGroup>
</template>

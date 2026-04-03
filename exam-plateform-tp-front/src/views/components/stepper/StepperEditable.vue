<script setup lang="ts">
import { VStepper, VStepperHeader, VStepperItem } from 'vuetify/labs/VStepper'
</script>

<template>
  <VStepper>
    <VStepperHeader>
      <VStepperItem
        complete
        editable
        title="Select campaign settings"
        value="1"
      />

      <VDivider />

      <VStepperItem
        complete
        title="Create an ad group"
        value="2"
      />

      <VDivider />

      <VStepperItem
        editable
        title="Create an ad"
        value="3"
      />
    </VStepperHeader>
  </VStepper>
</template>

<script setup lang="ts">
import { VStepper, VStepperHeader, VStepperItem } from 'vuetify/labs/VStepper'
</script>

<template>
  <VStepper alt-labels>
    <VStepperHeader>
      <VStepperItem
        value="1"
        title="Ad unit details"
      />

      <VDivider />

      <VStepperItem
        value="2"
        title="Ad sizes"
      />

      <VDivider />

      <VStepperItem
        value="3"
        title="Ad templates"
      />
    </VStepperHeader>
  </VStepper>
</template>

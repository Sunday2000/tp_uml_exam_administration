<script setup lang="ts">
import { VStepper, VStepperHeader, VStepperItem } from 'vuetify/labs/VStepper'
</script>

<template>
  <VStepper model-value="3">
    <VStepperHeader>
      <VStepperItem
        complete
        title="Job Search"
        value="1"
      />

      <VDivider />

      <VStepperItem
        :rules="[() => false]"
        title="Application Submission"
        subtitle="Missing Details"
        value="2"
      />

      <VDivider />

      <VStepperItem
        title="Interview Process"
        value="3"
      />

      <VDivider />

      <VStepperItem
        title="Hiring Decision"
        value="4"
      />
    </VStepperHeader>
  </VStepper>
</template>

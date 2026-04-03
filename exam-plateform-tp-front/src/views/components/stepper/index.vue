<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import StepperAlternate from './StepperAlternate.vue'
import StepperBasic from './StepperBasic.vue'
import StepperEditable from './StepperEditable.vue'
import StepperError from './StepperError.vue'
import * as code from './code'

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Components',
    disabled: true,
  },
  {
    title: 'Stepper',
    disabled: true,
  },
]
</script>

<template>
  <VRow>
    <!-- breadcrumbs -->
    <VCol
      cols="12"
      class="d-flex align-center justify-space-between flex-wrap"
    >
      <VBreadcrumbs
        divider="-"
        :items="breadcrumbs"
        class="pa-0"
      />

      <div>
        <ApiBtn
          href="https://vuetifyjs.com/en/components/steppers/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <VCol cols="12">
      <VCard
        title="Basic"
        variant="text"
      >
        <VCardText>
          <StepperBasic />
        </VCardText>
        <CodeToggler :code="code.basic" />
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard
        title="Editable"
        variant="text"
      >
        <VCardText>
          <StepperEditable />
        </VCardText>
        <CodeToggler :code="code.editable" />
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard
        title="Alternate"
        variant="text"
      >
        <VCardText>
          <StepperAlternate />
        </VCardText>
        <CodeToggler :code="code.alternate" />
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard
        title="Error"
        variant="text"
      >
        <VCardText>
          <StepperError />
        </VCardText>
        <CodeToggler :code="code.error" />
      </VCard>
    </VCol>
  </VRow>
</template>

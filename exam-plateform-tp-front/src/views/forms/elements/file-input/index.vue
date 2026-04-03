<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import FileInputAccept from './FileInputAccept.vue'
import FileInputChips from './FileInputChips.vue'
import FileInputCounter from './FileInputCounter.vue'
import FileInputMultiple from './FileInputMultiple.vue'
import FileInputShowSize from './FileInputShowSize.vue'
import FileInputSlot from './FileInputSlot.vue'
import FileInputValidation from './FileInputValidation.vue'
import FileInputVariant from './FileInputVariant.vue'
import * as code from './code'

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Forms',
    disabled: true,
  },
  {
    title: 'File Input',
    disabled: true,
  },
]
</script>

<template>
  <VRow>
    <!-- Breadcrumbs -->
    <VCol
      cols="12"
      class="d-flex align-center justify-space-between flex-wrap"
    >
      <VBreadcrumbs
        divider="-"
        :items="breadcrumbs"
        class="pa-0 "
      />

      <div>
        <ApiBtn
          href="https://vuetifyjs.com/en/components/file-inputs/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Variant -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Variant">
        <VCardText>
          <FileInputVariant />
        </VCardText>
        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>

    <!-- Accept -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Accept">
        <VCardText>
          <FileInputAccept />
        </VCardText>
        <CodeToggler :code="code.accept" />
      </VCard>
    </VCol>

    <!-- Chips -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Chips">
        <VCardText>
          <FileInputChips />
        </VCardText>
        <CodeToggler :code="code.chips" />
      </VCard>
    </VCol>

    <!-- Counter -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Counter">
        <VCardText>
          <FileInputCounter />
        </VCardText>
        <CodeToggler :code="code.counter" />
      </VCard>
    </VCol>

    <!-- Multiple -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Multiple">
        <VCardText>
          <FileInputMultiple />
        </VCardText>
        <CodeToggler :code="code.multiple" />
      </VCard>
    </VCol>

    <!-- Show Size -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Show Size">
        <VCardText>
          <FileInputShowSize />
        </VCardText>
        <CodeToggler :code="code.showSize" />
      </VCard>
    </VCol>

    <!-- Validation -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Validation">
        <VCardText>
          <FileInputValidation />
        </VCardText>
        <CodeToggler :code="code.validator" />
      </VCard>
    </VCol>

    <!-- Slot -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Slot">
        <VCardText>
          <FileInputSlot />
        </VCardText>
        <CodeToggler :code="code.slot" />
      </VCard>
    </VCol>
  </VRow>
</template>

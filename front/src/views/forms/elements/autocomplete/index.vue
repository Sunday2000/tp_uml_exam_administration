<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import AutocompleteAsynchronousItems from './AutocompleteAsynchronousItems.vue'
import AutocompleteChips from './AutocompleteChips.vue'
import AutocompleteMultiple from './AutocompleteMultiple.vue'
import AutocompleteSelectFirst from './AutocompleteSelectFirst.vue'
import AutocompleteSlot from './AutocompleteSlot.vue'
import AutocompleteVariant from './AutocompleteVariant.vue'
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
    title: 'Autocompletes',
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
          href="https://vuetifyjs.com/en/components/autocompletes/"
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
          <AutocompleteVariant />
        </VCardText>
        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>

    <!-- Multiple -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Multiple">
        <VCardText>
          <AutocompleteMultiple />
        </VCardText>
        <CodeToggler :code="code.multiple" />
      </VCard>
    </VCol>

    <!-- Chips -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Chips">
        <VCardText>
          <AutocompleteChips />
        </VCardText>
        <CodeToggler :code="code.chips" />
      </VCard>
    </VCol>

    <!-- Slot -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Slot">
        <VCardText>
          <AutocompleteSlot />
        </VCardText>
        <CodeToggler :code="code.slot" />
      </VCard>
    </VCol>

    <!-- Asynchronous Item -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Asynchronous Item">
        <VCardText>
          <AutocompleteAsynchronousItems />
        </VCardText>
        <CodeToggler :code="code.asynchronousItems" />
      </VCard>
    </VCol>

    <!-- Select First -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Select First">
        <VCardText>
          <AutocompleteSelectFirst />
        </VCardText>
        <CodeToggler :code="code.selectFirst" />
      </VCard>
    </VCol>
  </VRow>
</template>

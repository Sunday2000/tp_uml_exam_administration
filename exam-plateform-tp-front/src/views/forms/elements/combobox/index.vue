<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import ComboboxChips from './ComboboxChips.vue'
import ComboboxDensity from './ComboboxDensity.vue'
import ComboboxMultiple from './ComboboxMultiple.vue'
import ComboboxSlot from './ComboboxSlot.vue'
import ComboboxVariant from './ComboboxVariant.vue'
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
    title: 'Combobox',
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
          href="https://vuetifyjs.com/en/components/combobox/"
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
          <ComboboxVariant />
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
          <ComboboxMultiple />
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
          <ComboboxChips />
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
          <ComboboxSlot />
        </VCardText>
        <CodeToggler :code="code.slot" />
      </VCard>
    </VCol>

    <!-- Density -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Density">
        <VCardText>
          <ComboboxDensity />
        </VCardText>
        <CodeToggler :code="code.density" />
      </VCard>
    </VCol>
  </VRow>
</template>

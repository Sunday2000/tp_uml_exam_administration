<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import SelectChips from './SelectChips.vue'
import SelectMultiple from './SelectMultiple.vue'
import SelectSelection from './SelectSelection.vue'
import SelectTitleValue from './SelectTitleValue.vue'
import SelectVariant from './SelectVariant.vue'
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
          href="https://vuetifyjs.com/en/components/selects/"
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
          <SelectVariant />
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
          <SelectMultiple />
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
          <SelectChips />
        </VCardText>
        <CodeToggler :code="code.chips" />
      </VCard>
    </VCol>

    <!-- Title and Value -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Custom Title and Value">
        <VCardText>
          <SelectTitleValue />
        </VCardText>
        <CodeToggler :code="code.titleValue" />
      </VCard>
    </VCol>

    <!-- Selection -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Selection">
        <VCardText>
          <SelectSelection />
        </VCardText>
        <CodeToggler :code="code.selection" />
      </VCard>
    </VCol>
  </VRow>
</template>

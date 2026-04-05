<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import RadioColor from './RadioColor.vue'
import RadioCustom from './RadioCustom.vue'
import RadioDirection from './RadioDirection.vue'
import RadioLabel from './RadioLabel.vue'
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
    title: 'Radio',
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
          href="https://vuetifyjs.com/en/components/radio-buttons/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Color -->
    <VCol cols="12">
      <VCard title="Color">
        <VCardText>
          <RadioColor />
        </VCardText>
        <CodeToggler :code="code.color" />
      </VCard>
    </VCol>

    <!-- Direction -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Direction">
        <VCardText>
          <RadioDirection />
        </VCardText>
        <CodeToggler :code="code.direction" />
      </VCard>
    </VCol>

    <!-- Label -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Label">
        <VCardText>
          <RadioLabel />
        </VCardText>
        <CodeToggler :code="code.label" />
      </VCard>
    </VCol>

    <!-- Custom -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Custom">
        <VCardText>
          <RadioCustom />
        </VCardText>
        <CodeToggler :code="code.custom" />
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import TooltipLocation from './TooltipLocation.vue'
import TooltipVisibility from './TooltipVisibility.vue'
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
    title: 'Tooltip',
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
          href="https://vuetifyjs.com/en/components/tooltips/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Tooltip Location -->
    <VCol cols="12">
      <VCard title="Location">
        <VCardText>
          <TooltipLocation />
        </VCardText>
        <CodeToggler :code="code.location" />
      </VCard>
    </VCol>

    <!-- Tooltip Visibility -->
    <VCol cols="12">
      <VCard title="Visibility">
        <VCardText>
          <TooltipVisibility />
        </VCardText>
        <CodeToggler :code="code.visibility" />
      </VCard>
    </VCol>
  </VRow>
</template>

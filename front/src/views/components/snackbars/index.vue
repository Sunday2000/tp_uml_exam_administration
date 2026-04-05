<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import SnackbarsBasic from './SnackbarsBasic.vue'
import SnackbarsMultiLine from './SnackbarsMultiLine.vue'
import SnackbarsTimeout from './SnackbarsTimeout.vue'
import SnackbarsVariant from './SnackbarsVariant.vue'
import SnackbarsVertical from './SnackbarsVertical.vue'
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
    title: 'Snackbars',
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
          href="https://vuetifyjs.com/en/components/snackbars/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Basic -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Basic">
        <VCardText>
          <SnackbarsBasic />
        </VCardText>
        <CodeToggler :code="code.basic" />
      </VCard>
    </VCol>

    <!-- Multi-line -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Multi line">
        <VCardText>
          <SnackbarsMultiLine />
        </VCardText>
        <CodeToggler :code="code.multiLine" />
      </VCard>
    </VCol>

    <!-- Timeout -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Timeout">
        <VCardText>
          <SnackbarsTimeout />
        </VCardText>
        <CodeToggler :code="code.timeout" />
      </VCard>
    </VCol>

    <!-- Variant -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Variant">
        <VCardText>
          <SnackbarsVariant />
        </VCardText>
        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>

    <!-- Vertical -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Vertical">
        <VCardText>
          <SnackbarsVertical />
        </VCardText>
        <CodeToggler :code="code.vertical" />
      </VCard>
    </VCol>
  </VRow>
</template>

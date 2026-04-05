<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import PaginationIcon from './PaginationIcon.vue'
import PaginationLength from './PaginationLength.vue'
import PaginationRounded from './PaginationRounded.vue'
import PaginationSize from './PaginationSize.vue'
import PaginationTotalVisible from './PaginationTotalVisible.vue'
import PaginationVariant from './PaginationVariant.vue'
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
    title: 'Pagination',
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
          href="https://vuetifyjs.com/en/components/paginations"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Rounded -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Rounded">
        <VCardText>
          <PaginationRounded />
        </VCardText>
        <CodeToggler :code="code.rounded" />
      </VCard>
    </VCol>

    <!-- Icons -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Icons">
        <VCardText>
          <PaginationIcon />
        </VCardText>
        <CodeToggler :code="code.icon" />
      </VCard>
    </VCol>

    <!-- Length -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Length">
        <VCardText>
          <PaginationLength />
        </VCardText>
        <CodeToggler :code="code.length" />
      </VCard>
    </VCol>

    <!-- Total visible -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Total Visible">
        <VCardText>
          <PaginationTotalVisible />
        </VCardText>
        <CodeToggler :code="code.totalVisible" />
      </VCard>
    </VCol>

    <!-- Variant -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Variant">
        <VCardText>
          <PaginationVariant />
        </VCardText>
        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>

    <!-- size -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Size">
        <VCardText>
          <PaginationSize />
        </VCardText>
        <CodeToggler :code="code.size" />
      </VCard>
    </VCol>
  </VRow>
</template>

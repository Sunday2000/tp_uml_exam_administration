<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import BreadcrumbsColor from './BreadcrumbsColor.vue'
import BreadcrumbsDivider from './BreadcrumbsDivider.vue'
import BreadcrumbsPrepend from './BreadcrumbsPrepend.vue'
import BreadcrumbsTitle from './BreadcrumbsTitle.vue'
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
    title: 'Breadcrumbs',
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
          href="https://vuetifyjs.com/en/components/breadcrumbs/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Bg Color -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Bg Color">
        <VCardText>
          <BreadcrumbsColor />
        </VCardText>

        <CodeToggler :code="code.bgColor" />
      </VCard>
    </VCol>

    <!-- Prepend -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Prepend">
        <VCardText>
          <BreadcrumbsPrepend />
        </VCardText>

        <CodeToggler :code="code.prepend" />
      </VCard>
    </VCol>

    <!-- Divider -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Divider">
        <VCardText>
          <BreadcrumbsDivider />
        </VCardText>

        <CodeToggler :code="code.divider" />
      </VCard>
    </VCol>

    <!-- Title -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Title Slot">
        <VCardText>
          <BreadcrumbsTitle />
        </VCardText>

        <CodeToggler :code="code.titleSlot" />
      </VCard>
    </VCol>
  </VRow>
</template>

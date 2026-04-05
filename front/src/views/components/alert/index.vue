<script lang="ts" setup>
import CodeToggler from '@/components/CodeToggler.vue'
import AlertColor from './AlertColor.vue'
import AlertColorBorder from './AlertColorBorder.vue'
import AlertIcon from './AlertIcon.vue'
import AlertOutlined from './AlertOutlined.vue'
import AlertTypes from './AlertTypes.vue'
import AlertVariant from './AlertVariant.vue'
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
    title: 'Alert',
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
          href="https://vuetifyjs.com/en/api/v-alert/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Colors -->
    <VCol cols="12">
      <VCard title="Colors">
        <VCardText>
          <AlertColor />
        </VCardText>

        <CodeToggler :code="code.color" />
      </VCard>
    </VCol>

    <!-- Types -->
    <VCol cols="12">
      <VCard title="Types">
        <VCardText>
          <AlertTypes />
        </VCardText>
        <CodeToggler :code="code.types" />
      </VCard>
    </VCol>

    <!-- Icon -->
    <VCol cols="12">
      <VCard title="Icon">
        <VCardText>
          <AlertIcon />
        </VCardText>
        <CodeToggler :code="code.icon" />
      </VCard>
    </VCol>

    <!-- Outlined -->
    <VCol cols="12">
      <VCard title="Outlined">
        <VCardText>
          <AlertOutlined />
        </VCardText>
        <CodeToggler :code="code.outlined" />
      </VCard>
    </VCol>

    <!-- Color Border -->
    <VCol cols="12">
      <VCard title="Color Border">
        <VCardText>
          <AlertColorBorder />
        </VCardText>

        <CodeToggler :code="code.colorBorder" />
      </VCard>
    </VCol>

    <!-- Variants -->
    <VCol cols="12">
      <VCard title="Variants">
        <VCardText>
          <AlertVariant />
        </VCardText>

        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>
  </VRow>
</template>

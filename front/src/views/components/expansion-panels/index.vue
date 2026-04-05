<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import ExpansionPanelBasic from './ExpansionPanelBasic.vue'
import ExpansionPanelDisabled from './ExpansionPanelDisabled.vue'
import ExpansionPanelVModel from './ExpansionPanelVModel.vue'
import ExpansionPanelVariant from './ExpansionPanelVariant.vue'
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
    title: 'Expansion Panels',
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
        class="pa-0 text-truncate"
      />

      <div>
        <ApiBtn
          href="https://vuetifyjs.com/en/components/expansion-panels/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <VCol cols="12">
      <VCard title="Basic">
        <VCardText>
          <ExpansionPanelBasic />
        </VCardText>
        <CodeToggler :code="code.basic" />
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Variant">
        <VCardText>
          <ExpansionPanelVariant />
        </VCardText>
        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Disabled">
        <VCardText>
          <ExpansionPanelDisabled />
        </VCardText>
        <CodeToggler :code="code.disabled" />
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="v-model">
        <VCardText>
          <ExpansionPanelVModel />
        </VCardText>
        <CodeToggler :code="code.vmodel" />
      </VCard>
    </VCol>
  </VRow>
</template>

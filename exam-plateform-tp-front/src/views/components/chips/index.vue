<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import ChipsColor from './ChipsColor.vue'
import ChipsLabel from './ChipsLabel.vue'
import ChipsOutlined from './ChipsOutlined.vue'
import ChipsSizes from './ChipsSizes.vue'
import ChipsSlots from './ChipsSlots.vue'
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
    title: 'Chips',
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
          href="https://vuetifyjs.com/en/components/chips/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Color">
        <VCardText>
          <ChipsColor />
        </VCardText>

        <CodeToggler :code="code.colors" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Label">
        <VCardText>
          <ChipsLabel />
        </VCardText>

        <CodeToggler :code="code.label" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Outlined">
        <VCardText>
          <ChipsOutlined />
        </VCardText>

        <CodeToggler :code="code.outlined" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Sizes">
        <VCardText>
          <ChipsSizes />
        </VCardText>

        <CodeToggler :code="code.sizes" />
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="Slots">
        <VCardText>
          <ChipsSlots />
        </VCardText>

        <CodeToggler :code="code.slots" />
      </VCard>
    </VCol>
  </VRow>
</template>

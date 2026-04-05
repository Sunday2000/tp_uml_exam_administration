<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import TabsAlign from './TabsAlign.vue'
import TabsBasic from './TabsBasic.vue'
import TabsCenterActive from './TabsCenterActive.vue'
import TabsCustomIcon from './TabsCustomIcon.vue'
import TabsFixed from './TabsFixed.vue'
import TabsGrow from './TabsGrow.vue'
import TabsStacked from './TabsStacked.vue'
import TabsVertical from './TabsVertical.vue'
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
    title: 'Tabs',
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
          href="https://vuetifyjs.com/en/components/tabs"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!--  Basic -->
    <VCol cols="12">
      <VCard title="Basic">
        <TabsBasic />
        <CodeToggler :code="code.basic" />
      </VCard>
    </VCol>

    <!-- Align -->
    <VCol cols="12">
      <VCard title="Align">
        <TabsAlign />
        <CodeToggler :code="code.align" />
      </VCard>
    </VCol>

    <!-- Center Active -->
    <VCol cols="12">
      <VCard title="Center Active">
        <TabsCenterActive />
        <CodeToggler :code="code.centerActive" />
      </VCard>
    </VCol>

    <!-- Custom Icon -->
    <VCol cols="12">
      <VCard title="Custom Icon">
        <TabsCustomIcon />
        <CodeToggler :code="code.customIcon" />
      </VCard>
    </VCol>

    <!-- Fixed tabs -->
    <VCol cols="12">
      <VCard title="Fixed tabs">
        <TabsFixed />
        <CodeToggler :code="code.fixed" />
      </VCard>
    </VCol>

    <!-- Grow -->
    <VCol cols="12">
      <VCard title="Grow">
        <TabsGrow />
        <CodeToggler :code="code.grow" />
      </VCard>
    </VCol>

    <!-- Stacked -->
    <VCol cols="12">
      <VCard title="Stacked">
        <TabsStacked />
        <CodeToggler :code="code.stacked" />
      </VCard>
    </VCol>

    <!-- Vertical -->
    <VCol cols="12">
      <VCard title="Vertical">
        <TabsVertical />
        <CodeToggler :code="code.vertical" />
      </VCard>
    </VCol>
  </VRow>
</template>

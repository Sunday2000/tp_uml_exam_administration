<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import SlidersColors from './SlidersColors.vue'
import SlidersIcon from './SlidersIcon.vue'
import SlidersSteps from './SlidersSteps.vue'
import SlidersThumb from './SlidersThumb.vue'
import SlidersTicks from './SlidersTicks.vue'
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
    title: 'Sliders',
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
          href="https://vuetifyjs.com/en/components/sliders/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- colors -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Colors">
        <VCardText>
          <SlidersColors />
        </VCardText>
        <CodeToggler :code="code.colors" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Icon">
        <VCardText>
          <SlidersIcon />
        </VCardText>
        <CodeToggler :code="code.icon" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Thumb">
        <VCardText>
          <SlidersThumb />
        </VCardText>
        <CodeToggler :code="code.thumb" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Ticks">
        <VCardText>
          <SlidersTicks />
        </VCardText>
        <CodeToggler :code="code.ticks" />
      </VCard>
    </VCol>

    <!-- Steps -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Steps">
        <VCardText>
          <SlidersSteps />
        </VCardText>
        <CodeToggler :code="code.steps" />
      </VCard>
    </VCol>
  </VRow>
</template>

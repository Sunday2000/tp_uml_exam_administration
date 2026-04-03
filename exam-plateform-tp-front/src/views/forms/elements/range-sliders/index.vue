<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import RangeSliderDisabled from './RangeSliderDisabled.vue'
import RangeSliderMinMax from './RangeSliderMinMax.vue'
import RangeSliderSlot from './RangeSliderSlot.vue'
import RangeSliderStep from './RangeSliderStep.vue'
import RangeSliderStrict from './RangeSliderStrict.vue'
import RangeSliderVertical from './RangeSliderVertical.vue'
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
          href="https://vuetifyjs.com/en/components/range-sliders/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Strict -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Strict">
        <VCardText>
          <RangeSliderStrict />
        </VCardText>
        <CodeToggler :code="code.strict" />
      </VCard>
    </VCol>

    <!-- Disabled -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Disabled">
        <VCardText>
          <RangeSliderDisabled />
        </VCardText>
        <CodeToggler :code="code.disabled" />
      </VCard>
    </VCol>

    <!-- Min Max -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Min Max">
        <VCardText>
          <RangeSliderMinMax />
        </VCardText>
        <CodeToggler :code="code.miniMax" />
      </VCard>
    </VCol>

    <!-- Step -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Step">
        <VCardText>
          <RangeSliderStep />
        </VCardText>
        <CodeToggler :code="code.step" />
      </VCard>
    </VCol>

    <!-- Slot -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Slot">
        <VCardText>
          <RangeSliderSlot />
        </VCardText>
        <CodeToggler :code="code.slot" />
      </VCard>
    </VCol>

    <!-- Vertical -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Vertical">
        <VCardText>
          <RangeSliderVertical />
        </VCardText>
        <CodeToggler :code="code.vertical" />
      </VCard>
    </VCol>
  </VRow>
</template>

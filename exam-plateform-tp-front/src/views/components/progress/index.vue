<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import ProgressColor from './ProgressColor.vue'
import ProgressIndeterminate from './ProgressIndeterminate.vue'
import ProgressLinearColor from './ProgressLinearColor.vue'
import ProgressLinearIndeterminate from './ProgressLinearIndeterminate .vue'
import ProgressLinearRounded from './ProgressLinearRounded.vue'
import ProgressLinearSlot from './ProgressLinearSlot.vue'
import ProgressLinearStriped from './ProgressLinearStriped.vue'
import ProgressRotate from './ProgressRotate.vue'
import ProgressSizeWidth from './ProgressSizeWidth.vue'
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
    title: 'Progress',
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
          href="https://vuetifyjs.com/en/components/progress-circular/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Circle Color -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Color">
        <VCardText>
          <ProgressColor />
        </VCardText>
        <CodeToggler :code="code.color" />
      </VCard>
    </VCol>

    <!-- Indeterminate -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Indeterminate">
        <VCardText>
          <ProgressIndeterminate />
        </VCardText>
        <CodeToggler :code="code.indeterminate" />
      </VCard>
    </VCol>

    <!-- Rotate -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Rotate">
        <VCardText>
          <ProgressRotate />
        </VCardText>
        <CodeToggler :code="code.rotate" />
      </VCard>
    </VCol>

    <!-- Size and Width -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Size and Width">
        <VCardText>
          <ProgressSizeWidth />
        </VCardText>
        <CodeToggler :code="code.sizeWidth" />
      </VCard>
    </VCol>

    <!-- Linear Colors -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Linear Color">
        <VCardText>
          <ProgressLinearColor />
        </VCardText>
        <CodeToggler :code="code.linearColor" />
      </VCard>
    </VCol>

    <!-- Linear Indeterminate  -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Linear Indeterminate ">
        <VCardText>
          <ProgressLinearIndeterminate />
        </VCardText>
        <CodeToggler :code="code.indeterminate" />
      </VCard>
    </VCol>

    <!-- Linear Rounded  -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Linear Rounded ">
        <VCardText>
          <ProgressLinearRounded />
        </VCardText>
        <CodeToggler :code="code.linearRounded" />
      </VCard>
    </VCol>

    <!-- Linear Rounded  -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Linear Striped">
        <VCardText>
          <ProgressLinearStriped />
        </VCardText>
        <CodeToggler :code="code.linearStriped" />
      </VCard>
    </VCol>

    <!-- Linear Slot  -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Linear Slot">
        <VCardText>
          <ProgressLinearSlot />
        </VCardText>
        <CodeToggler :code="code.linearSlot" />
      </VCard>
    </VCol>
  </VRow>
</template>

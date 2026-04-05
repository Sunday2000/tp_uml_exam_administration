<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import TimelineAlignment from './TimelineAlignment.vue'
import TimelineDirection from './TimelineDirection.vue'
import TimelineDotsIcon from './TimelineDotsIcon.vue'
import TimelineSide from './TimelineSide.vue'
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
    title: 'Timeline',
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
          href="https://vuetifyjs.com/en/components/timelines/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Direction -->
    <VCol cols="12">
      <VCard title="Direction">
        <VCardText>
          <TimelineDirection />
        </VCardText>
        <CodeToggler :code="code.direction" />
      </VCard>
    </VCol>

    <!-- Side -->
    <VCol cols="12">
      <VCard title="Side">
        <VCardText>
          <TimelineSide />
        </VCardText>
        <CodeToggler :code="code.side" />
      </VCard>
    </VCol>

    <!-- Alignment -->
    <VCol cols="12">
      <VCard title="Alignment">
        <VCardText>
          <TimelineAlignment />
        </VCardText>
        <CodeToggler :code="code.alignment" />
      </VCard>
    </VCol>

    <!-- Dots Icon -->
    <VCol cols="12">
      <VCard title="Dots Icon">
        <VCardText>
          <TimelineDotsIcon />
        </VCardText>
        <CodeToggler :code="code.dotsIcon" />
      </VCard>
    </VCol>
  </VRow>
</template>

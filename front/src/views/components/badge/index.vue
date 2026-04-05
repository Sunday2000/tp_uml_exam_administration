<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import BadgeColors from './BadgeColors.vue'
import BadgeIcon from './BadgeIcon.vue'
import BadgePosition from './BadgePosition.vue'
import BadgeStyle from './BadgeStyle.vue'
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
    title: 'Badge',
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
          href="https://vuetifyjs.com/en/api/v-badge/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Colors -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Colors">
        <VCardText>
          <BadgeColors />
        </VCardText>
        <CodeToggler :code="code.colors" />
      </VCard>
    </VCol>

    <!-- Style -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Style">
        <VCardText>
          <BadgeStyle />
        </VCardText>
        <CodeToggler :code="code.style" />
      </VCard>
    </VCol>

    <!-- Position -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Position">
        <VCardText>
          <BadgePosition />
        </VCardText>
        <CodeToggler :code="code.position" />
      </VCard>
    </VCol>

    <!-- Icon -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Icon">
        <VCardText>
          <BadgeIcon />
        </VCardText>
        <CodeToggler :code="code.icon" />
      </VCard>
    </VCol>
  </VRow>
</template>

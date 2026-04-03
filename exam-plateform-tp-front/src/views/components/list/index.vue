<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import ListBasic from './ListBasic.vue'
import ListDensity from './ListDensity.vue'
import ListDisabled from './ListDisabled.vue'
import ListMisc from './ListMisc.vue'
import ListNav from './ListNav.vue'
import ListRounded from './ListRounded.vue'
import ListShaped from './ListShaped.vue'
import ListSubGroup from './ListSubGroup.vue'
import ListThreeLine from './ListThreeLine.vue'
import ListTwoLineSubheader from './ListTwoLineSubheader.vue'
import ListVariant from './ListVariant.vue'
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
    title: 'List',
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
          href="https://vuetifyjs.com/en/components/lists"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- basic -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Basic">
        <ListBasic />
        <CodeToggler :code="code.basic" />
      </VCard>
    </VCol>

    <!-- Variant -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Variant">
        <ListVariant />
        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>

    <!-- Density -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Density">
        <ListDensity />
        <CodeToggler :code="code.density" />
      </VCard>
    </VCol>

    <!-- Disabled -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Disabled">
        <ListDisabled />
        <CodeToggler :code="code.disabled" />
      </VCard>
    </VCol>

    <!-- Rounded -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Rounded">
        <ListRounded />
        <CodeToggler :code="code.rounded" />
      </VCard>
    </VCol>

    <!-- Shaped -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Shaped">
        <ListShaped />
        <CodeToggler :code="code.shaped" />
      </VCard>
    </VCol>

    <!-- Nav -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Nav">
        <ListNav />
        <CodeToggler :code="code.nav" />
      </VCard>
    </VCol>

    <!-- Sub group -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Sub group">
        <ListSubGroup />
        <CodeToggler :code="code.subGrouped" />
      </VCard>
    </VCol>

    <!-- Three Line -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Three Line">
        <ListThreeLine />
        <CodeToggler :code="code.threeLine" />
      </VCard>
    </VCol>

    <!-- Two Line Subheader -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Two lines and Subheader">
        <ListTwoLineSubheader />
        <CodeToggler :code="code.twoLineSubheader" />
      </VCard>
    </VCol>

    <!-- Misc -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Misc">
        <ListMisc />
        <CodeToggler :code="code.misc" />
      </VCard>
    </VCol>
  </VRow>
</template>

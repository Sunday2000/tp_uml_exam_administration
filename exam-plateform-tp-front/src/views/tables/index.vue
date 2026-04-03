<script setup lang="ts">
import TablesBasic from './TablesBasic.vue'
import TablesDensity from './TablesDensity.vue'
import TablesFixedHeader from './TablesFixedHeader.vue'
import TablesHeight from './TablesHeight.vue'
import TablesTheme from './TablesTheme.vue'

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Tables',
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
          href="https://vuetifyjs.com/en/components/tables/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Basic -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Basic">
        <VCardText>
          <TablesBasic />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Theme -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Theme">
        <VCardText>
          <TablesTheme />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Density -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Density">
        <VCardText>
          <TablesDensity />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Height -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Height">
        <VCardText>
          <TablesHeight />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Fixed Header -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Fixed Header">
        <VCardText>
          <TablesFixedHeader />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

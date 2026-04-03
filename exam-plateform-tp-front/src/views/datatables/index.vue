<script setup lang="ts">
import DatatableItemSlot from './DatatableItemSlot.vue'
import DatatablesBasic from './DatatablesBasic.vue'
import DatatablesCrud from './DatatablesCrud.vue'
import DatatablesSelection from './DatatablesSelection.vue'
import DatatablesServer from './DatatablesServer.vue'
import DatatablesVirtual from './DatatablesVirtual.vue'

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Datatables',
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
          href="https://vuetifyjs.com/en/components/data-tables/basics/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Basic -->
    <VCol cols="12">
      <VCard title="Basic">
        <DatatablesBasic />
      </VCard>
    </VCol>

    <!-- Server -->
    <VCol cols="12">
      <VCard title="Server">
        <DatatablesServer />
      </VCard>
    </VCol>

    <!-- Virtual -->
    <VCol cols="12">
      <VCard title="Virtual">
        <VCardText>
          <DatatablesVirtual />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Selection -->
    <VCol cols="12">
      <VCard title="Selection">
        <DatatablesSelection />
      </VCard>
    </VCol>

    <!-- Item Slot -->
    <VCol cols="12">
      <VCard title="Item Slot">
        <DatatableItemSlot />
      </VCard>
    </VCol>

    <!-- Crud -->
    <VCol cols="12">
      <VCard>
        <DatatablesCrud />
      </VCard>
    </VCol>
  </VRow>
</template>

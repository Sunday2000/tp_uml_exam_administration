<script setup lang="ts">
import SortableClone from './SortableClone.vue'
import SortableHandler from './SortableHandler.vue'
import SortableShared from './SortableShared.vue'
import SortableSiple from './SortableSimple.vue'

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Extensions',
    disabled: false,
  },
  {
    title: 'Sortable',
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
          href="https://vueuse.org/integrations/useSortable/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Simple -->
    <VCol cols="12">
      <VCard title="Simple">
        <VCardText>
          <SortableSiple />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Shared -->
    <VCol cols="12">
      <VCard title="Shared">
        <VCardText>
          <SortableShared />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Clone -->
    <VCol cols="12">
      <VCard title="Clone">
        <VCardText>
          <SortableClone />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Handle -->
    <VCol cols="12">
      <VCard title="Handler">
        <VCardText>
          <SortableHandler />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

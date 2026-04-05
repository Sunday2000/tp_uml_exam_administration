<script setup lang="ts">
import DropzoneAccept from './DropzoneAccept.vue'
import DropzoneSimple from './DropzoneSimple.vue'
import DropzoneSingle from './DropzoneSingle.vue'

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
    title: 'Drop zone',
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
          href="https://vueuse.org/core/useDropZone/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Simple -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Simple">
        <VCardText>
          <DropzoneSimple />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Accept -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Accept">
        <VCardText>
          <DropzoneAccept />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Single -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Single">
        <VCardText>
          <DropzoneSingle />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

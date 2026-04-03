<script setup lang="ts">
import ToastifyPosition from './ToastifyPosition.vue'
import ToastifyTransition from './ToastifyTransition.vue'
import ToastifyType from './ToastifyType.vue'
import ToastifyVariation from './ToastifyVariation.vue'

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
    title: 'Toastify',
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
          href="https://github.com/jerrywu001/vue3-toastify"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Variations -->
    <VCol cols="12">
      <VCard title="Variant">
        <VCardText>
          <ToastifyVariation />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Type -->
    <VCol cols="12">
      <VCard title="Type">
        <VCardText>
          <ToastifyType />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Position -->
    <VCol cols="12">
      <VCard title="Position">
        <VCardText>
          <ToastifyPosition />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Transition -->
    <VCol cols="12">
      <VCard title="Transition">
        <VCardText>
          <ToastifyTransition />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

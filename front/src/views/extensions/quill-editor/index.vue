<script setup lang="ts">
import QuillBubble from './quill-bubble.vue'
import QuillSnow from './quill-snow.vue'

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
    title: 'Quill Editor',
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
          href="https://github.com/vueup/vue-quill"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <VCol cols="12">
      <VCard
        title="Snow"
        style="overflow: visible;"
      >
        <VCardText>
          <QuillSnow />
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard
        title="Bubble"
        style="overflow: visible;"
      >
        <VCardText>
          <QuillBubble />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

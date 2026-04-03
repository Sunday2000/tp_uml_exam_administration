<script setup lang="ts">
import MasonryGallery from './MasonryGallery.vue'
import MasonryReview from './MasonryReview.vue'

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
    title: 'Masonry Wall',
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
          href="https://vue-masonry-wall.yeger.eu/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <VCol cols="12">
      <h4 class="text-h4 mb-4">
        Gallery
      </h4>

      <MasonryGallery />
    </VCol>

    <VCol cols="12">
      <VDivider class="mb-6 mt-8" />
    </VCol>

    <VCol cols="12">
      <h4 class="text-h4 mb-4">
        Review
      </h4>

      <MasonryReview />
    </VCol>
  </VRow>
</template>

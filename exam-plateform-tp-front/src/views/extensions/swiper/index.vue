<script setup lang="ts">
import SwiperBasic from './SwiperBasic.vue'
import SwiperCube from './SwiperCube.vue'
import SwiperGallery from './SwiperGallery.vue'
import SwiperNavigation from './SwiperNavigation.vue'
import SwiperPagination from './SwiperPagination.vue'
import SwiperProgress from './SwiperProgress.vue'

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
    title: 'Swiper',
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
          href="https://swiperjs.com/element#installation"
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
      <VCard title="Basic">
        <VCardText>
          <SwiperBasic />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Cube -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Cube">
        <VCardText>
          <SwiperCube />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Navigation -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Navigation">
        <VCardText>
          <SwiperNavigation />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Pagination -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Pagination">
        <VCardText>
          <SwiperPagination />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Gallery -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Gallery">
        <VCardText>
          <SwiperGallery />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Progress -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Progress">
        <VCardText>
          <SwiperProgress />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@/styles/libs/swiper";
</style>

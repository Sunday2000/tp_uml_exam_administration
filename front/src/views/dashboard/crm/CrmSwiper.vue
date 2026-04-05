<script setup lang="ts">
import { register } from 'swiper/element/bundle'

register()

const refCrmStatisticsSwiper = ref()

const navigate = (dir: string) => {
  const swiper = refCrmStatisticsSwiper?.value?.swiper

  if (dir === 'prev')
    swiper.slidePrev()

  swiper.slideNext()
}

const statistics = [
  {
    title: 'Total JObs',
    value: '36,894',
    percentage: 95,
    color: 'primary',
    icon: 'mdi-briefcase-account-outline',
  },
  {
    title: 'APPLY JOBS',
    value: '28,410',
    percentage: 90,
    color: 'success',
    icon: 'mdi-check',
  },
  {
    title: 'New Jobs',
    value: '8,410',
    percentage: 80,
    color: 'warning',
    icon: 'mdi-briefcase-plus-outline',
  },
  {
    title: 'Interview',
    value: '5,021',
    percentage: 89,
    color: 'info',
    icon: 'mdi-account-group-outline',
  },
  {
    title: 'Hired',
    value: '1,410',
    percentage: 75,
    color: 'success',
    icon: 'mdi-account-check-outline',
  },
  {
    title: 'Rejected',
    value: '1,810',
    percentage: 45,
    color: 'error',
    icon: 'mdi-account-remove-outline',
  },
]
</script>

<template>
  <VCard
    flat
    title="Statistics"
    variant="text"
  >
    <template #append>
      <VBtn
        icon
        size="x-small"
        class="rounded me-3"
        variant="tonal"
        @click="navigate('prev')"
      >
        <VIcon
          size="22"
          icon="mdi-chevron-left"
        />
      </VBtn>
      <VBtn
        icon
        size="x-small"
        class="rounded"
        variant="tonal"
        @click="navigate('next')"
      >
        <VIcon
          size="22"
          icon="mdi-chevron-right"
        />
      </VBtn>
    </template>
    <swiper-container
      ref="refCrmStatisticsSwiper"
      events-prefix="swiper-"
      loop="true"
      slides-per-view="1"
      space-between="5"
      autoplay-delay="3000"
      autoplay-disable-on-interaction="false"
      :breakpoints="{
        1280: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        800: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      }"
    >
      <swiper-slide
        v-for="stats in statistics"
        :key="stats.title"
      >
        <VCard class="ma-2 pa-n2">
          <VCardText class="d-flex align-center justify-space-between">
            <div>
              <VAvatar
                :color="stats.color"
                variant="tonal"
                class="mb-4"
              >
                <VIcon :icon="stats.icon" />
              </VAvatar>
              <p class="text-uppercase font-weight-medium">
                {{ stats.title }}
              </p>
              <h6 class="text-h5">
                {{ stats.value }}
              </h6>
            </div>
            <div>
              <VProgressCircular
                :size="100"
                :width="7"
                :model-value="stats.percentage"
                :color="stats.color"
              >
                <span class="font-weight-bold text-lg">{{ stats.percentage }}%</span>
              </VProgressCircular>
            </div>
          </VCardText>
        </VCard>
      </swiper-slide>
    </swiper-container>
  </VCard>
</template>

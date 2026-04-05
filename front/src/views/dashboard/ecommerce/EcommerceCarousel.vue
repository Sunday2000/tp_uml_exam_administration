<script setup lang="ts">
import dock from '@/assets/pages/docks.jpg'
import hotel from '@/assets/pages/hotel.jpg'
import sunset from '@/assets/pages/sunset.jpg'
import sunshine from '@/assets/pages/sunshine.jpg'

import { register } from 'swiper/element/bundle'

const carousel = [
  {
    title: 'Beyond the Looking Glass',
    text: 'Exploring Illusions of Fantasy',
    img: sunset,
  },
  {
    title: 'Enchanting Adventures',
    text: 'Unveiling the Mysteries of Imaginary Worlds  ',
    img: dock,
  },
  {
    title: 'Timeless Tales',
    text: 'A Whimsical Journey Through Fictitious Realms',
    img: hotel,
  },
  {
    title: 'Wondrous Whirlwind',
    text: 'A Delightful Spin through Fictional Realities',
    img: sunshine,
  },
]

register()
</script>

<template>
  <swiper-container
    class="mySwiper"
    pagination="true"
    space-between="30"
    centered-slides="true"
    autoplay-delay="2500"
    loop="true"
    autoplay-disable-on-interaction="false"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="item in carousel"
      :key="item.title"
    >
      <VCard>
        <VImg
          :src="item.img"
          height="217"
          cover
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <VCardItem>
            <VCardTitle class="text-center text-white font-weight-bold">
              {{ item.title }}
            </VCardTitle>
            <VCardSubtitle
              class="text-center text-white font-weight-bold"
              style="opacity: 1;"
            >
              {{ item.text }}
            </VCardSubtitle>
          </VCardItem>

          <VCardText class="text-white text-center text-base">
            Corporis quisquam accusantium exercitationem eligendi dolores rerum possimus eos. Id animi vero eos eligendi omnis minus.
          </VCardText>
        </VImg>
      </VCard>
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss">
@use "@/styles/libs/swiper";
</style>

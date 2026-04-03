<script setup lang="ts">
import { register } from 'swiper/element/bundle'

import swiper1 from '@/assets/swiper/colorful-heart.jpg'
import swiper3 from '@/assets/swiper/colorful-wallpaper.jpg'
import swiper2 from '@/assets/swiper/exploding-burger.jpg'
import swiper4 from '@/assets/swiper/fruit-is-word-fruit.jpg'
import swiper5 from '@/assets/swiper/single-tree.jpg'

register()
</script>

<template>
  <swiper-container
    class="mySwiper"
    pagination="true"
    navigation="true"
    space-between="30"
    centered-slides="true"
    autoplay-delay="2500"
    autoplay-disable-on-interaction="false"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper3,
        swiper1,
        swiper2,
        swiper4,
        swiper5,
      ]"
      :key="swiperImg"
    >
      <VImg
        :src="swiperImg"
        height="300"
        cover
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      />
    </swiper-slide>
  </swiper-container>
</template>

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
    thumbs-swiper=".mySwiper2"
    loop="true"
    space-between="10"
    navigation="true"
    centered-slides="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper4,
        swiper1,
        swiper2,
        swiper3,
        swiper5,

      ]"
      :key="swiperImg"
    >
      <VImg
        :src="swiperImg"
        cover
        height="300"
      />
    </swiper-slide>
  </swiper-container>

  <swiper-container
    class="mySwiper2"
    loop="true"
    free-mode="true"
    events-prefix="swiper-"
    slides-per-view="4"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper4,
        swiper1,
        swiper2,
        swiper3,
        swiper5,
      ]"
      :key="swiperImg"
    >
      <VImg
        :src="swiperImg"
        height="70"
        cover
      />
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss" scoped>
swiper-container {
  background-color: #232121;
}

.mySwiper2 {
  swiper-slide {
    block-size: 100%;
    inline-size: 25%;
    opacity: 0.4;
    padding-block: 0.5rem;
    padding-inline: 0.25rem;
  }

  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>

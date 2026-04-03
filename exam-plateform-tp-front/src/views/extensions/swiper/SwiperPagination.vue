<script setup lang="ts">
import swiper1 from '@/assets/swiper/colorful-heart.jpg'
import swiper3 from '@/assets/swiper/colorful-wallpaper.jpg'
import swiper2 from '@/assets/swiper/exploding-burger.jpg'
import swiper4 from '@/assets/swiper/fruit-is-word-fruit.jpg'
import swiper5 from '@/assets/swiper/single-tree.jpg'
import { register } from 'swiper/element/bundle'

register()
</script>

<template>
  <swiper-container
    pagination="true"
    events-prefix="swiper-"
  >
    <swiper-slide
      v-for="swiperImg in [
        swiper5,
        swiper1,
        swiper2,
        swiper4,
        swiper3,
      ]"
      :key="swiperImg"
    >
      <VImg
        :src="swiperImg"
        height="300"
        cover
      />
    </swiper-slide>
  </swiper-container>
</template>

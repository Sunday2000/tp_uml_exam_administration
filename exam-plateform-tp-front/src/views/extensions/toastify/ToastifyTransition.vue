<script setup lang="ts">
import type { ToastTransition } from 'vue3-toastify'
import { toast } from 'vue3-toastify'
import { useRtl } from 'vuetify'

const rtl = useRtl()

const toastTransition = (value: ToastTransition) => {
  toast(`${value} position`, {
    transition: value,
    rtl: rtl.isRtl.value,
  })
}
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VBtn
      variant="text"
      color="primary"
      @click="toastTransition('bounce')"
    >
      Bounce
    </VBtn>

    <VBtn
      variant="text"
      color="info"
      @click="toastTransition('flip')"
    >
      Flip
    </VBtn>

    <VBtn
      variant="text"
      color="success"
      @click="toastTransition('slide')"
    >
      Slide
    </VBtn>

    <VBtn
      variant="text"
      color="warning"
      @click="toastTransition('zoom')"
    >
      Zoom
    </VBtn>
  </div>
</template>

<style lang="scss">
@import "vue3-toastify/dist/index.css";
@import "@/styles/libs/toastify";
</style>

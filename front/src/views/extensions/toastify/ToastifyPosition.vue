<script setup lang="ts">
import type { ToastPosition } from 'vue3-toastify'
import { toast } from 'vue3-toastify'
import { useRtl } from 'vuetify'

const rtl = useRtl()

const toastPosition = (value: ToastPosition) => {
  toast(`${value} position`, {
    position: value,
    rtl: rtl.isRtl.value,
  })
}
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VBtn
      variant="outlined"
      color="primary"
      @click="toastPosition('top-left')"
    >
      top-left
    </VBtn>

    <VBtn
      variant="outlined"
      color="info"
      @click="toastPosition('top-center')"
    >
      top-center
    </VBtn>

    <VBtn
      variant="outlined"
      color="success"
      @click="toastPosition('top-right')"
    >
      top-right
    </VBtn>

    <VBtn
      variant="outlined"
      color="warning"
      @click="toastPosition('bottom-right')"
    >
      bottom-right
    </VBtn>

    <VBtn
      variant="outlined"
      color="error"
      @click="toastPosition('bottom-center')"
    >
      bottom-center
    </VBtn>

    <VBtn
      variant="outlined"
      color="secondary"
      @click="toastPosition('bottom-left')"
    >
      bottom-left
    </VBtn>
  </div>
</template>

<style lang="scss">
@import "vue3-toastify/dist/index.css";
@import "@/styles/libs/toastify";
</style>

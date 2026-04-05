<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useRtl } from 'vuetify'

const rtl = useRtl()

const toastTypeDefault = () => {
  toast('Default Type', {
    rtl: rtl.isRtl.value,
  })
}

const toastTypeInfo = () => {
  toast('Info Type', {
    type: 'info',
    rtl: rtl.isRtl.value,
  })
}

const toastTypeSuccess = () => {
  toast('Success Type', {
    rtl: rtl.isRtl.value,
    type: 'success',
  })
}

const toastTypeWarning = () => {
  toast('Warning Type', {
    rtl: rtl.isRtl.value,
    type: 'warning',
  })
}

const toastTypeError = () => {
  toast('Error Type', {
    rtl: rtl.isRtl.value,
    type: 'error',
  })
}
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VBtn
      variant="tonal"
      color="primary"
      @click="toastTypeDefault"
    >
      Default
    </VBtn>

    <VBtn
      variant="tonal"
      color="info"
      @click="toastTypeInfo"
    >
      Info
    </VBtn>

    <VBtn
      variant="tonal"
      color="success"
      @click="toastTypeSuccess"
    >
      Success
    </VBtn>

    <VBtn
      variant="tonal"
      color="warning"
      @click="toastTypeWarning"
    >
      Warning
    </VBtn>

    <VBtn
      variant="tonal"
      color="error"
      @click="toastTypeError"
    >
      Error
    </VBtn>
  </div>
</template>

<style lang="scss">
@import "vue3-toastify/dist/index.css";
@import "@/styles/libs/toastify";
</style>

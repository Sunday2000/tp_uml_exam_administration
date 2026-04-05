<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'

const month = ref(null)
</script>

<template>
  <VueDatePicker
    v-model="month"
    month-picker
    :teleport="true"
  />
</template>

<style lang="scss">
@use "@/styles/libs/vue-datepicker.scss";
</style>

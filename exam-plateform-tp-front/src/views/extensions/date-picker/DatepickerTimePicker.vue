<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'

const time = ref(null)
</script>

<template>
  <VueDatePicker
    v-model="time"
    time-picker
    :teleport="true"
  />
</template>

<style lang="scss">
@use "@/styles/libs/vue-datepicker.scss";
</style>

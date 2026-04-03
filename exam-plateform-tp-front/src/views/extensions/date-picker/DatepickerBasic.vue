<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'

const date = ref(null)
</script>

<template>
  <VueDatePicker
    v-model="date"
    :teleport="true"
  />
</template>

<style lang="scss">
@use "@/styles/libs/vue-datepicker.scss";
</style>

<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'

const series = [44, 55, 41, 17, 15]

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'donut',
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    stroke: { width: 0 },
    legend: {
      show: false,
    },
  }
})
</script>

<template>
  <VueApexCharts
    :options="chartOptions"
    :series="series"
    :height="300"
  />
</template>

<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = computed(() => vuetifyTheme.current.value.colors)

const series = [{
  name: 'Series 1',
  data: [80, 50, 30, 40, 100, 20],
}]

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'radar',
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    colors: [currentTheme.value.primary],
    yaxis: { show: false },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
      labels: {
        style: {
          colors: [
            'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
            'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
            'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
            'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
            'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
            'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
            'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
            'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
          ],
        },
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: 'rgba(var(--v-border-color), var(--v-border-opacity))',
          connectorColors: 'rgba(var(--v-border-color), var(--v-border-opacity))',
        },
      },
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

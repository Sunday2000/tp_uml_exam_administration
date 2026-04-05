<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = computed(() => vuetifyTheme.current.value.colors)

const series = [14, 23, 21, 17, 15, 10, 12, 17, 21]

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'polarArea',
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      colors: [currentTheme.value.surface],
    },
    fill: {
      opacity: 0.8,
    },
    colors: [currentTheme.value.primary],
    yaxis: { show: false },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 1,
          strokeColor: 'rgba(var(--v-border-color), var(--v-border-opacity))',
        },
        spokes: {
          strokeWidth: 1,
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
    :height="320"
  />
</template>

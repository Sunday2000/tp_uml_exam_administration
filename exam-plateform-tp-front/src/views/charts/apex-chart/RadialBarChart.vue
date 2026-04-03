<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = computed(() => vuetifyTheme.current.value.colors)

const series = [70]

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'radialBar',
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '65%',
          background: 'transparent',
        },
        track: {
          background: currentTheme.value.background,
        },
        dataLabels: {
          value: {
            color: 'rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))',
          },
        },
      },

    },
    labels: ['Cricket'],
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

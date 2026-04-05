<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = computed(() => vuetifyTheme.current.value.colors)

const series = [
  {
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
  },
]

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -10,
        left: -7,
        right: 0,
        bottom: 5,
      },
    },
    colors: [
      currentTheme.value.primary,
    ],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        colors: {
          backgroundBarRadius: 5,
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        'South Korea',
        'Canada',
        'United Kingdom',
        'Netherlands',
        'Italy',
        'France',
        'Japan',
        'United States',
        'China',
        'Germany',
      ],
      labels: {
        style: {
          colors: 'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
        },
      },
      axisBorder: {
        color: 'rgba(var(--v-border-color), var(--v-border-opacity))',
      },
      axisTicks: {
        color: 'rgba(var(--v-border-color), var(--v-border-opacity))',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
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

<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = computed(() => vuetifyTheme.current.value.colors)

const series = [
  {
    data: [21, 22, 10, 28, 16, 21],
  },
]

const chartOptions = computed(() => {
  const backgroundColor = currentTheme.value.background

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
      currentTheme.value.secondary,
      currentTheme.value.warning,
      currentTheme.value.info,
      currentTheme.value.error,
      currentTheme.value.success,
    ],
    plotOptions: {
      bar: {
        columnWidth: '20%',
        distributed: true,
        colors: {
          backgroundBarColors: [
            backgroundColor,
            backgroundColor,
            backgroundColor,
            backgroundColor,
            backgroundColor,
          ],
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
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        ['Peter', 'Brown'],
        ['Mary', 'Evans'],
        ['Peter', 'Brown'],
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

<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = computed(() => vuetifyTheme.current.value.colors)

const series = [
  {
    name: 'Revenue',
    data: [31, 40, 28, 51, 42, 109, 100],
  }, {
    name: 'Expense',
    data: [11, 32, 45, 32, 34, 52, 41],
  },
]

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'area',
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    colors: [
      currentTheme.value.success,
      currentTheme.value.error,
    ],
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: 'rgba(var(--v-border-color), var(--v-border-opacity))',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    legend: {
      labels: {
        colors: 'rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))',
      },
    },
    xaxis: {
      type: 'datetime',
      categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z', '2018-09-19T04:30:00.000Z', '2018-09-19T05:30:00.000Z', '2018-09-19T06:30:00.000Z'],
      labels: {
        style: {
          colors: 'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
        },
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'rgba(var(--v-theme-on-surface), var(--v-disabled-opacity))',
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  }
})
</script>

<template>
  <VCard title="Balance Overview">
    <VCardText class="px-0">
      <VueApexCharts
        :options="chartOptions"
        :series="series"
        :height="300"
      />
    </VCardText>
  </VCard>
</template>

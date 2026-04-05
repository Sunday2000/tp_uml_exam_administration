<script setup lang="ts">
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'

import { hexToRgb } from '@/utils/hexToRgb'
import { Bar } from 'vue-chartjs'
import { useTheme } from 'vuetify'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const vuetifyTheme = useTheme()

const chartData = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: vuetifyTheme.global.current.value.colors.primary,
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
}

const chartOptions = computed(() => {
  const colors = vuetifyTheme.global.current.value.colors
  const variables = vuetifyTheme.global.current.value.variables
  const disabledColor = `rgba(${hexToRgb(colors['on-surface'])},${variables['disabled-opacity']})`

  const borderColor = `rgba(${hexToRgb(String(variables['border-color']))},${variables['border-opacity']})`

  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor,
        },
        ticks: { color: disabledColor },
      },
      y: {
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor,
        },
        ticks: {
          stepSize: 100,
          color: disabledColor,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  }
})
</script>

<template>
  <div>
    <Bar
      :options="chartOptions"
      :data="chartData"
      :height="300"
    />
  </div>
</template>

<script lang="ts" setup>
import { hexToRgb } from '@/utils/hexToRgb'

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { useTheme } from 'vuetify'

const { current, global } = useTheme()

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const data = {
  labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 135],
  datasets: [
    {
      fill: false,
      tension: 0.5,
      pointRadius: 1,
      label: 'USA',
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: current.value.colors.primary,
      backgroundColor: current.value.colors.primary,
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: current.value.colors.surface,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: current.value.colors.primary,
      data: [80, 180, 150, 170, 210, 160, 160, 210, 265, 210, 270, 255, 290, 360, 275],
    },
    {
      fill: false,
      tension: 0.5,
      label: 'Europe',
      pointRadius: 1,
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: current.value.colors.warning,
      backgroundColor: current.value.colors.warning,
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: current.value.colors.surface,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: current.value.colors.warning,
      data: [80, 205, 235, 230, 250, 300, 140, 260, 230, 350, 220, 170, 210, 200, 280],
    },
    {
      fill: false,
      tension: 0.5,
      pointRadius: 1,
      label: 'Australia',
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: current.value.colors.info,
      backgroundColor: current.value.colors.info,
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: current.value.colors.surface,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: current.value.colors.info,
      data: [80, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180],
    },
  ],
}

const options = computed(() => {
  const colors = global.current.value.colors
  const variables = global.current.value.variables
  const disabledColor = `rgba(${hexToRgb(colors['on-surface'])},${variables['disabled-opacity']})`
  const borderColor = `rgba(${hexToRgb(String(variables['border-color']))},${variables['border-opacity']})`

  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: disabledColor },
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor,
        },
      },
      y: {
        min: 0,
        max: 400,
        ticks: {
          stepSize: 100,
          color: disabledColor,
        },
        grid: {
          borderColor,
          drawBorder: false,
          color: borderColor,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: disabledColor,
          usePointStyle: true,
        },
      },
    },
  } as any
})
</script>

<template>
  <Line
    :data="data"
    :options="options"
    height="300"
  />
</template>

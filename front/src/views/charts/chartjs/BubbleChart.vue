<script lang="ts" setup>
import { hexToRgb } from '@/utils/hexToRgb'
import { useTheme } from 'vuetify'

import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Bubble } from 'vue-chartjs'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

const vuetifyTheme = useTheme()

const data = {
  animation: { duration: 10000 },
  datasets: [
    {
      label: 'Dataset 1',
      borderColor: vuetifyTheme.global.current.value.colors.primary,
      backgroundColor: vuetifyTheme.global.current.value.colors.primary,
      data: [
        { x: 20, y: 74, r: 10 },
        { x: 10, y: 110, r: 5 },
        { x: 30, y: 165, r: 7 },
        { x: 40, y: 200, r: 20 },
        { x: 90, y: 185, r: 7 },
        { x: 50, y: 240, r: 7 },
        { x: 60, y: 275, r: 10 },
        { x: 70, y: 305, r: 5 },
        { x: 80, y: 325, r: 4 },
        { x: 100, y: 310, r: 5 },
        { x: 110, y: 240, r: 5 },
        { x: 120, y: 270, r: 7 },
        { x: 130, y: 300, r: 6 },
      ],
    },
    {
      label: 'Dataset 2',
      borderColor: vuetifyTheme.global.current.value.colors.warning,
      backgroundColor: vuetifyTheme.global.current.value.colors.warning,
      data: [
        { x: 30, y: 72, r: 5 },
        { x: 40, y: 110, r: 7 },
        { x: 20, y: 135, r: 6 },
        { x: 10, y: 160, r: 12 },
        { x: 50, y: 285, r: 5 },
        { x: 60, y: 235, r: 5 },
        { x: 70, y: 275, r: 7 },
        { x: 80, y: 290, r: 4 },
        { x: 90, y: 250, r: 10 },
        { x: 100, y: 220, r: 7 },
        { x: 120, y: 230, r: 4 },
        { x: 110, y: 320, r: 15 },
        { x: 130, y: 330, r: 7 },
      ],
    },
  ],
}

const options = computed(() => {
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
        ticks: { stepSize: 10, color: disabledColor },
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
  <Bubble
    :data="data"
    :options="options"
    :height="300"
  />
</template>

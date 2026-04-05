<script lang="ts" setup>
import { hexToRgb } from '@/utils/hexToRgb'

import {
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Scatter } from 'vue-chartjs'
import { useTheme } from 'vuetify'

const { current, global } = useTheme()

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

const data = {
  datasets: [
    {
      pointRadius: 5,
      label: 'iPhone',
      pointBorderWidth: 2,
      backgroundColor: current.value.colors.primary,
      pointHoverBorderWidth: 2,
      borderColor: 'transparent',
      data: [
        { x: 72, y: 225 },
        { x: 81, y: 270 },
        { x: 90, y: 230 },
        { x: 103, y: 305 },
        { x: 103, y: 245 },
        { x: 108, y: 275 },
        { x: 110, y: 290 },
        { x: 111, y: 315 },
        { x: 109, y: 350 },
        { x: 116, y: 340 },
        { x: 113, y: 260 },
        { x: 117, y: 275 },
        { x: 117, y: 295 },
        { x: 126, y: 280 },
        { x: 127, y: 340 },
        { x: 133, y: 330 },
      ],
    },
    {
      pointRadius: 5,
      pointBorderWidth: 2,
      label: 'Samsung Note',
      backgroundColor: current.value.colors.warning,
      pointHoverBorderWidth: 2,
      borderColor: 'transparent',
      data: [
        { x: 13, y: 95 },
        { x: 22, y: 105 },
        { x: 17, y: 115 },
        { x: 19, y: 130 },
        { x: 21, y: 125 },
        { x: 35, y: 125 },
        { x: 13, y: 155 },
        { x: 21, y: 165 },
        { x: 25, y: 155 },
        { x: 18, y: 190 },
        { x: 26, y: 180 },
        { x: 43, y: 180 },
        { x: 53, y: 202 },
        { x: 61, y: 165 },
        { x: 67, y: 225 },
      ],
    },
    {
      pointRadius: 5,
      label: 'OnePlus',
      pointBorderWidth: 2,
      backgroundColor: current.value.colors.error,
      pointHoverBorderWidth: 2,
      borderColor: 'transparent',
      data: [
        { x: 70, y: 195 },
        { x: 72, y: 270 },
        { x: 98, y: 255 },
        { x: 100, y: 215 },
        { x: 87, y: 240 },
        { x: 94, y: 280 },
        { x: 99, y: 300 },
        { x: 102, y: 290 },
        { x: 110, y: 275 },
        { x: 111, y: 250 },
        { x: 94, y: 280 },
        { x: 92, y: 340 },
        { x: 100, y: 335 },
        { x: 108, y: 330 },
      ],
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
    animation: { duration: 800 },
    layout: {
      padding: { top: -20 },
    },
    scales: {
      x: {
        min: 0,
        max: 140,
        grid: {
          borderColor,
          drawTicks: false,
          drawBorder: false,
          color: borderColor,
        },
        ticks: {
          stepSize: 10,
          color: disabledColor,
        },
      },
      y: {
        min: 0,
        max: 400,
        grid: {
          borderColor,
          drawTicks: false,
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
  } as any
})
</script>

<template>
  <Scatter
    :data="data"
    :options="options"
    height="300"
  />
</template>

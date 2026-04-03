<script lang="ts" setup>
import { hexToRgb } from '@/utils/hexToRgb'
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'
import { Radar } from 'vue-chartjs'
import { useTheme } from 'vuetify'

const { global } = useTheme()

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

const data = computed(() => {
  const colors = global.current.value.colors
  const variables = global.current.value.variables
  const primaryLight = `rgba(${hexToRgb(String(colors.warning))},${variables['disabled-opacity']})`
  const warningLight = `rgba(${hexToRgb(String(colors.secondary))},${variables['disabled-opacity']})`

  return {
    labels: [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
      'Running',
    ],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: primaryLight,
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        data: [65, 59, 90, 81, 56, 55, 40],
        borderColor: primaryLight,
      },
      {
        label: 'My Second dataset',
        backgroundColor: warningLight,
        borderColor: warningLight,
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        data: [28, 48, 40, 19, 96, 27, 100],
      },
    ],
  }
})

const options = computed(() => {
  const colors = global.current.value.colors
  const variables = global.current.value.variables
  const disabledColor = `rgba(${hexToRgb(colors['on-surface'])},${variables['disabled-opacity']})`
  const borderColor = `rgba(${hexToRgb(String(variables['border-color']))},${variables['border-opacity']})`

  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        ticks: {
          display: false,
          maxTicksLimit: 1,
          color: disabledColor,
        },
        grid: { color: borderColor },
        pointLabels: { color: disabledColor },
        angleLines: { color: borderColor },
      },
    },
  }
})
</script>

<template>
  <Radar
    :data="data"
    :options="options"
  />
</template>

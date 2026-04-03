<script lang="ts" setup>
import { hexToRgb } from '@/utils/hexToRgb'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { useTheme } from 'vuetify'

ChartJS.register(ArcElement, Tooltip, Legend)

const { global } = useTheme()

const data = computed(() => {
  return {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [
      {
        backgroundColor: [
          global.current.value.colors.primary,
          global.current.value.colors.warning,
          global.current.value.colors.info,
          global.current.value.colors.error,
        ],
        borderColor: global.current.value.colors.surface,
        data: [40, 20, 80, 10],
      },
    ],
  }
})

const options = computed(() => {
  const disabledColor = `rgba(${hexToRgb(global.current.value.colors['on-surface'])},${global.current.value.variables['disabled-opacity']})`

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          padding: 25,
          boxWidth: 10,
          color: disabledColor,
          usePointStyle: true,
        },
      },
    },
  }
})
</script>

<template>
  <Doughnut
    :data="data"
    :options="options"
  />
</template>

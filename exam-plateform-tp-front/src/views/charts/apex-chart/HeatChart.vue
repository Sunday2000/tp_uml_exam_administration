<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = computed(() => vuetifyTheme.current.value.colors)

interface YRange {
  min: number
  max: number
}

const generateData = (count: number, yrange: YRange) => {
  let i = 0
  const series = []
  while (i < count) {
    const x = (i + 1).toString()
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

    series.push({
      x,
      y,
    })
    i += 1
  }

  return series
}

const series = [{
  name: 'Jan',
  data: generateData(20, {
    min: -30,
    max: 55,
  }),
},
{
  name: 'Feb',
  data: generateData(20, {
    min: -30,
    max: 55,
  }),
},
{
  name: 'Mar',
  data: generateData(20, {
    min: -30,
    max: 55,
  }),
},
{
  name: 'Apr',
  data: generateData(20, {
    min: -30,
    max: 55,
  }),
},
{
  name: 'May',
  data: generateData(20, {
    min: -30,
    max: 55,
  }),
},
{
  name: 'Jun',
  data: generateData(20, {
    min: -30,
    max: 55,
  }),
},
{
  name: 'Jul',
  data: generateData(20, {
    min: -30,
    max: 55,
  }),
},
{
  name: 'Aug',
  data: generateData(20, {
    min: -30,
    max: 55,
  }),
},
{
  name: 'Sep',
  data: generateData(20, {
    min: -30,
    max: 55,
  }),
}]

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'heatmap',
      parentHeightOffset: 0,
    },
    grid: {
      borderColor: 'rgba(var(--v-border-color), var(--v-border-opacity))',
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [{
            from: -30,
            to: 5,
            name: 'low',
            color: currentTheme.value.primary,
          },
          {
            from: 6,
            to: 20,
            name: 'medium',
            color: currentTheme.value.info,
          },
          {
            from: 21,
            to: 45,
            name: 'high',
            color: currentTheme.value.warning,
          },
          {
            from: 46,
            to: 55,
            name: 'extreme',
            color: currentTheme.value.error,
          }],
        },
      },
    },
    stroke: {
      width: 1,
    },
    legend: {
      labels: {
        colors: 'rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
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

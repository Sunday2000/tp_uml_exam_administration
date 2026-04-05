<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const { global } = useTheme()

const series = [
  {
    data: [300, 350, 330, 380, 340, 400, 380],
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
      sparkline: {
        enabled: true,
      },
    },
    tooltip: {
      enabled: false,
    },
    markers: {
      colors: 'transparent',
      strokeColors: 'transparent',
    },
    grid: {
      show: false,
    },
    colors: [global.current.value.colors.primary],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      show: true,
      lines: {
        show: false,
      },
      labels: {
        show: false,
      },
      stroke: {
        width: 0,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      stroke: {
        width: 0,
      },
      show: false,
    },
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex align-center justify-space-between">
        <h6 class="text-h6 mb-3">
          Monthly Earnings
        </h6>

        <VBtn
          icon
          variant="tonal"
          color="primary"
        >
          <VIcon icon="mdi-currency-usd" />
        </VBtn>
      </div>
      <p class="text-lg">
        $6,820
      </p>
      <div class="d-flex align-center">
        <VIcon
          size="20"
          color="success"
          icon="mdi-arrow-up"
        />

        <span>+9% last year</span>
      </div>
    </VCardText>

    <VueApexCharts
      :series="series"
      :options="chartOptions"
      :height="97"
    />
  </VCard>
</template>

<style lang="scss">
@use "@/styles/libs/apex-chart";
</style>

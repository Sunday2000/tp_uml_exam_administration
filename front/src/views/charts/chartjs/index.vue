<script setup lang="ts">
import BarChart from './BarChart.vue'
import BubbleChart from './BubbleChart.vue'
import DoughnutChart from './DoughnutChart.vue'
import LineChart from './LineChart.vue'
import PolarAreaChart from './PolarAreaChart.vue'
import RadarChart from './RadarChart.vue'
import ScatterChart from './ScatterChart.vue'

// breadcrumbs
const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Chart Js',
    disabled: true,
  },
]
</script>

<template>
  <VRow>
    <!-- Breadcrumbs -->
    <VCol
      cols="12"
      class="d-flex align-center justify-space-between flex-wrap"
    >
      <VBreadcrumbs
        divider="-"
        :items="breadcrumbs"
        class="pa-0 "
      />

      <div>
        <ApiBtn
          href="https://github.com/apertureless/vue-chartjs"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>
    <!-- Breadcrumbs -->

    <!-- Bar Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Bar Chart">
        <VCardText>
          <BarChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Doughnut Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Doughnut Chart">
        <VCardText>
          <DoughnutChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Bubble Chart -->
    <VCol cols="12">
      <VCard title="Bubble Chart">
        <VCardText>
          <BubbleChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Line Chart -->
    <VCol cols="12">
      <VCard title="Line Chart">
        <VCardText>
          <LineChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Polar Area Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Polar Area Chart">
        <VCardText>
          <PolarAreaChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Radar Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Radar Chart">
        <VCardText>
          <RadarChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Scatter Chart -->
    <VCol cols="12">
      <VCard title="Scatter Chart">
        <VCardText>
          <ScatterChart />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

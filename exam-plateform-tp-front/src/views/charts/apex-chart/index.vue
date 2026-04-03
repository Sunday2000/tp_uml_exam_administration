<script lang="ts" setup>
import AreaChart from './AreaChart.vue'
import BarChart from './BarChart.vue'
import HeatChart from './HeatChart.vue'
import HorizontalBarChart from './HorizontalBarChart.vue'
import PieChart from './PieChart.vue'
import PolarChart from './PolarChart.vue'
import RadarChart from './RadarChart.vue'
import RadialBarChart from './RadialBarChart.vue'

// breadcrumbs
const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Apex Chart',
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
          href="https://apexcharts.com/docs/options/"
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

    <!-- Area Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Area Chart">
        <VCardText>
          <AreaChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Horizontal Bar Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Horizontal Bar Chart">
        <VCardText>
          <HorizontalBarChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Heat Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Heat Chart">
        <VCardText>
          <HeatChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Radial Bar Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Radial Bar Chart">
        <VCardText>
          <RadialBarChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Pie Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Pie Chart">
        <VCardText>
          <PieChart />
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

    <!-- Polar Area Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Polar Area Chart">
        <VCardText>
          <PolarChart />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@/styles/libs/apex-chart";
</style>

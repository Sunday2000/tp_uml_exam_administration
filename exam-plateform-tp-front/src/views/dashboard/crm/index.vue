<script setup lang="ts">
import CrmAreaChart from './CrmAreaChart.vue'
import CrmCryptoStatus from './CrmCryptoStatus.vue'
import CrmMonthlyEarnings from './CrmMonthlyEarnings.vue'
import CrmOrderList from './CrmOrderList.vue'
import CrmRecentTransition from './CrmRecentTransition.vue'
import CrmSwiper from './CrmSwiper.vue'
import CrmUpcomingActivities from './CrmUpcomingActivities.vue'
</script>

<template>
  <VRow>
    <!-- Swiper -->
    <VCol
      cols="12"
      sm="8"
    >
      <CrmSwiper />
    </VCol>

    <!-- Monthly Earnings -->
    <VCol
      cols="12"
      sm="4"
    >
      <CrmMonthlyEarnings />
    </VCol>

    <!-- Area chart -->
    <VCol
      cols="12"
      sm="7"
    >
      <CrmAreaChart />
    </VCol>

    <!-- Crypto holding status -->
    <VCol
      cols="12"
      sm="5"
    >
      <CrmCryptoStatus />
    </VCol>

    <!-- Upcoming Activities -->
    <VCol
      cols="12"
      sm="6"
    >
      <CrmUpcomingActivities />
    </VCol>

    <!-- Order list -->
    <VCol
      cols="12"
      sm="6"
    >
      <CrmOrderList />
    </VCol>

    <!-- Recent Transition -->
    <VCol
      cols="12"
      md="6"
      sm="8"
    >
      <CrmRecentTransition />
    </VCol>
  </VRow>
</template>

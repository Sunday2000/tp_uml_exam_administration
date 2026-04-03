<script setup lang="ts">
const recentTransactions = [
  {
    time: '09:30 AM',
    message: 'Payment received from John Doe',
    icon: 'mdi-currency-usd',
    color: 'primary',
    amount: '$385.90',
  },
  {
    time: '10:15 AM',
    message: 'Purchase of groceries at XYZ Mart for ',
    icon: 'mdi-cube-outline',
    color: 'secondary',
    amount: '$75.45',
  },
  {
    time: '11:45 AM',
    message: 'Withdrawal of $200 from ATM',
    icon: 'mdi-approximately-equal',
    color: 'warning',
    amount: '$586',
  },
  {
    time: '12:30 PM',
    message: 'Invoice payment to ABC Inc.',
    icon: 'mdi-axis',
    color: 'info',
    amount: '$500.00',
  },
  {
    time: '01:45 PM',
    message: 'Received a transfer from Jane Smith',
    icon: 'mdi-cards-outline',
    color: 'error',
    amount: '$250.75',
  },
  {
    time: '02:15 PM',
    message: 'Online shopping payment at E-commerce Store',
    icon: 'mdi-check',
    color: 'success',
    amount: '$120.30',
  },
]
</script>

<template>
  <VCard title="Recent Transitions">
    <VCardText>
      <VTimeline
        side="end"
        truncate-line="both"
      >
        <VTimelineItem
          v-for="transition in recentTransactions"
          :key="transition.message"
          :dot-color="transition.color"
          :icon="transition.icon"
          size="x-small"
        >
          <template #opposite>
            <span class="text-sm text-medium-emphasis">{{ transition.time }}</span>
          </template>
          <p class="text-base font-weight-medium mb-1">
            {{ transition.message }}
          </p>
          <span class="text-sm"><span class="font-weight-medium">Amount:</span> {{ transition.amount }}</span>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import type { Order } from '@/plugins/apis/types'
import axios from '@axios'
import { VDataTable } from 'vuetify/labs/VDataTable'

const tableHeader = [
  {
    title: 'Order Id',
    key: 'orderId',
  },
  {
    title: 'Customer',
    key: 'customer',
  },
  {
    title: 'Product Name',
    key: 'productName',
  },
  {
    title: 'Amount',
    key: 'amount',
  },
  {
    title: 'Order Date',
    key: 'orderDate',
  },
  {
    title: 'Delivery Date',
    key: 'deliveryDate',
  },
  {
    title: 'Payment Method',
    key: 'paymentMethod',
  },
  {
    title: 'Delivery Status',
    key: 'deliveryStatus',
  },
  {
    title: 'Actions',
    key: 'actions',
  },
]

const orders = ref<Order[]>([])

onMounted(() => {
  axios.get('/orders').then(response => {
    orders.value = response.data
  })
})

const searchOrder = ref('')

const productStatusColor = (status: string) => {
  if (status === 'Delivered')
    return 'success'

  if (status === 'Out for Delivery')
    return 'info'

  if (status === 'Shipped')
    return 'primary'

  if (status === 'Processing')
    return 'secondary'

  if (status === 'Pending')
    return 'warning'

  if (status === 'Cancelled')
    return 'error'

  return 'secondary'
}
</script>

<template>
  <VCard title="Orders">
    <template #append>
      <VTextField
        v-model="searchOrder"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search Order"
        density="compact"
        style="min-width: 11rem;"
      />
    </template>

    <VDataTable
      :headers="tableHeader"
      :search="searchOrder"
      :items="orders"
      :items-per-page="5"
      class="text-no-wrap rounded-0"
    >
      <template #item.orderId="{ item }">
        <span class="text-primary font-weight-semibold">
          #{{ item.columns.orderId }}
        </span>
      </template>

      <template #item.customer="{ item }">
        <span class="font-weight-semibold">
          {{ item.columns.customer }}
        </span>
      </template>

      <template #item.productName="{ item }">
        <span class="font-weight-semibold">
          {{ item.columns.productName }}
        </span>
      </template>

      <template #item.amount="{ item }">
        <span class="font-weight-semibold">
          ${{ item.columns.amount }}
        </span>
      </template>

      <template #item.deliveryStatus="{ item }">
        <VChip
          size="small"
          label
          :color="productStatusColor(item.columns.deliveryStatus)"
        >
          {{ item.columns.deliveryStatus }}
        </VChip>
      </template>

      <template #item.actions>
        <VBtn
          icon
          variant="text"
        >
          <VIcon icon="mdi-dots-vertical" />
          <VMenu activator="parent">
            <VList>
              <VListItem
                v-for="(item, index) in ['View', 'Delete', 'Edit']"
                :key="index"
                :value="index"
              >
                <VListItemTitle>{{ item }}</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VBtn>
      </template>
    </VDataTable>
  </VCard>
</template>

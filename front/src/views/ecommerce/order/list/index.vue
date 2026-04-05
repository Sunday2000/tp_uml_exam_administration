<script setup lang="ts">
import type { Order } from '@/plugins/apis/types'
import axios from '@axios'
import { register } from 'swiper/element/bundle'
import { VDataTable } from 'vuetify/labs/VDataTable'

const orderStatistics = [
  {
    icon: 'mdi-cart-plus',
    stats: '200.32k',
    name: 'New Orders',
    color: 'primary',
  },
  {
    icon: 'mdi-update',
    stats: '35.21k',
    color: 'warning',
    name: 'Pending Orders',
  },
  {
    icon: 'mdi-truck-outline',
    stats: '647.32k',
    color: 'success',
    name: 'Delivered Orders',
  },
  {
    icon: 'mdi-cart-check',
    color: 'info',
    stats: '215.36k',
    name: 'Shifted Orders',
  },
  {
    icon: 'mdi-cancel',
    stats: '8,649',
    color: 'error',
    name: 'Cancelled Orders',
  },
]

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

// breadcrumbs
const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Order',
    disabled: true,
  },
  {
    title: 'List',
    disabled: true,
  },
]

register()
</script>

<template>
  <VRow>
    <!-- Breadcrumbs -->
    <VCol cols="12">
      <VBreadcrumbs
        :items="breadcrumbs"
        divider="-"
        class="px-0"
      />
    </VCol>

    <VCol cols="12">
      <div class="border rounded px-4">
        <swiper-container
          events-prefix="swiper-"
          slides-per-view="1"
          navigation="true"
          :breakpoints="{
            992: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            780: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }"
        >
          <swiper-slide
            v-for="order in orderStatistics"
            :key="order.name"
          >
            <VCard
              min-width="200"
              class="my-4"
            >
              <VCardItem>
                <template #prepend>
                  <VAvatar
                    :color="order.color"
                    rounded
                  >
                    <VIcon :icon="order.icon" />
                  </VAvatar>
                </template>
                <VCardTitle>{{ order.stats }}</VCardTitle>
                <VCardSubtitle>{{ order.name }}</VCardSubtitle>
              </VCardItem>
            </VCard>
          </swiper-slide>
        </swiper-container>
      </div>
    </VCol>

    <VCol cols="12">
      <VCard>
        <VCardText>
          <VTextField
            v-model="searchOrder"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search Order"
          />
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard>
        <VDataTable
          :headers="tableHeader"
          :search="searchOrder"
          :items="orders"
          :items-per-page="10"
          class="text-no-wrap"
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
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@/styles/libs/swiper";
</style>

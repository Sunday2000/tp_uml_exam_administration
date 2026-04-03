<script setup lang="ts">
/* eslint-disable vue/no-v-text-v-html-on-component */
/* eslint-disable vue/no-v-html */
import camera from '@/assets/product/camera.png'
import grinder from '@/assets/product/grinder.png'
import headphone from '@/assets/product/headphone.png'
import iphone from '@/assets/product/iphone.png'
import laptop from '@/assets/product/laptop.png'
import { VDataTable } from 'vuetify/labs/VDataTable'

const orderDetails = [
  {
    name: 'Customer Info',
    icon: 'mdi-account-outline',
    color: 'primary',
    content: '<p class="text-base font-weight-bold mb-1">Jessica Johnson</p><p class="mb-0">jessica.johnson@example.com</p><p class="mb-0">013-789-9876</p>',
  },
  {
    name: 'Shipping Address',
    icon: 'mdi-map-outline',
    color: 'warning',
    content: '<p class="mb-0">123 Fake Street Apt 456 Faketown, <br> State, Fakeland</p><p class="mb-0">013-789-9876</p>',
  },
  {
    name: 'Billing Address',
    icon: 'mdi-file-document-outline',
    color: 'info',
    content: '<p class="mb-0">123 Fake Street Apt 456 Faketown, <br> State, Fakeland</p><p class="mb-0">013-789-9876</p>',
  },
  {
    name: 'Logistics Details',
    icon: 'mdi-truck-outline',
    color: 'secondary',
    content: '<p class="text-base font-weight-bold mb-1">SpeedyShip Logistics</p><p class="mb-0">Tracking Number: SPDL123456789</p><p class="mb-0">Delivery Date: 2023-08-10</p>',
  },
]

const orders = [
  {
    productId: 5454,
    productName: 'ZoomMaster Pro Camera',
    productImg: camera,
    price: 454,
    quantity: 1,
  },
  {
    productId: 5462,
    productName: 'GrindMaster Pro',
    productImg: grinder,
    price: 12.0,
    quantity: 1,
  },
  {
    productId: 7565,
    productName: 'SoundWave Pro Headphones',
    productImg: headphone,
    price: 56,
    quantity: 1,
  },
  {
    productId: 3541,
    productName: 'iPhonyX',
    productImg: iphone,
    price: 684,
    quantity: 1,
  },
  {
    productId: 7985,
    productName: 'UltraBook Pro',
    productImg: laptop,
    price: 432,
    quantity: 1,
  },
]

const tableHeader = [
  {
    title: 'Product ID',
    key: 'productId',
  },
  {
    title: 'Product Name',
    key: 'productName',
  },
  {
    title: 'Price',
    key: 'price',
  },
  {
    title: 'Quantity',
    key: 'quantity',
  },
  {
    title: 'Total',
    key: 'total',
  },
]

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
    title: 'Overview',
    disabled: true,
  },
]
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

    <VCol
      v-for="order in orderDetails"
      :key="order.name"
      cols="12"
      sm="6"
      md="3"
    >
      <VCard
        :color="order.color"
        variant="tonal"
      >
        <VCardItem>
          <VCardTitle class="text-high-emphasis">
            {{ order.name }}
          </VCardTitle>
          <template #append>
            <VAvatar
              rounded
              variant="tonal"
              :color="order.color"
            >
              <VIcon :icon="order.icon" />
            </VAvatar>
          </template>
        </VCardItem>

        <VCardText
          class="text-high-emphasis mt-n4"
          v-html="order.content"
        />
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard>
        <VDataTable
          :headers="tableHeader"
          :items="orders"
          class="text-no-wrap"
        >
          <template #item.productId="{ item }">
            <a
              href="javascript:void(0)"
              class="font-weight-bold"
            >#{{ item.columns.productId }}</a>
          </template>
          <template #item.productName="{ item }">
            <div class="d-flex align-center gap-3 py-3">
              <VAvatar
                rounded
                variant="tonal"
                :image="item.raw.productImg"
              />
              <span class="font-weight-medium">{{ item.columns.productName }}</span>
            </div>
          </template>

          <template #item.price="{ item }">
            <span class="font-weight-medium">${{ item.columns.price }}</span>
          </template>

          <template #item.quantity="{ item }">
            <span class="font-weight-medium me-1">{{ item.columns.quantity }}</span>
            <span>PCS</span>
          </template>

          <template #item.total="{ item }">
            <span class="font-weight-medium">${{ item.columns.price * item.columns.quantity }}</span>
          </template>
        </VDataTable>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Price & Taxes">
        <VCardText>
          <VTable class="text-no-wrap">
            <tbody>
              <tr>
                <td>Sub Total:</td>
                <td>
                  $1715.97
                </td>
              </tr>
              <tr>
                <td>Estimated Tax (12.5%):</td>
                <td>
                  $200.00
                </td>
              </tr>
              <tr>
                <td>Shipping Charge:</td>
                <td>
                  $65.00
                </td>
              </tr>
              <tr>
                <td>Discount:</td>
                <td>
                  $97.00
                </td>
              </tr>
              <tr>
                <td>Total (USD) :</td>
                <td>
                  $1868.97
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Payment Detail">
        <VCardText>
          <VTable class="text-no-wrap">
            <tbody>
              <tr>
                <td>Transactions:</td>
                <td>#VLZ124561278124</td>
              </tr>
              <tr>
                <td>Payment Method:</td>
                <td>Debit Card</td>
              </tr>
              <tr>
                <td>Card Number:</td>
                <td>XXXX XXXX XXXX 3028</td>
              </tr>
              <tr>
                <td>Card Holder Name</td>
                <td>Jessica Johnson</td>
              </tr>
              <tr>
                <td>Total Amount</td>
                <td>$1868.98</td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard
        title="Order Status"
        variant="outlined"
      >
        <VCardText>
          <VTimeline
            :density="$vuetify.display.mdAndUp ? 'compact' : $vuetify.display.width < 500 ? 'compact' : 'default'"
            :direction="$vuetify.display.mdAndUp ? 'horizontal' : 'vertical'"
          >
            <VTimelineItem
              dot-color="secondary"
              icon="mdi-file-document-outline"
            >
              <VCard
                title="Order Process"
                subtitle="Mon, 24 Dec, 2023"
              />
            </VTimelineItem>

            <VTimelineItem
              dot-color="warning"
              icon="mdi-cube-outline"
            >
              <VCard
                title="Packed"
                subtitle="Mon, 24 Dec, 2023"
              />
            </VTimelineItem>

            <VTimelineItem
              dot-color="info"
              icon="mdi-folder-arrow-right-outline"
            >
              <VCard
                color="success"
                title="Order Shipped"
                subtitle="Thu, 02 Jan, 2023"
              />
            </VTimelineItem>

            <VTimelineItem
              dot-color="primary"
              icon="mdi-truck-delivery-outline"
            >
              <VCard
                title="Out Of Delivery"
                subtitle="Thu, 10 Jan, 2023"
              />
            </VTimelineItem>

            <VTimelineItem
              dot-color="success"
              icon="mdi-gift-open-outline"
            >
              <VCard
                title="Delivered"
                subtitle="Thu, 16 Jan, 2023"
              />
            </VTimelineItem>
          </VTimeline>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

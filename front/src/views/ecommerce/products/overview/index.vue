<script setup lang="ts">
import productImg from '@/assets/product/online-school-equipment-home.jpg'
import type { Product } from '@/plugins/apis/types'
import axios from '@axios'
import { VDataTable } from 'vuetify/labs/VDataTable'

const description = [
  'The most beautiful curves of this swivel stool adds an elegant touch to any environment',
  'Memory swivel seat returns to original seat position',
  'Comfortable integrated layered chair seat cushion design',
  'Fully assembled! No assembly required',
]

const headers = [
  {
    title: 'Product Name',
    key: 'name',
  },
  {
    title: 'Rating',
    key: 'rating',
  },
  {
    title: 'Price',
    key: 'price',
  },
  {
    title: 'Discount',
    key: 'discount',
  },
]

const products = ref<Product[]>([])

onMounted(() => {
  axios.get('/products').then(response => {
    products.value = response.data.products
  })
})

// breadcrumbs
const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Products',
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

    <VCol cols="12">
      <VCard title="Product Overview">
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="5"
            >
              <VImg
                :src="productImg"
                class="rounded elevation-3 mx-auto mb-6"
              />

              <div class="d-flex flex-wrap gap-4 mt-6">
                <VBtn color="info">
                  ADD TO CART
                </VBtn>

                <VBtn color="success">
                  BUY NOW
                </VBtn>
              </div>
            </VCol>

            <VCol
              cols="12"
              md="7"
            >
              <div class="ms-md-8">
                <h4 class="text-h5">
                  Adjustable Computer Table
                </h4>

                <div class="d-flex align-center gap-1">
                  <VRating
                    model-value="4"
                    readonly
                    color="warning"
                    size="small"
                    density="compact"
                  />
                  <span>(50 Review)</span>
                </div>

                <h6 class="text-base font-weight-medium mt-5">
                  Price
                </h6>
                <h6 class="text-h6 mb-3">
                  $1,419
                </h6>

                <VChip
                  label
                  density="comfortable"
                  color="success"
                >
                  In Stock
                </VChip>

                <p class="mt-4">
                  Description
                </p>

                <ul class="ms-6">
                  <li
                    v-for="des in description"
                    :key="des"
                    class="mb-2"
                  >
                    {{ des }}
                  </li>
                </ul>

                <h6 class="text-h6 mt-6">
                  Specifications
                </h6>
                <VDivider class="my-3" />
                <p class="mb-0">
                  MULTI-PURPOSE STANDING DESK: This electric standing computer desk with a large rectangle tabletop (L47.2" x W23.6") can be used as home writing desks, PC desks, gaming desks, office desk, or workstations, providing ample space for office products, being able to hold at least 2 screens at the same time. You can sit or stand for working by using this desk.
                </p>
              </div>
            </VCol>

            <VCol cols="12">
              <h6 class="text-base font-weight-medium">
                Suggestions
              </h6>

              <VDivider class="my-3" />

              <VDataTable
                :headers="headers"
                :items="products"
                :items-per-page="5"
                class="table-borderless text-no-wrap"
              >
                <template #item.name="{ item }">
                  <div class="d-flex align-center gap-2">
                    <VAvatar
                      size="56"
                      :image="item.raw.image"
                    />
                    <span>{{ item.raw.name }}</span>
                  </div>
                </template>

                <template #item.price="{ item }">
                  ${{ item.raw.price }}
                </template>

                <template #item.rating="{ item }">
                  <VRating
                    color="warning"
                    density="compact"
                    size="22"
                    readonly
                    :model-value="item.raw.rating"
                  />
                </template>

                <template #item.discount="{ item }">
                  <VChip
                    label
                    color="primary"
                    density="comfortable"
                    class="text-capitalize"
                  >
                    {{ item.raw.discount }}%
                  </VChip>
                </template>

                <template #bottom />
              </VDataTable>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

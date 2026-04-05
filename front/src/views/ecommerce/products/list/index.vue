<script setup lang="ts">
import type { Product } from '@/plugins/apis/types'
import axios from '@axios'
import { VDataTable } from 'vuetify/labs/VDataTable'

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
    title: 'List',
    disabled: true,
  },
]

const products = ref<Product[]>([])

const headers = [
  {
    title: 'ID',
    key: 'id',
  },
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
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const searchProduct = ref('')

onMounted(() => {
  axios.get('/products').then(response => {
    products.value = response.data.products
  })
})

// delete product
const deleteProduct = (productId: number) => {
  axios.get('/product/delete', {
    params: {
      productId,
    },
  }).then(response => {
    products.value = response.data
  })
}
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

    <!-- data table and filter -->
    <VCol cols="12">
      <VCard title="Product">
        <template #append>
          <div style="width: 10rem;">
            <VTextField
              v-model="searchProduct"
              density="compact"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search..."
            />
          </div>
        </template>

        <VDataTable
          :search="searchProduct"
          show-select
          :headers="headers"
          :items="products"
          :items-per-page="8"
          class="table-borderless rounded-0 text-no-wrap "
        >
          <template #item.id="{ item }">
            <RouterLink
              :to="{ name: 'apps-invoice-details', params: { id: item.raw.id } }"
              class="product-id"
            >
              {{ item.raw.id }}
            </RouterLink>
          </template>

          <template #item.name="{ item }">
            <div class="d-flex align-center gap-2">
              <VAvatar :image="item.raw.image" />
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

          <template #item.actions="{ item }">
            <div>
              <VBtn
                icon
                variant="plain"
                size="x-small"
                :to="{ name: 'ecommerce-products-overview' }"
              >
                <VIcon
                  size="20"
                  icon="mdi-eye-outline"
                />

                <VTooltip activator="parent">
                  View
                </VTooltip>
              </VBtn>

              <VBtn
                icon
                variant="plain"
                size="x-small"
              >
                <VIcon
                  size="20"
                  icon="mdi-pencil-outline"
                />

                <VTooltip activator="parent">
                  Edit
                </VTooltip>
              </VBtn>

              <VBtn
                icon
                variant="plain"
                size="x-small"
                @click="deleteProduct(item.raw.id)"
              >
                <VIcon
                  size="20"
                  icon="mdi-delete-outline"
                />

                <VTooltip activator="parent">
                  Delete
                </VTooltip>
              </VBtn>
            </div>
          </template>
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.product-id {
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));

  &:hover {
    color: rgba(var(--v-theme-primary), var(--v-high-emphasis-opacity));
  }
}
</style>

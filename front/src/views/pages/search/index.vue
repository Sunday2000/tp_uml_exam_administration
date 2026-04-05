<script setup lang="ts">
import cover from '@/assets/pages/cover.jpg'
import type { Product } from '@/plugins/apis/types'
import axios from '@axios'
import { VDataIterator } from 'vuetify/labs/VDataIterator'

interface Filter {
  text: string
  value: string
  prependIcon: string
}

const tags = ref(['low-to-high-price', 'high-to-low-price', 'categories', 'colors', 'sizes'])

const filters = ref<Filter[]>([
  {
    text: 'Low to high price',
    value: 'low-to-high-price',
    prependIcon: 'mdi-trending-up',
  },
  {
    text: 'High to low price',
    value: 'high-to-low-price',
    prependIcon: 'mdi-trending-down',
  },
  {
    text: 'Categories',
    value: 'categories',
    prependIcon: 'mdi-shape-outline',
  },
  {
    text: 'Colors',
    value: 'colors',
    prependIcon: 'mdi-palette-outline',
  },
  {
    text: 'Sizes',
    value: 'sizes',
    prependIcon: 'mdi-arrow-expand',
  },
])

const products = ref<Product[]>([])
const search = ref('')
const page = ref(1)
const ItemPerPage = ref(6)

onMounted(() => {
  axios.get('/products', {
    params: {
      q: search.value,
    },
  }).then(response => {
    products.value = response.data.products
  })
})

const removeTag = (tag: string) => {
  const index = tags.value.findIndex(i => i === tag)

  tags.value.splice(index, 1)
}

const totalPages = computed(() => {
  if (products.value)
    return Math.ceil(products.value.length / ItemPerPage.value)
})

// breadcrumbs
const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Pages',
    disabled: true,
  },
  {
    title: 'Search',
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
      <VCard>
        <VImg
          :src="cover"
          height="160"
          cover
          gradient="to bottom, rgba(0,0,0,.6), rgba(0,0,0,.5)"
        />
        <VCardText
          class="d-flex flex-column align-center"
          style="margin-top: -7rem;"
        >
          <h4
            class="text-h4 text-white mb-6"
            style="z-index: 2;"
          >
            Search Products
          </h4>
          <div class="w-100">
            <VTextField
              v-model="search"
              variant="solo"
              density="default"
              prepend-inner-icon="mdi-magnify"
              placeholder="Type your keywords"
              bg-color="surface"
              style="max-width: 40rem;"
              class="mx-auto"
            >
              <template #append-inner>
                <VBtn
                  color="info"
                  size="small"
                  elevation="0"
                  icon="mdi-arrow-right"
                />
              </template>
            </VTextField>
          </div>
        </VCardText>
        <VCardText>
          <div class="d-flex justify-space-between gap-4 mt-10">
            <VTabs>
              <VTab
                v-for="item in ['All Items', 'Women', 'Man', 'Jewels', 'Kids']"
                :key="item"
              >
                {{ item }}
              </VTab>
            </VTabs>
            <div>
              <VBtn
                color="info"
                prepend-icon="mdi-filter-outline"
              >
                Filters
                <VMenu activator="parent">
                  <VList
                    v-model:selected="tags"
                    select-strategy="classic"
                    :items="filters"
                    item-title="text"
                  />
                </VMenu>
              </VBtn>
            </div>
          </div>
          <VDivider />
        </VCardText>
        <VCardText class="d-flex flex-wrap gap-2">
          <VChip
            v-for="tag in tags"
            v-show="filters.filter((f) => f.value === tag).length"
            :key="tag"
            v-bind="filters.filter((f) => f.value === tag)[0]"
            closable
            color="primary"
            close-icon="mdi-close-circle-outline"
            @click:close="removeTag(tag)"
          />
        </VCardText>
        <VCardText>
          <VDataIterator
            v-if="products && products.length"
            :items="products"
            :items-per-page="ItemPerPage"
            :page="page"
            :search="search"
          >
            <template #default="{ items }">
              <VRow>
                <VCol
                  v-for="(item, i) in items"
                  :key="i"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <VCard variant="outlined">
                    <VCardText class="d-flex justify-space-between">
                      <VChip color="Primary">
                        {{ item.raw.discount }}%
                        Off
                      </VChip>
                      <VBtn
                        icon
                        variant="text"
                        size="small"
                        class="mt-n1"
                      >
                        <VIcon
                          size="24"
                          color="error"
                          icon="mdi-heart"
                        />
                      </VBtn>
                    </VCardText>
                    <VCardText class="bg-background">
                      <VImg
                        :src="item.raw.image"
                        height="200"
                      />
                    </VCardText>
                    <VCardText class="d-flex mt-n7 pb-0">
                      <VSpacer />
                      <VBtn
                        icon
                        elevation="10"
                        color="success"
                      >
                        <VIcon
                          size="24"
                          icon="mdi-cart-plus"
                        />
                      </VBtn>
                    </VCardText>
                    <VCardText class="mt-4">
                      <div class="d-flex align-center justify-space-between mb-4">
                        <div>
                          <h6 class="text-h6">
                            {{ item.raw.name }}
                          </h6>
                          <span class="text-medium-emphasis text-truncate">{{ item.raw.details[0] }}</span>
                        </div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <VBtn
                          variant="outlined"
                          color="primary"
                        >
                          ${{ item.raw.price }}
                        </VBtn>
                        <div class="d-flex align-center gap-2">
                          <VIcon
                            size="24"
                            icon="mdi-star"
                            color="warning"
                          />
                          <span class="text-base font-weight-semibold">{{ item.raw.rating }}</span>
                          <span>({{ item.raw.totalReview }} Reviews)</span>
                        </div>
                      </div>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>
            </template>
          </VDataIterator>
        </VCardText>
        <VCardText>
          <VPagination
            v-model="page"
            :length="totalPages"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

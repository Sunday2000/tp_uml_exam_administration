<script setup lang="ts">
import tableProduct from '@/assets/product/online-school-equipment-home-2.jpg'
import FloatingCard from '@/components/FloatingCard.vue'

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
    title: 'Edit',
    disabled: true,
  },
]

const productData = ref({
  name: 'Adjustable Table',
  weight: '20 kg',
  collection: 'Furniture',
  price: 200,
  quantity: 20,
  categories: 'Furniture',
  descriptions: 'This electric standing computer desk with a large rectangle tabletop can be used as writing desks.',
})

const socialLinks = ref({
  shoppifyHandle: 'shoppify',
  facebookAccount: 'facebook',
  instagramAccount: 'instagram',
})

const pricing = ref({
  price: 200,
  currency: 'CNY',
  sku: 'SKU-123',
  tags: 'Furniture, Electronics, Clothing, Accessories',
})
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
      cols="12"
      md="4"
    >
      <FloatingCard
        title="Adjustable Table"
        subtitle="Furniture"
        :image="{ src: tableProduct }"
      >
        <template #append>
          <VBtn color="primary">
            Edit
          </VBtn>
        </template>

        <VCardText>
          This electric standing computer desk with a large rectangle tabletop can be used as writing desks.
        </VCardText>
      </FloatingCard>
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <VCard title="Product Information">
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="productData.name"
                  placeholder="Name"
                  label="Name"
                />
              </VCol>

              <VCol
                cols="12"
                md="4"
                sm="6"
              >
                <VTextField
                  v-model="productData.weight"
                  placeholder="Weight"
                  label="Weight"
                />
              </VCol>

              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="productData.collection"
                  label="Collection"
                  placeholder="Collection"
                />
              </VCol>

              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="productData.price"
                  label="Price"
                  placeholder="Price"
                />
              </VCol>

              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  v-model="productData.quantity"
                  label="Quantity"
                  placeholder="Quantity"
                />
              </VCol>

              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VSelect
                  v-model="productData.categories"
                  label="Categories"
                  placeholder="Categories"
                  :items="['Furniture', 'Electronics', 'Clothing', 'Accessories']"
                />
              </VCol>

              <VCol cols="12">
                <VTextarea
                  v-model="productData.descriptions"
                  placeholder="Descriptions..."
                  label="Descriptions"
                  rows="3"
                />
              </VCol>

              <VCol cols="12">
                <VBtn
                  type="submit"
                  color="success"
                  class="me-4"
                >
                  Update
                </VBtn>

                <VBtn
                  variant="outlined"
                  color="error"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <VCard title="Socials">
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="socialLinks.shoppifyHandle"
                  label="Shoppify Handle"
                  placeholder="Shoppify Handle"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="socialLinks.facebookAccount"
                  label="Facebook Account"
                  placeholder="Facebook Account"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="socialLinks.instagramAccount"
                  label="Instagram Account"
                  placeholder="Instagram Account"
                />
              </VCol>

              <VCol cols="12">
                <VBtn
                  type="submit"
                  color="success"
                  class="me-4"
                >
                  Update
                </VBtn>

                <VBtn
                  color="error"
                  variant="outlined"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <VCard title="Pricing">
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol
                cols="12"
                sm="4"
              >
                <VTextField
                  v-model="pricing.price"
                  label="Price"
                />
              </VCol>

              <VCol
                cols="12"
                sm="4"
              >
                <VSelect
                  v-model="pricing.currency"
                  label="CNY"
                  :items="['BTC', 'CNY', 'USD', 'EUR', 'GBP', 'JPY', 'KRW', 'RUB']"
                />
              </VCol>

              <VCol
                cols="12"
                sm="4"
              >
                <VTextField
                  v-model="pricing.sku"
                  label="SKU"
                />
              </VCol>

              <VCol cols="12">
                <VTextarea
                  v-model="pricing.tags"
                  rows="3"
                  label="Tags"
                />
              </VCol>

              <VCol cols="12">
                <VBtn
                  type="submit"
                  color="success"
                  class="me-4"
                >
                  Update
                </VBtn>

                <VBtn
                  color="error"
                  variant="outlined"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

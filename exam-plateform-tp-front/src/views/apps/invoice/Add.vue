<script setup lang="ts">
import AppLogo from '@/components/Logo.vue'
import type { Invoice } from '@/plugins/apis/types'
import { appConfig } from '@appConfig'
import VueDatePicker from '@vuepic/vue-datepicker'
import { VForm } from 'vuetify/components/VForm'

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Invoice',
    disabled: true,
  },
  {
    title: 'Edit',
    disabled: true,
  },
]

const invoice = ref<Invoice>({
  // invoice number should be unique and auto generated in database
  invoiceNumber: '',
  customerName: '',
  invoiceDate: null,
  dueDate: null,
  totalAmount: 0,
  status: '',
  from: {
    name: 'Xyz Pvt Ltd',
    address: '754 Broadway Avenue - New York, NY / 10013',
    phone: '990-588-5716',
  },
  to: {
    name: '',
    address: '',
    phone: '',
  },
  products: [
    {
      name: '',
      description: '',
      quantity: 0,
      price: 0,
    },
  ],
})

// product remove
const removeProduct = (index: number) => {
  invoice.value?.products.splice(index, 1)
}

// sub total amount calculation
const subTotal = computed(() => {
  if (invoice.value?.products.length) {
    return invoice.value?.products.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)
  }

  return 0
})

const toggleFrom = ref(false)
const toggleTo = ref(false)
const toggleNewProduct = ref(false)
const required = (v: string) => !!v || 'Name is required'

const refAddNewProduct = ref<VForm>()

const formNewProduct = ref({
  name: '',
  description: '',
  price: 0,
  quantity: 0,
})

const discount = ref(0)
const taxes = ref(0)

const totalPrice = computed(() => {
  return (q: number, p: number) => q * p
})

const addNewProduct = () => {
  refAddNewProduct.value?.validate().then(isValid => {
    if (isValid.valid) {
      invoice.value?.products.push({
        name: formNewProduct.value.name,
        description: formNewProduct.value.description,
        price: formNewProduct.value.price,
        quantity: formNewProduct.value.quantity,
      })
      toggleNewProduct.value = false
      refAddNewProduct.value?.reset()
    }
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

    <VCol cols="12">
      <VCard class="invoice-add-card">
        <!-- Invoice logo, number and status -->
        <VCardText class="d-flex justify-space-between">
          <div class="d-flex align-center gap-2">
            <AppLogo class="text-primary" />
            <h6 class="text-h6 font-weight-bold mb-0">
              {{ appConfig.title.value }}
            </h6>
          </div>
        </VCardText>

        <!-- Invoice Address and dates -->
        <VCardText>
          <VRow>
            <!-- Invoice from -->
            <VCol
              cols="12"
              sm="6"
            >
              <div class="d-flex align-center justify-space-between">
                <span class="font-weight-medium">
                  INVOICE FROM
                </span>

                <VBtn
                  color="primary"
                  variant="text"
                  density="compact"
                  @click="toggleFrom = !toggleFrom"
                >
                  {{ toggleFrom ? 'save' : 'Change' }}
                </VBtn>
              </div>

              <VTextField
                v-model="invoice.from.name"
                :variant="toggleFrom ? 'underlined' : 'plain'"
                density="compact"
                placeholder="Name"
                :readonly="!toggleFrom"
                hide-details
              />

              <VTextField
                v-model="invoice.from.address"
                :variant="toggleFrom ? 'underlined' : 'plain'"
                density="compact"
                placeholder="Address"
                :readonly="!toggleFrom"
                hide-details
              />

              <VTextField
                v-model="invoice.from.phone"
                :variant="toggleFrom ? 'underlined' : 'plain'"
                hide-details
                placeholder="Phone"
                :readonly="!toggleFrom"
                density="compact"
              >
                <template #prepend-inner>
                  <VIcon
                    size="18"
                    icon="mdi-phone-outline"
                    class="mt-2"
                  />
                </template>
              </VTextField>
            </VCol>

            <!-- Invoice To -->
            <VCol
              cols="12"
              sm="6"
            >
              <div class="d-flex align-center justify-space-between">
                <span class="font-weight-medium">
                  INVOICE TO
                </span>

                <VBtn
                  color="primary"
                  variant="text"
                  density="compact"
                  @click="toggleTo = !toggleTo"
                >
                  {{ toggleTo ? 'save' : 'Change' }}
                </VBtn>
              </div>

              <VTextField
                v-model="invoice.to.name"
                :variant="toggleTo ? 'underlined' : 'plain'"
                density="compact"
                placeholder="Name"
                :readonly="!toggleTo"
                hide-details
              />

              <VTextField
                v-model="invoice.to.address"
                :variant="toggleTo ? 'underlined' : 'plain'"
                density="compact"
                placeholder="Address"
                :readonly="!toggleTo"
                hide-details
              />

              <VTextField
                v-model="invoice.to.phone"
                :variant="toggleTo ? 'underlined' : 'plain'"
                density="compact"
                placeholder="Phone"
                :readonly="!toggleTo"
                hide-details
              >
                <template #prepend-inner>
                  <VIcon
                    size="18"
                    icon="mdi-phone-outline"
                    class="mt-2"
                  />
                </template>
              </VTextField>
            </VCol>

            <!-- created date -->
            <VCol cols="6">
              <p class="font-weight-medium">
                DATE CREATE
              </p>

              <VueDatePicker
                v-model="invoice.invoiceDate"
                auto-apply
                :enable-time-picker="false"
                style="max-width: 10rem;"
                :teleport="true"
                :dark="$vuetify.theme.current.dark"
              />
            </VCol>

            <!-- due date -->
            <VCol cols="6">
              <p class="font-weight-medium">
                DUE DATE
              </p>

              <VueDatePicker
                v-model="invoice.dueDate"
                auto-apply
                :teleport="true"
                :enable-time-picker="false"
                style="max-width: 10rem;"
                :dark="$vuetify.theme.current.dark"
              />
            </VCol>
          </VRow>
        </VCardText>

        <!-- Product Details -->
        <VCardText>
          <div class="d-flex justify-space-between flex-wrap pb-2">
            <h6 class="text-h6">
              Product Details
            </h6>

            <VBtn
              size="small"
              color="primary"
              variant="text"
              prepend-icon="mdi-plus"
              @click="toggleNewProduct = !toggleNewProduct"
            >
              Add Product
            </VBtn>
          </div>

          <VDivider />

          <!-- Add New product dialog -->
          <VDialog
            v-model="toggleNewProduct"
            max-width="600"
          >
            <VCard title="Add Product">
              <VCardText>
                <VForm ref="refAddNewProduct">
                  <VRow>
                    <VCol cols="12">
                      <VTextField
                        v-model="formNewProduct.name"
                        label="Title"
                        :rules="[required]"
                      />
                    </VCol>
                    <VCol cols="12">
                      <VTextField
                        v-model="formNewProduct.description"
                        :rules="[required]"
                        label="Description"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      sm="6"
                    >
                      <VTextField
                        v-model="formNewProduct.quantity"
                        label="Quantity"
                        :rules="[required]"
                        type="number"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      sm="6"
                    >
                      <VTextField
                        v-model="formNewProduct.price"
                        label="Price"
                        :rules="[required]"
                        type="number"
                      />
                    </VCol>

                    <VCol cols="12">
                      <VBtn
                        variant="tonal"
                        color="secondary"
                        type="reset"
                        class="me-4"
                        @click="toggleNewProduct = false"
                      >
                        Cancel
                      </VBtn>

                      <VBtn
                        variant="tonal"
                        color="success"
                        @click="addNewProduct"
                      >
                        Submit
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCardText>
            </VCard>
          </VDialog>

          <!-- Product List -->
          <VList lines="two">
            <template
              v-for="(item, index) in invoice.products"
              :key="item.name"
            >
              <VListItem class="px-0">
                <div class="d-flex gap-4 flex-column flex-sm-row flex-wrap my-3">
                  <div class="d-flex flex-grow-1 gap-4">
                    <VTextField
                      v-model="item.name"
                      label="Title"
                    />

                    <VTextField
                      v-model="item.description"
                      label="Description"
                    />
                  </div>

                  <div class="d-flex gap-4">
                    <VTextField
                      v-model="item.quantity"
                      label="Quantity"
                      type="number"
                      class="product-input-field-size"
                    />

                    <VTextField
                      v-model="item.price"
                      label="Price"
                      type="number"
                      class="product-input-field-size"
                    />

                    <VTextField
                      :model-value="totalPrice(item.quantity, item.price)"
                      label="Total"
                      class="product-input-field-size"
                    />
                  </div>
                </div>
                <!-- Product remove button -->
                <div class="text-end">
                  <VBtn
                    size="small"
                    color="error"
                    variant="text"
                    prepend-icon="mdi-delete-outline"
                    @click="removeProduct(index)"
                  >
                    Remove
                  </VBtn>
                </div>
              </VListItem>

              <VDivider />
            </template>
          </VList>

          <div class="d-flex justify-end mt-5">
            <div style="width: 12rem;">
              <div class="d-flex gap-3 mb-4">
                <VTextField
                  v-model="discount"
                  density="compact"
                  label="Discount"
                  type="number"
                />
                <VTextField
                  v-model="taxes"
                  density="compact"
                  label="Tax"
                  type="number"
                />
              </div>

              <p class="d-flex justify-space-between">
                <span class="font-weight-medium">Subtotal</span>
                <span>${{ subTotal }}</span>
              </p>
              <p class="d-flex justify-space-between">
                <span class="font-weight-medium">Discount</span>
                <span class="text-error">-${{ discount }}</span>
              </p>
              <p class="d-flex justify-space-between">
                <span class="font-weight-medium">Taxes</span>
                <span>${{ taxes }}</span>
              </p>
              <p class="d-flex justify-space-between">
                <span class="font-weight-medium">Total</span>
                <span>${{ (subTotal + taxes) - discount }}</span>
              </p>
            </div>
          </div>
        </VCardText>

        <VDivider />

        <VCardActions>
          <VSpacer />
          <VBtn color="secondary">
            Save as Draft
          </VBtn>
          <VBtn color="success">
            Create
          </VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@/styles/libs/vue-datepicker.scss";

.product-input-field-size {
  max-inline-size: 5rem;
  min-inline-size: 5rem;
}
</style>

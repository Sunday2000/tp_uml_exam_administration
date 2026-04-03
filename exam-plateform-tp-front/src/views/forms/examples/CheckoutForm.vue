<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'
import 'cleave.js/dist/addons/cleave-phone.gt'
import { toast } from 'vue3-toastify'
import { useRtl } from 'vuetify'
import { VStepper, VStepperHeader, VStepperItem, VStepperWindow, VStepperWindowItem } from 'vuetify/labs/VStepper'

const rtl = useRtl()

const currentStep = ref(0)

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  company: '',
  companyId: '',
  billingAddress: '',
  zipCode: '',
  city: undefined,
  Country: undefined,
  cardName: '',
  cardNumber: '',
  cardExpiryDate: undefined,
  cardCvv: '',
  messageToSeller: '',
})

const products = [
  {
    name: 'StellarGlow Facial Cream',
    desc: 'Achieve radiant and youthful skin with our StellarGlow Facial Cream.',
    price: 24.99,
    quantity: 3,
    totalPrice: 74.97,
  },
  {
    name: 'TurboTech Wireless Earbuds',
    desc: 'Experience the ultimate freedom with our TurboTech Wireless Earbuds.',
    price: 39.99,
    quantity: 2,
    totalPrice: 79.98,
  },
  {
    name: 'AquaWave Water Bottle',
    desc: 'Stay hydrated on the go with our AquaWave Water Bottle.',
    price: 12.49,
    quantity: 5,
    totalPrice: 62.45,
  },
  {
    name: 'RoboClean Smart Vacuum',
    desc: 'Make cleaning a breeze with the RoboClean Smart Vacuum.',
    price: 149.99,
    quantity: 1,
    totalPrice: 149.99,
  },
  {
    name: 'LuminaFlex LED Strip Lights',
    desc: 'Create the perfect ambiance with our LuminaFlex LED Strip Lights. ',
    price: 19.99,
    quantity: 4,
    totalPrice: 79.96,
  },
]

const submit = () => {
  toast('Form Submitted Successfully!', {
    rtl: rtl.isRtl.value,
  })
}

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Forms',
    disabled: true,
  },
  {
    title: 'Checkout',
    disabled: true,
  },
]
</script>

<template>
  <VRow>
    <!-- Breadcrumbs -->
    <VCol cols="12">
      <VBreadcrumbs
        divider="-"
        :items="breadcrumbs"
        class="pa-0 "
      />
    </VCol>

    <VCol cols="12">
      <VStepper v-model="currentStep">
        <VStepperHeader>
          <VStepperItem
            title="Billing Details"
            color="primary"
            edit-icon="mdi-text"
            editable
            :complete="currentStep === 1"
          />

          <VDivider />

          <VStepperItem
            title="Payment Details"
            color="primary"
            edit-icon="mdi-currency-usd"
            editable
            :complete="currentStep === 2"
          />

          <VDivider />

          <VStepperItem
            title="Order info"
            color="primary"
            edit-icon="mdi-account-group"
            editable
            :complete="currentStep === 3"
          />

          <VDivider />

          <VStepperItem
            title="Message to the seller"
            color="primary"
            edit-icon="mdi-message-outline"
            editable
            :complete="currentStep === 4"
          />
        </VStepperHeader>

        <VForm @submit.prevent="submit">
          <VStepperWindow
            v-model="currentStep"
            :touch="false"
          >
            <VStepperWindowItem>
              <VRow>
                <VCol cols="12">
                  <h6 class="text-h6">
                    Billing Details
                  </h6>
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="formData.firstName"
                    label="First Name"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="formData.lastName"
                    label="Last Name"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="formData.email"
                    label="Email"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <CleaveInput
                    v-model="formData.phoneNumber"
                    label="Phone Number"
                    :options="{
                      phone: true,
                      phoneRegionCode: 'GT',
                    }"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="7"
                >
                  <VTextField
                    v-model="formData.company"
                    label="Company"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="5"
                >
                  <VTextField
                    v-model="formData.companyId"
                    label="Company ID"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="7"
                >
                  <VTextField
                    v-model="formData.billingAddress"
                    label="Billing Address"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="5"
                >
                  <VTextField
                    v-model="formData.zipCode"
                    label="Zip-Code"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="formData.city"
                    label="City"
                    :items="[
                      'New York',
                      'Los Angeles',
                      'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego',
                    ]"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="formData.Country"
                    label="Country"
                    :items="[
                      'America', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Cambodia', 'Congo',
                      'Finland', 'France', 'Ghana', 'Iceland',
                    ]"
                  />
                </VCol>

                <VCol cols="12">
                  <div class="d-flex flex-wrap gap-4 justify-space-between">
                    <VBtn
                      color="default"
                      disabled
                    >
                      Previous
                    </VBtn>

                    <VBtn
                      color="primary"
                      @click="currentStep++"
                    >
                      Next
                    </VBtn>
                  </div>
                </VCol>
              </VRow>
            </VStepperWindowItem>

            <VStepperWindowItem>
              <VRow>
                <VCol cols="12">
                  <h6 class="text-h6">
                    Payment Details
                  </h6>
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <CleaveInput
                    v-model="formData.cardNumber"
                    label="Card Number"
                    :options="{
                      creditCard: true,
                    }"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="formData.cardName"
                    label="Card Holder Name"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <CleaveInput
                    v-model="formData.cardExpiryDate"
                    label="Expiry Date"
                    :options="{
                      date: true,
                      datePattern: ['m', 'y'],
                    }"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <CleaveInput
                    v-model="formData.cardCvv"
                    label="CVV"
                    :options="{
                      blocks: [3],
                      numericOnly: true,
                    }"
                  />
                </VCol>

                <VCol cols="12">
                  <div class="d-flex flex-wrap gap-4 justify-space-between">
                    <VBtn
                      color="secondary"
                      @click="currentStep--"
                    >
                      Previous
                    </VBtn>

                    <VBtn
                      color="primary"
                      @click="currentStep++"
                    >
                      Next
                    </VBtn>
                  </div>
                </VCol>
              </VRow>
            </VStepperWindowItem>

            <VStepperWindowItem>
              <VRow>
                <VCol cols="12">
                  <h6 class="text-h6">
                    Order info
                  </h6>
                </VCol>

                <VCol cols="12">
                  <VTable class="text-no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="(product, index) in products"
                        :key="product.name"
                      >
                        <td>{{ index + 1 }}.</td>
                        <td>
                          <div class="py-2">
                            <h6 class="text-base font-weight-medium">
                              {{ product.name }}
                            </h6>
                            <span class="text-medium-emphasis">{{ product.desc }}</span>
                          </div>
                        </td>
                        <td>{{ product.quantity }}</td>
                        <td>${{ product.price }}</td>
                        <td>${{ product.totalPrice }}</td>
                      </tr>
                    </tbody>
                  </VTable>
                </VCol>

                <VCol cols="12">
                  <div class="d-flex flex-wrap gap-4 justify-space-between">
                    <VBtn
                      color="secondary"
                      @click="currentStep--"
                    >
                      Previous
                    </VBtn>

                    <VBtn
                      color="primary"
                      @click="currentStep++"
                    >
                      Next
                    </VBtn>
                  </div>
                </VCol>
              </VRow>
            </VStepperWindowItem>

            <VStepperWindowItem>
              <VRow>
                <VCol cols="12">
                  <h6 class="text-h6">
                    Message to the seller
                  </h6>
                </VCol>

                <VCol cols="12">
                  <VTextarea
                    v-model="formData.messageToSeller"
                    label="Write Message"
                  />
                </VCol>

                <VCol cols="12">
                  <div class="d-flex flex-wrap gap-4 justify-space-between">
                    <VBtn
                      color="secondary"
                      @click="currentStep--"
                    >
                      Previous
                    </VBtn>

                    <VBtn
                      type="submit"
                      color="success"
                    >
                      Submit
                    </VBtn>
                  </div>
                </VCol>
              </VRow>
            </VStepperWindowItem>
          </VStepperWindow>
        </VForm>
      </VStepper>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@import "vue3-toastify/dist/index.css";
@import "@/styles/libs/toastify";
</style>

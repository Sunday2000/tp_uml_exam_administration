<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useRtl, useTheme } from 'vuetify'
import { VForm } from 'vuetify/components/VForm'
import { VStepper, VStepperHeader, VStepperItem, VStepperWindow, VStepperWindowItem } from 'vuetify/labs/VStepper'

const vuetifyTheme = useTheme()
const isRtl = useRtl()

const productData = ref({
  name: '',
  weight: '',
  collection: '',
  price: '',
  quantity: '',
  categories: null,
  descriptions: '',
})

const socialLinks = ref({
  shopifyHandle: '',
  facebookAccount: '',
  instagramAccount: '',
})

const pricing = ref({
  price: '',
  currency: null,
  sku: '',
  tags: '',
})

const productImages = ref({
  featureImage: [],
  productImageSmall: [],
  productThumbnail: [],
  productVideo: [],
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
    title: 'Add',
    disabled: true,
  },
]

const currentStep = ref(0)

const isInfoStepValid = ref(true)
const isSocialStepValid = ref(true)
const isPricingStepValid = ref(true)

const refProductInfoForm = ref<VForm>()
const refSocialForm = ref<VForm>()
const refPricingForm = ref<VForm>()

const validateProductInfoForm = () => {
  refProductInfoForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isInfoStepValid.value = true
    }
    else { isInfoStepValid.value = false }
  })
}

const validateSocialForm = () => {
  refSocialForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isSocialStepValid.value = true
    }
    else { isSocialStepValid.value = false }
  })
}

const validatePricingForm = () => {
  refPricingForm.value?.validate().then(valid => {
    if (valid.valid) {
      isPricingStepValid.value = true
      toast('Form Submitted!', {
        theme: vuetifyTheme.current.value.dark ? 'dark' : 'light',
        rtl: isRtl.isRtl.value,
        autoClose: 1000,
      })
    }
    else { isPricingStepValid.value = false }
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
      <h4 class="text-h5 font-weight-medium text-center mb-2">
        Add New Product
      </h4>
      <p class="text-lg text-disabled text-center mb-6">
        This information will let us know more about you.
      </p>

      <VStepper v-model="currentStep">
        <VStepperHeader>
          <VStepperItem
            title="Product Info"
            color="primary"
            icon="mdi-help"
            :error="!isInfoStepValid"
            :complete="currentStep === 1"
          />

          <VDivider />

          <VStepperItem
            title="Media"
            color="primary"
            icon="mdi-image"
            :complete="currentStep === 2"
          />

          <VDivider />

          <VStepperItem
            title="Social"
            color="primary"
            icon="mdi-account-group"
            :error="!isSocialStepValid"
            :complete="currentStep === 3"
          />

          <VDivider />

          <VStepperItem
            title="Pricing"
            color="primary"
            icon="mdi-currency-usd"
            :error="!isPricingStepValid"
            :complete="currentStep === 4"
          />
        </VStepperHeader>

        <VStepperWindow
          v-model="currentStep"
          :touch="false"
        >
          <VStepperWindowItem>
            <VForm
              ref="refProductInfoForm"
              @submit.prevent="validateProductInfoForm"
            >
              <VRow>
                <VCol
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <VTextField
                    v-model="productData.name"
                    placeholder="Name"
                    :rules="[v => !!v || 'Name field is required']"
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
                    :rules="[v => !!v || 'Weight field is required']"
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
                    :rules="[v => !!v || 'Collection filed is required']"
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
                    :rules="[v => !!v || 'Price filed is required']"
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
                    :rules="[v => !!v || 'Quantity filed is required']"
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
                    :rules="[v => !!v || 'Categories filed is required']"
                    :items="['Furniture', 'Electronics', 'Clothing', 'Accessories']"
                  />
                </VCol>

                <VCol cols="12">
                  <VTextarea
                    v-model="productData.descriptions"
                    placeholder="Descriptions..."
                    label="Descriptions"
                    :rules="[v => !!v || 'Descriptions filed is required']"
                    rows="3"
                  />
                </VCol>

                <VCol cols="12">
                  <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center">
                    <VBtn
                      color="default"
                      disabled
                    >
                      Previous
                    </VBtn>

                    <VBtn
                      color="primary"
                      type="submit"
                    >
                      Next
                    </VBtn>
                  </div>
                </VCol>
              </VRow>
            </VForm>
          </VStepperWindowItem>

          <VStepperWindowItem>
            <VForm>
              <VRow>
                <VCol cols="12">
                  <VFileInput
                    v-model="productImages.featureImage"
                    prepend-icon="mdi-image-outline"
                    accept="image/png, image/jpeg, image/bmp"
                    label="Feature Image"
                  />
                </VCol>

                <VCol cols="12">
                  <VFileInput
                    v-model="productImages.productImageSmall"
                    prepend-icon="mdi-image-size-select-large"
                    accept="image/png, image/jpeg, image/bmp"
                    label="Product Image small"
                  />
                </VCol>

                <VCol cols="12">
                  <VFileInput
                    v-model="productImages.productThumbnail"
                    prepend-icon="mdi-image-size-select-large"
                    accept="image/png, image/jpeg, image/bmp"
                    label="Product Thumbnail"
                  />
                </VCol>

                <VCol cols="12">
                  <VFileInput
                    v-model="productImages.productVideo"
                    prepend-icon="mdi-video-outline"
                    accept="video/mp4, video/ogg, video/wmv"
                    label="Product Video"
                  />
                </VCol>

                <VCol cols="12">
                  <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center">
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
            </VForm>
          </VStepperWindowItem>

          <VStepperWindowItem>
            <VForm
              ref="refSocialForm"
              @submit.prevent="validateSocialForm"
            >
              <VRow>
                <VCol cols="12">
                  <VTextField
                    v-model="socialLinks.shopifyHandle"
                    label="Shopify Handle"
                    placeholder="Shopify Handle"
                    :rules="[v => !!v || 'Shopify Handle filed is required']"
                  />
                </VCol>

                <VCol cols="12">
                  <VTextField
                    v-model="socialLinks.facebookAccount"
                    label="Facebook Account"
                    placeholder="Facebook Account"
                    :rules="[v => !!v || 'Facebook Account filed is required']"
                  />
                </VCol>

                <VCol cols="12">
                  <VTextField
                    v-model="socialLinks.instagramAccount"
                    label="Instagram Account"
                    placeholder="Instagram Account"
                    :rules="[v => !!v || 'Instagram Account filed is required']"
                  />
                </VCol>

                <VCol cols="12">
                  <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center">
                    <VBtn
                      color="secondary"
                      @click="currentStep--"
                    >
                      Previous
                    </VBtn>

                    <VBtn
                      color="primary"
                      type="submit"
                    >
                      Next
                    </VBtn>
                  </div>
                </VCol>
              </VRow>
            </VForm>
          </VStepperWindowItem>

          <VStepperWindowItem>
            <VForm
              ref="refPricingForm"
              @submit.prevent="validatePricingForm"
            >
              <VRow>
                <VCol
                  cols="12"
                  sm="4"
                >
                  <VTextField
                    v-model="pricing.price"
                    :rules="[v => !!v || 'Price filed is required']"
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
                    :rules="[v => !!v || 'Currency filed is required']"
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
                    :rules="[v => !!v || 'SKU filed is required']"
                  />
                </VCol>

                <VCol cols="12">
                  <VTextarea
                    v-model="pricing.tags"
                    rows="3"
                    label="Tags"
                    :rules="[v => !!v || 'Tags filed is required']"
                  />
                </VCol>

                <VCol cols="12">
                  <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center">
                    <VBtn
                      color="secondary"
                      @click="currentStep--"
                    >
                      Previous
                    </VBtn>

                    <VBtn
                      color="success"
                      type="submit"
                    >
                      Submit
                    </VBtn>
                  </div>
                </VCol>
              </VRow>
            </VForm>
          </VStepperWindowItem>
        </VStepperWindow>
      </VStepper>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@import "vue3-toastify/dist/index.css";
@import "@/styles/libs/toastify";
</style>

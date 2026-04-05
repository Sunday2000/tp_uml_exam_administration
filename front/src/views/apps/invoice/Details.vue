<script setup lang="ts">
import AppLogo from '@/components/Logo.vue'
import type { Invoice } from '@/plugins/apis/types'
import { useInvoiceStore } from '@/stores/useInvoiceStore'
import { appConfig } from '@appConfig'
import { useRoute } from 'vue-router'

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
    title: 'Details',
    disabled: true,
  },
]

const invoiceStore = useInvoiceStore()

const route = useRoute()

const invoice = ref<Invoice>()

const fetchInvoice = () => {
  const id = route.params.id as string

  invoiceStore.fetchInvoice(id).then(response => {
    invoice.value = response.data[0]
  })
}

onMounted(fetchInvoice)

watch(route, () => {
  fetchInvoice()
})

const subTotal = computed(() => {
  if (invoice.value?.products.length) {
    return invoice.value?.products.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)
  }

  return 0
})

// chip colors
const chipColors: any = {
  unpaid: 'red',
  EMI: 'orange',
  full: 'green',
}

// print
const print = () => {
  window.print()
}
</script>

<template>
  <VRow>
    <!-- Breadcrumbs -->
    <VCol
      cols="12"
      class="d-print-none d-flex align-center flex-wrap"
    >
      <VBreadcrumbs
        :items="breadcrumbs"
        divider="-"
        class="px-0"
      />

      <VSpacer />

      <div class="actions">
        <VBtn
          icon
          size="small"
          variant="text"
          @click="print"
        >
          <VIcon
            size="20"
            icon="mdi-printer-outline"
          />

          <VTooltip activator="parent">
            Print
          </VTooltip>
        </VBtn>

        <VBtn
          icon
          size="small"
          variant="text"
          :to="{ name: 'apps-invoice-edit', params: { id: route.params.id } }"
        >
          <VIcon
            size="20"
            icon="mdi-pencil-outline"
          />

          <VTooltip activator="parent">
            Send
          </VTooltip>
        </VBtn>

        <VBtn
          icon
          size="small"
          variant="text"
        >
          <VIcon
            size="20"
            icon="mdi-send-outline"
          />

          <VTooltip activator="parent">
            Send
          </VTooltip>
        </VBtn>

        <VBtn
          icon
          size="small"
          variant="text"
        >
          <VIcon
            size="22"
            icon="mdi-share-outline"
          />

          <VTooltip activator="parent">
            Share
          </VTooltip>
        </VBtn>
      </div>
    </VCol>

    <VCol
      v-if="invoice?.invoiceNumber"
      cols="12"
    >
      <VCard class="invoice-preview">
        <VCardText class="d-flex justify-space-between">
          <div class="d-flex align-center gap-2">
            <AppLogo class="text-primary" />
            <h6 class="text-h6 font-weight-bold mb-0">
              {{ appConfig.title.value }}
            </h6>
          </div>

          <div class="text-end">
            <VChip
              label
              density="compact"
              :color="chipColors[invoice.status]"
              class="mb-1"
            >
              {{ invoice.status }}
            </VChip>
            <h6 class="text-h6 font-weight-bold mb-0">
              {{ invoice.invoiceNumber }}
            </h6>
          </div>
        </VCardText>

        <VCardText>
          <VRow>
            <VCol
              cols="12"
              sm="6"
            >
              <p class="font-weight-medium">
                INVOICE FROM
              </p>
              <p class="mb-1">
                {{ invoice.from.name }}
              </p>
              <p class="mb-1">
                {{ invoice.from.address }}
              </p>
              <p>Phone: {{ invoice.from.phone }}</p>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <p class="font-weight-medium">
                INVOICE TO
              </p>
              <p class="mb-1">
                {{ invoice.to.name }}
              </p>
              <p class="mb-1">
                {{ invoice.to.address }}
              </p>
              <p>Phone: {{ invoice.to.phone }}</p>
            </VCol>

            <!-- create date -->
            <VCol cols="6">
              <p class="font-weight-medium">
                DATE CREATE
              </p>
              <p>22 Mar 2023</p>
            </VCol>

            <!-- due date -->
            <VCol cols="6">
              <p class="font-weight-medium">
                DUE DATE
              </p>
              <p>{{ invoice.dueDate }}</p>
            </VCol>
          </VRow>
        </VCardText>

        <VCardText>
          <VList lines="two">
            <VListItem title="Description">
              <template #prepend>
                <span class="me-6">#</span>
              </template>

              <template #append>
                <div
                  class="d-flex align-center justify-space-around"
                  style="width: 11.25rem;"
                >
                  <span class="me-8">Qty</span>
                  <span class="me-8">Unit price</span>
                  <span>Total</span>
                </div>
              </template>
            </VListItem>

            <template
              v-for="(item, index) in invoice.products"
              :key="item.name"
            >
              <VDivider />

              <VListItem
                :title="item.name"
                :subtitle="item.description"
              >
                <template #prepend>
                  <span class="me-6">{{ index + 1 }}</span>
                </template>

                <template #append>
                  <div
                    class="d-flex align-center justify-space-around"
                    style="width: 11.25rem;"
                  >
                    <span class="me-8">{{ item.quantity }}</span>
                    <span class="me-8">${{ item.price }}</span>
                    <span>${{ item.price * item.quantity }}</span>
                  </div>
                </template>
              </VListItem>
            </template>
          </VList>

          <div class="d-flex justify-end mt-5">
            <div style="width: 10rem;">
              <p class="d-flex justify-space-between">
                <span class="font-weight-medium">Subtotal</span>
                <span>${{ subTotal }}</span>
              </p>
              <p class="d-flex justify-space-between">
                <span class="font-weight-medium">Discount</span>
                <span class="text-error">-$10</span>
              </p>
              <p class="d-flex justify-space-between">
                <span class="font-weight-medium">Taxes</span>
                <span>$5</span>
              </p>
              <p class="d-flex justify-space-between">
                <span class="font-weight-medium">Total</span>
                <span>${{ subTotal - 10 + 5 }}</span>
              </p>
            </div>
          </div>
        </VCardText>

        <VDivider />

        <VCardText>
          <h6 class="text-base font-weight-medium mb-1">
            NOTES
          </h6>
          <p class="mb-0">
            We appreciate your business. Should you need us to add VAT or extra notes let us know!
          </p>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      v-else
      cols="12"
    >
      <h6 class="text-h6 text-center">
        No invoice found!
      </h6>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@media print {
  @page { margin: 0; }

  .invoice-preview .v-col-12 {
    flex: 0 0 50% !important;
    max-inline-size: 50% !important;
  }

  .v-main {
    padding: 0 !important;
  }

  .v-card {
    box-shadow: none !important;
  }

  .v-container {
    padding: 0 !important;
    inline-size: 100% !important;
  }
}
</style>

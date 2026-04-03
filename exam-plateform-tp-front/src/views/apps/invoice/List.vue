<script setup lang="ts">
import type { Invoice } from '@/plugins/apis/types'
import { useInvoiceStore } from '@/stores/useInvoiceStore'
import { VDataTable } from 'vuetify/labs/VDataTable'

// breadcrumbs
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
    title: 'List',
    disabled: true,
  },
]

const invoiceStore = useInvoiceStore()

const invoices = ref<Invoice[]>([])

const headers = [
  {
    title: 'ID',
    key: 'invoiceNumber',
  },
  {
    title: 'Name',
    key: 'customerName',
  },
  {
    title: 'Invoice Date',
    key: 'invoiceDate',
  },
  {
    title: 'Due Date',
    key: 'dueDate',
  },
  {
    title: 'Amount',
    key: 'totalAmount',
  },
  {
    title: 'status',
    key: 'status',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const searchInvoice = ref('')

// chip colors
const chipColors: any = {
  unpaid: 'red',
  EMI: 'orange',
  full: 'green',
}

onMounted(() => {
  invoiceStore.fetchInvoices().then(response => {
    invoices.value = response.data
  })
})

// delete invoice
const deleteInvoice = (invoiceId: string) => {
  invoiceStore.deleteInvoice(invoiceId).then(response => {
    invoices.value = response.data
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
      <VCard title="Invoices">
        <template #append>
          <VBtn
            :to="{ name: 'apps-invoice-add' }"
            color="primary"
          >
            New Invoice
          </VBtn>
        </template>

        <VCardText>
          <VTextField
            v-model="searchInvoice"
            density="compact"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
          />
        </VCardText>

        <VDataTable
          :search="searchInvoice"
          show-select
          :headers="headers"
          :items="invoices"
          :items-per-page="8"
          class="table-borderless rounded-0 text-no-wrap"
        >
          <template #item.invoiceNumber="{ item }">
            <RouterLink
              :to="{ name: 'apps-invoice-details', params: { id: item.raw.invoiceNumber } }"
              class="invoice-number"
            >
              {{ item.raw.invoiceNumber }}
            </RouterLink>
          </template>

          <template #item.totalAmount="{ item }">
            ${{ item.raw.totalAmount }}
          </template>

          <template #item.status="{ item }">
            <VChip
              label
              density="comfortable"
              :color="chipColors[item.raw.status]"
              class="text-capitalize"
            >
              {{ item.raw.status }}
            </VChip>
          </template>

          <template #item.actions="{ item }">
            <div>
              <VBtn
                icon
                variant="plain"
                size="x-small"
                :to="{ name: 'apps-invoice-details', params: { id: item.raw.invoiceNumber } }"
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
                :to="{ name: 'apps-invoice-edit', params: { id: item.raw.invoiceNumber } }"
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
                @click="deleteInvoice(item.raw.invoiceNumber)"
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
.invoice-number {
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));

  &:hover {
    color: rgba(var(--v-theme-primary), var(--v-high-emphasis-opacity));
  }
}
</style>

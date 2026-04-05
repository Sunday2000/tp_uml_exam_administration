<script setup lang="ts">
import type { DataTableHeader } from '@/plugins/apis/types'
import axios from '@axios'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const headers: DataTableHeader[] = [
  {
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Calories', key: 'calories', align: 'end' },
  { title: 'Fat (g)', key: 'fat', align: 'end' },
  { title: 'Carbs (g)', key: 'carbs', align: 'end' },
  { title: 'Protein (g)', key: 'protein', align: 'end' },
  { title: 'Iron (%)', key: 'iron', align: 'end' },
]

const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)
const itemsPerPage = ref(5)

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

const loadItems = () => {
  loading.value = true
  axios.get('/datatable/server', {
    params: {
      page: options.value.page,
      itemsPerPage: options.value.itemsPerPage,
      sortBy: options.value.sortBy,
    },
  }).then(res => {
    serverItems.value = res.data.items
    totalItems.value = res.data.total
    loading.value = false
  })
}

onMounted(loadItems)
</script>

<template>
  <VDataTableServer
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="serverItems"
    :loading="loading"
    item-value="name"
    class="text-no-wrap"
    @update:options="options = $event"
  />
</template>

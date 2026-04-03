<script setup lang="ts">
import type { DataTableHeader } from '@/plugins/apis/types'
import { VDataTable } from 'vuetify/labs/VDataTable'

const dialog = ref(false)
const dialogDelete = ref(false)

const headers: DataTableHeader[] = [
  {
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Calories', key: 'calories' },
  { title: 'Fat (g)', key: 'fat' },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const desserts = ref<any[]>([])
const editedIndex = ref(-1)

const editedItem = ref({
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
})

const defaultItem = ref({
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
})

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})

function initialize() {
  desserts.value = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6,
      carbs: 24,
      protein: 4,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4.3,
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16,
      carbs: 23,
      protein: 6,
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16,
      carbs: 49,
      protein: 3.9,
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0,
      carbs: 94,
      protein: 0,
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25,
      carbs: 51,
      protein: 4.9,
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26,
      carbs: 65,
      protein: 7,
    },
  ]
}
function editItem(item: any) {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}
function deleteItem(item: any) {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}
function deleteItemConfirm() {
  desserts.value.splice(editedIndex.value, 1)
  closeDelete()
}
function close() {
  dialog.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}
function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value)
    editedIndex.value = -1
  })
}
function save() {
  if (editedIndex.value > -1)
    Object.assign(desserts.value[editedIndex.value], editedItem.value)

  else
    desserts.value.push(editedItem.value)

  close()
}
watch(dialog, val => {
  val || close()
})
watch(dialogDelete, val => {
  val || closeDelete()
})
initialize()
</script>

<template>
  <VDataTable
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    class="text-no-wrap"
  >
    <template #top>
      <VToolbar flat>
        <VToolbarTitle>My CRUD</VToolbarTitle>

        <VSpacer />

        <VDialog
          v-model="dialog"
          max-width="500px"
        >
          <template #activator="{ props }">
            <VBtn
              color="primary"
              v-bind="props"
            >
              New Item
            </VBtn>
          </template>

          <VCard :title="formTitle">
            <VCardText>
              <VRow>
                <VCol
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <VTextField
                    v-model="editedItem.name"
                    label="Dessert name"
                  />
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <VTextField
                    v-model="editedItem.calories"
                    label="Calories"
                  />
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <VTextField
                    v-model="editedItem.fat"
                    label="Fat (g)"
                  />
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <VTextField
                    v-model="editedItem.carbs"
                    label="Carbs (g)"
                  />
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <VTextField
                    v-model="editedItem.protein"
                    label="Protein (g)"
                  />
                </VCol>
              </VRow>
            </VCardText>

            <VCardActions>
              <VSpacer />
              <VBtn
                color="primary"
                @click="close"
              >
                Cancel
              </VBtn>
              <VBtn
                color="success"
                @click="save"
              >
                Save
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>

        <VDialog
          v-model="dialogDelete"
          max-width="500px"
        >
          <VCard title="Are you sure you want to delete this item?">
            <VCardActions>
              <VSpacer />
              <VBtn
                color="error"
                @click="closeDelete"
              >
                Cancel
              </VBtn>
              <VBtn
                color="success"
                @click="deleteItemConfirm"
              >
                OK
              </VBtn>
              <VSpacer />
            </VCardActions>
          </VCard>
        </VDialog>
      </VToolbar>
    </template>

    <template #item.actions="{ item }">
      <VIcon
        icon="mdi-pencil-outline"
        size="small"
        class="me-2"
        @click="editItem(item.raw)"
      />
      <VIcon
        icon="mdi-delete-outline"
        size="small"
        @click="deleteItem(item.raw)"
      />
    </template>
    <template #no-data>
      <VBtn
        color="primary"
        @click="initialize"
      >
        Reset
      </VBtn>
    </template>
  </VDataTable>
</template>

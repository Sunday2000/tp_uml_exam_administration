<script setup lang="ts" generic="T extends Record<string, any>">
const props = defineProps<{
  columns: { key: string; label: string; align?: 'start' | 'center' | 'end' }[]
  items: T[]
  title?: string
  count?: number | string
  perPage?: number
}>()

const page = ref(1)
const itemsPerPage = computed(() => props.perPage ?? 10)
const totalPages = computed(() => Math.max(1, Math.ceil(props.items.length / itemsPerPage.value)))
const paginatedItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value
  return props.items.slice(start, start + itemsPerPage.value)
})

watch(
  () => props.items.length,
  () => { page.value = 1 },
)
</script>

<template>
  <VCard elevation="0" border rounded="lg">
    <!-- En-tête carte -->
    <VCardText v-if="title" class="pa-4 pb-1">
      <div class="d-flex align-center justify-space-between mb-2">
        <span class="text-subtitle-2 font-weight-bold">{{ title }}</span>
        <span v-if="count !== undefined" class="text-caption text-medium-emphasis">
          {{ count }} {{ count === 1 ? 'élément' : 'éléments' }}
        </span>
      </div>
    </VCardText>

    <VTable>
      <!-- ── Thead ── -->
      <thead>
        <tr style="background: #f5f4ef;">
          <th
            v-for="col in columns"
            :key="col.key"
            class="text-uppercase text-caption font-weight-bold text-medium-emphasis py-3"
            :class="[
              col.align === 'end' ? ' pe-5' : col.align === 'center' ? 'text-center' : 'ps-5',
            ]"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <!-- ── Tbody ── -->
      <tbody>
        <tr
          v-for="(item, rowIndex) in paginatedItems"
          :key="rowIndex"
          class="app-table-row"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="py-3"
            :class="[
              col.align === 'end' ? ' pe-5' : col.align === 'center' ? 'text-center' : 'ps-5',
            ]"
          >
            <!--
              Slot nommé dynamiquement par colonne : #cell-[key]
              Exemple : <template #cell-statut="{ item }">...</template>
              Fallback : affichage brut de la valeur
            -->
            <slot :name="`cell-${col.key}`" :item="item" :value="item[col.key]">
              <span class="text-body-2">{{ item[col.key] ?? '—' }}</span>
            </slot>
          </td>
        </tr>

        <!-- Ligne vide -->
        <tr v-if="!items.length">
          <td :colspan="columns.length" class="text-center text-medium-emphasis py-8 text-body-2">
            Aucune donnée disponible
          </td>
        </tr>
      </tbody>
    </VTable>

    <div v-if="totalPages > 1" class="d-flex justify-center align-center py-3 border-t">
      <VPagination
        v-model="page"
        :length="totalPages"
        :total-visible="5"
        density="compact"
        active-color="#1a3a6b"
      />
    </div>
  </VCard>
</template>

<style scoped>
.app-table-row:hover { background: #f9f9fb; }
</style>
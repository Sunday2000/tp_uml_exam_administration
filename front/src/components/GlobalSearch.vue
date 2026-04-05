<script setup lang="ts" generic="T extends GlobalSearchData">
import type { GlobalSearchData } from '@/plugins/apis/types'
import { useMagicKeys } from '@vueuse/core'

interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'search', value: string): void
}

interface Props {
  isDialogVisible: boolean
  searchResults: T[]
}

const _props = defineProps<Props>()
const emit = defineEmits<Emit>()

// 👉 Hotkey
const { ctrl_k, meta_k } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown')
      e.preventDefault()
  },
})

const searchQueryLocal = ref('')

// 👉 watching control + / to open dialog
watch([
  ctrl_k, meta_k,
], () => {
  emit('update:isDialogVisible', true)
})

// 👉 clear search result and close the dialog
const clearSearchAndCloseDialog = () => {
  searchQueryLocal.value = ''
  emit('update:isDialogVisible', false)
}

const dialogModelValueUpdate = (val: boolean) => {
  searchQueryLocal.value = ''
  emit('update:isDialogVisible', val)
}

// 👉 clear search query when redirect to another page
watch(
  () => _props.isDialogVisible,
  () => {
    searchQueryLocal.value = ''
  },
)

watch(searchQueryLocal, () => {
  emit('search', searchQueryLocal.value)
})
</script>

<template>
  <VDialog
    max-width="600"
    :model-value="_props.isDialogVisible"
    class="global-search-dialog"
    @update:model-value="dialogModelValueUpdate"
    @keyup.esc="clearSearchAndCloseDialog"
  >
    <VAutocomplete
      v-model:search="searchQueryLocal"
      density="default"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search Apps & Pages"
      :items="_props.searchResults"
      autofocus
      class="bg-surface rounded"
    >
      <template #item="{ props, item }">
        <VListItem
          v-bind="props"
          :title="item?.raw?.title"
          :prepend-icon="item.raw.icon"
          :to="item?.raw?.to"
          :value="item.raw.title"
          color="undefined"
          :subtitle="item.raw.subtitle"
          @click="clearSearchAndCloseDialog"
        />
      </template>
    </VAutocomplete>
  </VDialog>
</template>

<style lang="scss">
.global-search-dialog {
  .v-overlay__content {
    inset-block-start: 64px;
  }
}
</style>

<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

const group1 = ref<HTMLElement | null>(null)
const group2 = ref<HTMLElement | null>(null)

const list = ref([
  { id: 4, title: 'Earnings', icon: 'mdi-currency-usd', color: 'info' },
  { id: 5, title: 'Access Database', icon: 'mdi-database-outline', color: 'warning' },
  { id: 6, title: 'Call history', icon: 'mdi-phone-outline', color: 'error' },
])

const list2 = ref([
  { id: 1, title: 'Constructors', icon: 'mdi-domain', color: 'primary' },
  { id: 2, title: 'Create new teams', icon: 'mdi-account-plus-outline', color: 'secondary' },
  { id: 3, title: 'Manage Inquires', icon: 'mdi-book-open-variant', color: 'success' },
])

useSortable(group1, list, {
  group: 'shared',
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
})
useSortable(group2, list2, {
  group: 'shared',
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
})
</script>

<template>
  <div
    ref="group1"
    class="d-flex align-center gap-4 flex-wrap mb-4"
  >
    <VCard
      v-for="item in list"
      :key="item.id"
      class="flex-grow-1 mb-2"
      color="secondary"
      variant="tonal"
    >
      <VCardText>
        <VAvatar
          :color="item.color"
          :icon="item.icon"
          class="me-3"
        />
        <span class="text-high-emphasis">{{ item.title }}</span>
      </VCardText>
    </VCard>
  </div>

  <div
    ref="group2"
    class="d-flex align-center gap-4 flex-wrap"
  >
    <VCard
      v-for="item in list2"
      :key="item.id"
      class="flex-grow-1 mb-2"
      color="secondary"
      variant="tonal"
    >
      <VCardText>
        <VAvatar
          :color="item.color"
          :icon="item.icon"
          class="me-3"
        />
        <span class="text-high-emphasis">{{ item.title }}</span>
      </VCardText>
    </VCard>
  </div>
</template>

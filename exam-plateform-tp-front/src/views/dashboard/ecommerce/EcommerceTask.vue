<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

const el = ref<HTMLElement | null>(null)

const task = ref([
  {
    title: 'Create Mobile App UI.',
    subtitle: 'Mobile App',
    meta: 'Today',
    color: 'success',
  },
  {
    title: ' Check the new API standards.',
    subtitle: 'Web API',
    meta: 'Monday',
    color: 'error',
  },
  {
    title: ' Check the new Mockup of ABC.',
    subtitle: 'Mockup',
    meta: 'Wednesday',
    color: 'info',
  },
])

useSortable(el, task, {
  animation: 150,
})
</script>

<template>
  <VCard>
    <VCardItem class="bg-success">
      <VCardTitle>Draggable Task</VCardTitle>
      <VCardSubtitle>Sept 16, 2019</VCardSubtitle>
    </VCardItem>

    <VList
      ref="el"
      lines="three"
      select-strategy="classic"
    >
      <VListItem
        v-for="item in task"
        :key="item.title"
        :value="item.subtitle"
      >
        <template #prepend="{ isActive }">
          <VListItemAction start>
            <VCheckboxBtn :model-value="isActive" />
          </VListItemAction>
        </template>

        <VListItemTitle class="mb-1">
          {{ item.title }}
        </VListItemTitle>

        <VListItemSubtitle>
          <VChip
            label
            :color="item.color"
            density="comfortable"
          >
            <span class="text-xs">{{ item.subtitle }}</span>
          </VChip>
        </VListItemSubtitle>

        <template #append>
          <VListItemAction>
            <span class="text-xs">{{ item.meta }}</span>
          </VListItemAction>
        </template>
      </VListItem>
    </VList>
  </VCard>
</template>

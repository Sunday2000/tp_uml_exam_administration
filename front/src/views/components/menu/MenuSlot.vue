<script setup lang="ts">
import { mergeProps } from 'vue'

const items = [
  { title: 'Click Me 1' },
  { title: 'Click Me 2' },
  { title: 'Click Me 3' },
  { title: 'Click Me 4' },
]
</script>

<template>
  <div>
    <VMenu>
      <template #activator="{ props: menu }">
        <VTooltip location="top">
          <template #activator="{ props: tooltip }">
            <VBtn
              color="primary"
              v-bind="mergeProps(menu, tooltip)"
            >
              Dropdown w/ Tooltip
            </VBtn>
          </template>
          <span>I'm A Tooltip</span>
        </VTooltip>
      </template>
      <VList>
        <VListItem
          v-for="(item, index) in items"
          :key="index"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>

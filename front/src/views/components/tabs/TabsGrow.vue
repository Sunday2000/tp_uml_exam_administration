<script setup lang="ts">
const tab = ref('Appetizers')

const items = [
  'Appetizers',
  'Entrees',
  'Deserts',
  'Cocktails',
]

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
</script>

<template>
  <VTabs
    v-model="tab"
    grow
  >
    <VTab
      v-for="item in items"
      :key="item"
      :value="item"
    >
      {{ item }}
    </VTab>
  </VTabs>

  <VWindow v-model="tab">
    <VWindowItem
      v-for="item in items"
      :key="item"
      :value="item"
    >
      <VCardText>{{ text }}</VCardText>
    </VWindowItem>
  </VWindow>
</template>

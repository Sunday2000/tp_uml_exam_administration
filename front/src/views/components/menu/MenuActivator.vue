<script setup lang="ts">
const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]
</script>

<template>
  <div class="d-flex flex-wrap gap-6">
    <VMenu>
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Activator slot
        </VBtn>
      </template>
      <VList>
        <VListItem
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>

    <VBtn color="primary">
      Parent activator

      <VMenu activator="parent">
        <VList>
          <VListItem
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <VListItemTitle>{{ item.title }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VBtn>

    <VBtn
      id="menu-activator"
      color="primary"
    >
      Sibling activator
    </VBtn>

    <VMenu activator="#menu-activator">
      <VList>
        <VListItem
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>

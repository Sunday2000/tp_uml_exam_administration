<script setup lang="ts">
const tab = ref(null)

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
</script>

<template>
  <VTabs
    v-model="tab"
    align-tabs="center"
    stacked
  >
    <VTab value="tab-1">
      <VIcon icon="mdi-phone-outline" />
      <span>Recent</span>
    </VTab>

    <VTab value="tab-2">
      <VIcon icon="mdi-heart-outline" />
      <span>Favorites</span>
    </VTab>

    <VTab value="tab-3">
      <VIcon icon="mdi-account-box-outline" />
      <span>Nearby</span>
    </VTab>
  </VTabs>

  <VCardText>
    <VWindow v-model="tab">
      <VWindowItem
        v-for="i in 3"
        :key="i"
        :value="`tab-${i}`"
      >
        {{ text }}
      </VWindowItem>
    </VWindow>
  </VCardText>
</template>

<template>
  <VTabs
    next-icon="mdi-arrow-right-bold-box-outline"
    prev-icon="mdi-arrow-left-bold-box-outline"
    show-arrows
  >
    <VTab
      v-for="i in 30"
      :key="i"
    >
      Item {{ i }}
    </VTab>
  </VTabs>
</template>

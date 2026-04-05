<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <div class="d-flex align-center flex-wrap gap-6">
    <VBtn
      color="primary"
      @click="show = !show"
    >
      toggle
    </VBtn>

    <VTooltip
      v-model="show"
      location="top"
    >
      <template #activator="{ props }">
        <VBtn
          icon
          variant="tonal"
          color="error"
          v-bind="props"
        >
          <VIcon>
            mdi-cart
          </VIcon>
        </VBtn>
      </template>
      <span>Programmatic tooltip</span>
    </VTooltip>
  </div>
</template>

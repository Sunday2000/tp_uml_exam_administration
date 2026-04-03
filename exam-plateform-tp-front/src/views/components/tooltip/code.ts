export const location = `<template>
  <div class="d-flex flex-wrap gap-6">
    <VBtn color="primary">
      Start
      <VTooltip
        activator="parent"
        location="start"
      >
        Tooltip
      </VTooltip>
    </VBtn>

    <VBtn color="primary">
      End
      <VTooltip
        activator="parent"
        location="end"
      >
        Tooltip
      </VTooltip>
    </VBtn>

    <VBtn color="primary">
      Top
      <VTooltip
        activator="parent"
        location="top"
      >
        Tooltip
      </VTooltip>
    </VBtn>

    <VBtn color="primary">
      Bottom
      <VTooltip
        activator="parent"
        location="bottom"
      >
        Tooltip
      </VTooltip>
    </VBtn>
  </div>
</template>
`
export const visibility = `<script setup lang="ts">
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
`

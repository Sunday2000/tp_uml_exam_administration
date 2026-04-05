<script setup lang="ts">
const dialog = ref(false)
</script>

<template>
  <VDialog
    v-model="dialog"
    width="auto"
  >
    <template #activator="{ props }">
      <VBtn
        color="primary"
        v-bind="props"
      >
        Open Dialog
      </VBtn>
    </template>

    <VCard>
      <VCardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </VCardText>

      <VCardActions>
        <VBtn
          color="primary"
          block
          @click="dialog = false"
        >
          Close Dialog
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

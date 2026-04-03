<script setup lang="ts">
const dialog = ref(false)
</script>

<template>
  <VDialog
    v-model="dialog"
    persistent
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

    <VCard title="Use Google's location service?">
      <VCardText>
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn
          color="error"
          @click="dialog = false"
        >
          Disagree
        </VBtn>
        <VBtn
          color="primary"
          @click="dialog = false"
        >
          Agree
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

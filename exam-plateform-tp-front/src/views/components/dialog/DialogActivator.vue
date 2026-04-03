<script setup lang="ts">
const dialog = ref(false)
</script>

<template>
  <VBtn color="primary">
    Open Dialog

    <VDialog
      v-model="dialog"
      activator="parent"
      width="auto"
    >
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
  </VBtn>
</template>

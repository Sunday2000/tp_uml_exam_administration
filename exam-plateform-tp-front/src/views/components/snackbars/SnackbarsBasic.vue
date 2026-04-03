<script setup lang="ts">
const snackbar = ref(false)
const text = ref('Hello, I\'m a snackbar')
</script>

<template>
  <div>
    <VBtn
      color="primary"
      @click="snackbar = true"
    >
      Open Snackbar
    </VBtn>

    <VSnackbar v-model="snackbar">
      {{ text }}

      <template #actions>
        <VBtn
          color="error"
          variant="tonal"
          size="small"
          @click="snackbar = false"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </div>
</template>

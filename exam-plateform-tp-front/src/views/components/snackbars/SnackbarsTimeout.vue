<script setup lang="ts">
const snackbar = ref(false)
const text = ref('My timeout is set to 2000.')
const timeout = ref(2000)
</script>

<template>
  <div>
    <VBtn
      color="primary"
      @click="snackbar = true"
    >
      Open Snackbar
    </VBtn>

    <VSnackbar
      v-model="snackbar"
      :timeout="timeout"
    >
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

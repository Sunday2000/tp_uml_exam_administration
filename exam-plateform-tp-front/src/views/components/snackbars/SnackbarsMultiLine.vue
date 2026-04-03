<script setup lang="ts">
const snackbar = ref(false)

const text = 'I am a multi-line snackbar.\nI can have more than one line. This is another line that is quite long.'
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
      multi-line
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

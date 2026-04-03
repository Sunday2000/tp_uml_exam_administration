<script setup lang="ts">
const snackbar = ref(false)
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
      vertical
    >
      <div class="text-subtitle-1 pb-2">
        This is a snackbar message
      </div>

      <p>This is a longer paragraph explaining something</p>

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

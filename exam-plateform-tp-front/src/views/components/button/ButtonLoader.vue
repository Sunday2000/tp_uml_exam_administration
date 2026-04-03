<script setup lang="ts">
const loading = ref(false)

const load = () => {
  loading.value = true
  setTimeout(() => (loading.value = false), 3000)
}
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VBtn
      :loading="loading"
      variant="tonal"
      @click="load"
    >
      Default loader
    </VBtn>

    <VBtn
      :loading="loading"
      color="primary"
      @click="load"
    >
      Custom loader

      <template #loader>
        <VProgressLinear indeterminate />
      </template>
    </VBtn>
  </div>
</template>

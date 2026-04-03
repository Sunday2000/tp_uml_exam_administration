<script setup lang="ts">
const dialog = ref(false)

watch(dialog, val => {
  if (!val)
    return
  setTimeout(() => (dialog.value = false), 4000)
})
</script>

<template>
  <div>
    <VBtn
      :disabled="dialog"
      :loading="dialog"
      color="primary"
      @click="dialog = true"
    >
      Start loading
    </VBtn>

    <VDialog
      v-model="dialog"
      :scrim="false"
      persistent
      width="auto"
    >
      <VCard color="primary">
        <VCardText>
          Please stand by
          <VProgressLinear
            indeterminate
            color="white"
            class="mb-0"
          />
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

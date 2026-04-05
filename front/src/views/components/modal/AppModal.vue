<script setup lang="ts">
defineProps<{
  title: string
  maxWidth?: number | string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <VDialog
    :max-width="maxWidth ?? 560"
    persistent
    v-bind="$attrs"
  >
    <VCard rounded="lg">
      <VCardText class="pa-7">
        <!-- ── En-tête ── -->
        <div class="d-flex align-center justify-space-between mb-6">
          <h2 class="text-h6 font-weight-bold">{{ title }}</h2>
          <VBtn icon variant="text" size="small" @click="emit('close')">
            <VIcon icon="mdi-close" />
          </VBtn>
        </div>

        <!-- ── Contenu (slot principal) ── -->
        <slot />

        <!-- ── Pied (actions) ── -->
        <template v-if="$slots.actions">
          <VDivider class="my-6" />
          <div class="d-flex justify-end gap-3">
            <slot name="actions" />
          </div>
        </template>
      </VCardText>
    </VCard>
  </VDialog>
</template>
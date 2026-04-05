<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-3.png'
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VBadge color="info">
      <template #badge>
        <VIcon icon="mdi-information-variant" />
      </template>

      <VAvatar :image="avatar1" />
    </VBadge>

    <VBadge
      color="success"
      icon="mdi-lock-outline"
    >
      <VAvatar :image="avatar1" />
    </VBadge>
  </div>
</template>

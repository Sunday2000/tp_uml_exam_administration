<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VBadge
      color="primary"
      content="5"
    >
      <VBtn color="primary">
        default
      </VBtn>
    </VBadge>

    <VBadge
      color="primary"
      content="5"
      bordered
    >
      <VBtn color="primary">
        Border
      </VBtn>
    </VBadge>

    <VBadge
      dot
      color="primary"
      location="top end"
    >
      <VAvatar
        size="42"
        :image="avatar1"
      />
    </VBadge>
  </div>
</template>

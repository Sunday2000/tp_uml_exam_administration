<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-8.png'
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VBadge
      color="primary"
      content="1"
      location="start top"
    >
      <VAvatar :image="avatar1" />
    </VBadge>

    <VBadge
      color="primary"
      content="1"
      location="bottom end"
    >
      <VAvatar :image="avatar1" />
    </VBadge>

    <VBadge
      color="primary"
      content="1"
      location="top end"
    >
      <VAvatar :image="avatar1" />
    </VBadge>

    <VBadge
      color="primary"
      content="1"
      location="bottom start"
    >
      <VAvatar :image="avatar1" />
    </VBadge>
  </div>
</template>

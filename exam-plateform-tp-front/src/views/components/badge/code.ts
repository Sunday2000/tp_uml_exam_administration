export const colors = `<template>
  <div class="d-flex align-center flex-wrap gap-4">
    <VBadge
      dot
      color="primary"
    >
      <VIcon
        size="24"
        icon="mdi-newspaper-variant-outline"
      />
    </VBadge>

    <VBadge
      dot
      color="secondary"
    >
      <VIcon
        size="24"
        icon="mdi-newspaper-variant-outline"
      />
    </VBadge>

    <VBadge
      dot
      color="success"
    >
      <VIcon
        size="24"
        icon="mdi-newspaper-variant-outline"
      />
    </VBadge>

    <VBadge
      dot
      color="warning"
    >
      <VIcon
        size="24"
        icon="mdi-newspaper-variant-outline"
      />
    </VBadge>

    <VBadge
      dot
      color="info"
    >
      <VIcon icon="mdi-newspaper-variant-outline" />
    </VBadge>

    <VBadge
      dot
      color="error"
    >
      <VIcon icon="mdi-newspaper-variant-outline" />
    </VBadge>
  </div>
</template>
`

export const icon = `<script setup lang="ts">
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
`

export const position = `<script setup lang="ts">
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
`
export const style = `<script setup lang="ts">
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
`

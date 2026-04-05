<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'

const items = [
  { text: 'My Files', icon: 'mdi-folder-outline' },
  { text: 'Shared with me', icon: 'mdi-account-multiple-outline' },
  { text: 'Starred', icon: 'mdi-star-outline' },
  { text: 'Recent', icon: 'mdi-history' },
  { text: 'Offline', icon: 'mdi-check-circle-outline' },
  { text: 'Uploads', icon: 'mdi-upload-outline' },
  { text: 'Backups', icon: 'mdi-cloud-upload-outline' },
]
</script>

<template>
  <VList>
    <VListItem
      :prepend-avatar="avatar1"
      title="John Leider"
      subtitle="john@google.com"
    >
      <template #append>
        <VBtn
          size="small"
          variant="text"
          icon="mdi-menu-down"
        />
      </template>
    </VListItem>
  </VList>

  <VDivider />

  <VList
    :lines="false"
    density="compact"
    nav
  >
    <VListItem
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="primary"
    >
      <template #prepend>
        <VIcon :icon="item.icon" />
      </template>

      <VListItemTitle>
        {{ item.text }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>

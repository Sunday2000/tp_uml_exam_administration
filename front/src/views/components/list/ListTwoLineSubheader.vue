<script setup lang="ts">
const files = [
  {
    color: 'primary',
    icon: 'mdi-clipboard-text-outline',
    subtitle: 'Jan 20, 2014',
    title: 'Vacation itinerary',
  },
  {
    color: 'info',
    icon: 'mdi-gesture-tap-button',
    subtitle: 'Jan 10, 2014',
    title: 'Kitchen remodel',
  },
]

const folders = [
  {
    subtitle: 'Jan 9, 2014',
    title: 'Photos',
  },
  {
    subtitle: 'Jan 17, 2014',
    title: 'Recipes',
  },
  {
    subtitle: 'Jan 28, 2014',
    title: 'Work',
  },
]
</script>

<template>
  <VList lines="two">
    <VListSubheader inset>
      Folders
    </VListSubheader>

    <VListItem
      v-for="folder in folders"
      :key="folder.title"
      :title="folder.title"
      :subtitle="folder.subtitle"
    >
      <template #prepend>
        <VAvatar color="secondary">
          <VIcon
            icon="mdi-folder-outline"
            color="white"
          />
        </VAvatar>
      </template>

      <template #append>
        <VBtn
          icon="mdi-information-outline"
          variant="text"
        />
      </template>
    </VListItem>

    <VDivider inset />

    <VListSubheader inset>
      Files
    </VListSubheader>

    <VListItem
      v-for="file in files"
      :key="file.title"
      :title="file.title"
      :subtitle="file.subtitle"
    >
      <template #prepend>
        <VAvatar :color="file.color">
          <VIcon color="white">
            {{ file.icon }}
          </VIcon>
        </VAvatar>
      </template>

      <template #append>
        <VBtn
          icon="mdi-information-outline"
          variant="text"
        />
      </template>
    </VListItem>
  </VList>
</template>

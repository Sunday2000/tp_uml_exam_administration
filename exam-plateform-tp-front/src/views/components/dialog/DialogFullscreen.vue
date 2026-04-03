<script setup lang="ts">
const dialog = ref(false)
</script>

<template>
  <VDialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <template #activator="{ props }">
      <VBtn
        color="primary"
        dark
        v-bind="props"
      >
        Open Dialog
      </VBtn>
    </template>

    <VCard>
      <VToolbar
        dark
        color="primary"
      >
        <VBtn
          icon
          dark
          @click="dialog = false"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
        <VToolbarTitle>Settings</VToolbarTitle>
        <VSpacer />
        <VToolbarItems>
          <VBtn
            variant="text"
            @click="dialog = false"
          >
            Save
          </VBtn>
        </VToolbarItems>
      </VToolbar>

      <VList
        lines="two"
        subheader
      >
        <VListSubheader>User Controls</VListSubheader>
        <VListItem
          title="Content filtering"
          subtitle="Set the content filtering level to restrict apps that can be downloaded"
        />
        <VListItem
          title="Password"
          subtitle="Require password for purchase or use password to restrict purchase"
        />
      </VList>

      <VDivider />

      <VList subheader>
        <VListSubheader>General</VListSubheader>
        <VListItem
          title="Notifications"
          subtitle="Notify me about updates to apps or games that I downloaded"
          value="notifications"
        >
          <template #prepend="{ isActive }">
            <VCheckbox
              :model-value="isActive"
              class="mb-n2"
            />
          </template>
        </VListItem>
        <VListItem
          title="Sound"
          subtitle="Auto-update apps at any time. Data charges may apply"
          value="sound"
        >
          <template #prepend="{ isActive }">
            <VCheckbox
              :model-value="isActive"
              class="mb-n2"
            />
          </template>
        </VListItem>
        <VListItem
          title="Auto-add widgets"
          subtitle="Automatically add home screen widgets"
          value="widgets"
        >
          <template #prepend="{ isActive }">
            <VCheckbox
              :model-value="isActive"
              class="mb-n2"
            />
          </template>
        </VListItem>
      </VList>
    </VCard>
  </VDialog>
</template>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>

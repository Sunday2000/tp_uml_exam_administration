<script setup lang="ts">
const NotificationSettings = [
  {
    title: 'Comments',
    subtitle: 'Push, Emails, SMS',
    icon: 'mdi-comment-outline',
    description: 'These are notifications for comments on your posts and replies to your comments.',
    notifications: [
      {
        title: 'Push',
        icon: 'mdi-cellphone-message',
        isActive: true,
      },
      {
        title: 'Email',
        icon: 'mdi-email-outline',
        isActive: true,
      },
      {
        title: 'SMS',
        icon: 'mdi-message-text-outline',
        isActive: false,
      },
    ],
  },
  {
    title: 'Tags',
    subtitle: 'Push, Emails, SMS',
    icon: 'mdi-tag-outline',
    description: 'These are notifications for when you are tagged in a post or comment.',
    notifications: [
      {
        title: 'Push',
        icon: 'mdi-cellphone-message',
        isActive: true,
      },
      {
        title: 'Email',
        icon: 'mdi-email-outline',
        isActive: false,
      },
      {
        title: 'SMS',
        icon: 'mdi-message-text-outline',
        isActive: false,
      },
    ],
  },
  {
    title: 'Likes',
    subtitle: 'Push, Emails',
    icon: 'mdi-heart-outline',
    description: 'These are notifications for when someone likes your post or comment.',
    notifications: [
      {
        title: 'Push',
        icon: 'mdi-cellphone-message',
        isActive: true,
      },
      {
        title: 'Email',
        icon: 'mdi-email-outline',
        isActive: true,
      },
    ],
  },
  {
    title: 'Followers',
    subtitle: 'Push, Emails',
    icon: 'mdi-account-plus-outline',
    description: 'These are notifications for when someone follows you or accepts your follow request.',
    notifications: [
      {
        title: 'Push',
        icon: 'mdi-cellphone-message',
        isActive: true,
      },
      {
        title: 'Email',
        icon: 'mdi-email-outline',
        isActive: true,
      },
    ],
  },
  {
    title: 'Mentions',
    subtitle: 'Push, Emails, SMS',
    icon: 'mdi-at',
    description: 'These are notifications for when someone mentions you in a post or comment.',
    notifications: [
      {
        title: 'Push',
        icon: 'mdi-cellphone-message',
        isActive: true,
      },
      {
        title: 'Email',
        icon: 'mdi-email-outline',
        isActive: false,
      },
      {
        title: 'SMS',
        icon: 'mdi-message-text-outline',
        isActive: false,
      },
    ],
  },
  {
    title: 'Direct Messages',
    subtitle: 'Push, Emails, SMS',
    icon: 'mdi-message-outline',
    description: 'These are notifications for when you receive a direct message from someone.',
    notifications: [
      {
        title: 'Push',
        icon: 'mdi-cellphone-message',
        isActive: true,
      },
      {
        title: 'Email',
        icon: 'mdi-email-outline',
        isActive: false,
      },
      {
        title: 'SMS',
        icon: 'mdi-message-text-outline',
        isActive: false,
      },
    ],
  },
]
</script>

<template>
  <VExpansionPanels>
    <VExpansionPanel
      v-for="item in NotificationSettings"
      :key="item.title"
    >
      <VExpansionPanelTitle class="align-start gap-4">
        <VIcon
          size="24"
          :icon="item.icon"
        />
        <div>
          <p class="text-base font-weight-medium mb-2">
            {{ item.title }}
          </p>
          <span class="text-sm text-medium-emphasis">{{ item.subtitle }}</span>
        </div>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <p>{{ item.description }}</p>

        <VList>
          <VListItem
            v-for="notification in item.notifications"
            :key="notification.title"
            :prepend-icon="notification.icon"
            :title="notification.title"
          >
            <template #append>
              <VSwitch
                hide-details="auto"
                :model-value="notification.isActive"
                density="compact"
              />
            </template>
          </VListItem>
        </VList>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

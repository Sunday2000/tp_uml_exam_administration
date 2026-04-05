export const basic = `<script setup lang="ts">
const items = [
  { type: 'subheader', title: 'Group #1' },
  {
    title: 'Item #1',
    value: 1,
  },
  {
    title: 'Item #2',
    value: 2,
  },
  {
    title: 'Item #3',
    value: 3,
  },
  { type: 'divider' },
  { type: 'subheader', title: 'Group #2' },
  {
    title: 'Item #4',
    value: 4,
  },
  {
    title: 'Item #5',
    value: 5,
  },
  {
    title: 'Item #6',
    value: 6,
  },
]
</script>

<template>
  <VList :items="items" />
</template>
`

export const density = `<script setup lang="ts">
const items = [
  { text: 'Real-Time', icon: 'mdi-clock-outline' },
  { text: 'Audience', icon: 'mdi-account-outline' },
  { text: 'Conversions', icon: 'mdi-flag-outline' },
]
</script>

<template>
  <VList density="default">
    <VListSubheader>REPORTS</VListSubheader>

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
`
export const misc = `<template>
  <VList lines="three">
    <VListSubheader>User Controls</VListSubheader>

    <VListItem>
      <VListItemTitle>Content filtering</VListItemTitle>

      <VListItemSubtitle>
        Set the content filtering level to restrict appts that can be downloaded
      </VListItemSubtitle>
    </VListItem>

    <VListItem>
      <VListItemTitle>Password</VListItemTitle>

      <VListItemSubtitle>
        Require password for purchase or use password to restrict purchase
      </VListItemSubtitle>
    </VListItem>
  </VList>

  <VDivider />

  <VList
    lines="three"
    select-strategy="classic"
  >
    <VListSubheader>General</VListSubheader>

    <VListItem value="notifications">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckboxBtn :model-value="isActive" />
        </VListItemAction>
      </template>

      <VListItemTitle>Notifications</VListItemTitle>

      <VListItemSubtitle>
        Notify me about updates to apps or games that I downloaded
      </VListItemSubtitle>
    </VListItem>

    <VListItem value="sound">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckboxBtn :model-value="isActive" />
        </VListItemAction>
      </template>

      <VListItemTitle>Sound</VListItemTitle>

      <VListItemSubtitle>
        Auto-update apps at any time. Data charges may apply
      </VListItemSubtitle>
    </VListItem>

    <VListItem value="widgets">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckboxBtn :model-value="isActive" />
        </VListItemAction>
      </template>

      <VListItemTitle>Auto-add widgets</VListItemTitle>

      <VListItemSubtitle>
        Automatically add home screen widgets when downloads complete
      </VListItemSubtitle>
    </VListItem>
  </VList>
</template>
`
export const disabled = `<script setup lang="ts">
const items = [
  { text: 'Real-Time', icon: 'mdi-clock-outline' },
  { text: 'Audience', icon: 'mdi-account-outline' },
  { text: 'Conversions', icon: 'mdi-flag-outline' },
]
</script>

<template>
  <VList disabled>
    <VListSubheader>REPORTS</VListSubheader>

    <VListItem
      v-for="(item, i) in items"
      :key="i"
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
`
export const nav = `<script setup lang="ts">
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
`

export const rounded = `<script setup lang="ts">
const items = [
  { text: 'Real-Time', icon: 'mdi-clock-outline' },
  { text: 'Audience', icon: 'mdi-account-outline' },
  { text: 'Conversions', icon: 'mdi-flag-outline' },
]
</script>

<template>
  <VList>
    <VListSubheader>REPORTS</VListSubheader>

    <VListItem
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="primary"
      rounded="xl"
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
`
export const shaped = `<script setup lang="ts">
const items = [
  { text: 'Real-Time', icon: 'mdi-clock-outline' },
  { text: 'Audience', icon: 'mdi-account-outline' },
  { text: 'Conversions', icon: 'mdi-flag-outline' },
]
</script>

<template>
  <VList>
    <VListSubheader>REPORTS</VListSubheader>

    <VListItem
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="primary"
      rounded="shaped"
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
`
export const subGrouped = `<script setup lang="ts">
const open = ref(['Users', 'Admin'])

const admins = [
  ['Management', 'mdi-account-multiple-outline'],
  ['Settings', 'mdi-cog-outline'],
]

const cruds = [
  ['Create', 'mdi-plus-outline'],
  ['Read', 'mdi-file-outline'],
  ['Update', 'mdi-update'],
  ['Delete', 'mdi-delete-outline'],
]
</script>

<template>
  <VList v-model:opened="open">
    <VListItem
      prepend-icon="mdi-home"
      title="Home"
    />

    <VListGroup value="Users">
      <template #activator="{ props }">
        <VListItem
          v-bind="props"
          prepend-icon="mdi-account-circle"
          title="Users"
        />
      </template>

      <VListGroup value="Admin">
        <template #activator="{ props }">
          <VListItem
            v-bind="props"
            title="Admin"
          />
        </template>

        <VListItem
          v-for="([title, icon], i) in admins"
          :key="i"
          :title="title"
          :prepend-icon="icon"
          :value="title"
        />
      </VListGroup>

      <VListGroup value="Actions">
        <template #activator="{ props }">
          <VListItem
            v-bind="props"
            title="Actions"
          />
        </template>

        <VListItem
          v-for="([title, icon], i) in cruds"
          :key="i"
          :value="title"
          :title="title"
          :prepend-icon="icon"
        />
      </VListGroup>
    </VListGroup>
  </VList>
</template>
`
export const threeLine = `<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import avatar5 from '@/assets/avatars/avatar-5.png'

const items = [
  { type: 'subheader', title: 'Today' },
  {
    prependAvatar: avatar1,
    title: 'Brunch this weekend?',
    subtitle: '<span class="text-primary">Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar2,
    title: 'Summer BBQ',
    subtitle: '<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar3,
    title: 'Oui oui',
    subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar4,
    title: 'Birthday gift',
    subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar5,
    title: 'Recipe to try',
    subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
  },
]
</script>

<template>
  <VList
    :items="items"
    item-props
    lines="three"
  >
    <template #subtitle="{ subtitle }">
      <!--  eslint-disable-next-line vue/no-v-html -->
      <div v-html="subtitle" />
    </template>
  </VList>
</template>
`
export const twoLineSubheader = `<script setup lang="ts">
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
`
export const variant = `<script setup lang="ts">
const items = [
  { text: 'Real-Time', icon: 'mdi-clock-outline' },
  { text: 'Audience', icon: 'mdi-account-outline' },
  { text: 'Conversions', icon: 'mdi-flag-outline' },
]
</script>

<template>
  <VList>
    <VListSubheader>Plain Variant</VListSubheader>

    <VListItem
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="primary"
      variant="plain"
    >
      <template #prepend>
        <VIcon :icon="item.icon" />
      </template>

      <VListItemTitle>
        {{ item.text }}
      </VListItemTitle>
    </VListItem>
  </VList>

  <VList>
    <VListSubheader>Tonal Variant</VListSubheader>

    <VListItem
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="primary"
      variant="tonal"
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
`

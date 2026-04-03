<script lang="ts" setup>
import avatar from '@/assets/avatars/avatar-6.png'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

onMounted(() => authStore.hydrate())

const logOut = () => {
  authStore.logout()
}
</script>

<template>
  <VAvatar class="cursor-pointer">
    <VImg :src="avatar" />

    <VMenu activator="parent">
      <VList>
        <VListItem v-if="user">
          <VListItemTitle>{{ user.firstname }} {{ user.name }}</VListItemTitle>
          <VListItemSubtitle>{{ user.email }}</VListItemSubtitle>
        </VListItem>
        <VDivider class="mt-2" />
        <VListItem
          v-for="item in ['Home', 'Profile', 'Settings']"
          :key="item"
          :value="item"
        >
          <VListItemTitle>{{ item }}</VListItemTitle>
        </VListItem>
        <VDivider />
        <VListItem @click="logOut">
          <VListItemTitle>Logout</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VAvatar>
</template>

<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar10 from '@/assets/avatars/avatar-10.png'
import avatar11 from '@/assets/avatars/avatar-11.png'
import avatar12 from '@/assets/avatars/avatar-12.png'
import avatar13 from '@/assets/avatars/avatar-13.png'
import avatar14 from '@/assets/avatars/avatar-14.png'
import avatar15 from '@/assets/avatars/avatar-15.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import avatar5 from '@/assets/avatars/avatar-5.png'
import avatar6 from '@/assets/avatars/avatar-6.png'
import avatar7 from '@/assets/avatars/avatar-7.png'
import avatar8 from '@/assets/avatars/avatar-8.png'
import avatar9 from '@/assets/avatars/avatar-9.png'
import cookies from '@/assets/pages/cookies.jpg'
import router from '@/router'
import { useRoute } from 'vue-router'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import FollowerComponents from './Follower.vue'
import FriendComponent from './Friend.vue'
import Profile from './Profile.vue'
import Settings from './Settings.vue'

interface Follower {
  name: string
  avatar: string
  location: string
  followBack: boolean
}

interface Friend {
  name: string
  avatar: string
  designation: string
}

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'User',
    disabled: true,
  },
  {
    title: 'Profile',
    disabled: true,
  },
]

const tabsItems = [
  { name: 'Profile', value: 'profile', icon: 'mdi-account-outline' },
  { name: 'Followers', value: 'followers', icon: 'mdi-heart-outline' },
  { name: 'Friends', value: 'friends', icon: 'mdi-account-group-outline' },
  { name: 'Settings', value: 'settings', icon: 'mdi-cog-outline' },
]

const route = useRoute()
const currentTab = ref(route.params.tab)
const tab = ref(currentTab.value || 'profile')

const followers = ref<Follower[]>([
  {
    avatar: avatar1,
    name: 'John Doe',
    location: 'New York',
    followBack: true,
  },
  {
    avatar: avatar2,
    name: 'Jane Smith',
    location: 'Los Angeles',
    followBack: false,
  },

  {
    avatar: avatar3,
    name: 'Tom Johnson',
    location: 'Chicago',
    followBack: true,
  },

  {
    avatar: avatar4,
    name: 'Samantha Lee',
    location: 'Houston',
    followBack: true,
  },

  {
    avatar: avatar5,
    name: 'Peter Kim',
    location: 'San Francisco',
    followBack: false,
  },

  {
    avatar: avatar6,
    name: 'Lisa Chen',
    location: 'Toronto',
    followBack: true,
  },

  {
    avatar: avatar7,
    name: 'Michael Wong',
    location: 'Vancouver',
    followBack: true,
  },

  {
    avatar: avatar8,
    name: 'Karen Johnson',
    location: 'Miami',
    followBack: false,
  },

  {
    avatar: avatar9,
    name: 'David Lee',
    location: 'Dallas',
    followBack: true,
  },
  {
    avatar: avatar10,
    name: 'Emily Davis',
    location: 'Boston',
    followBack: false,
  },
  {
    avatar: avatar11,
    name: 'William Chen',
    location: 'Seattle',
    followBack: true,
  },
  {
    avatar: avatar12,
    name: 'Sarah Kim',
    location: 'Montreal',
    followBack: false,
  },
  {
    avatar: avatar13,
    name: 'Matthew Wong',
    location: 'Calgary',
    followBack: true,
  },
  {
    avatar: avatar14,
    name: 'Jasmine Lee',
    location: 'Austin',
    followBack: true,
  },
  {
    avatar: avatar15,
    name: 'Daniel Kim',
    location: 'Washington, D.C.',
    followBack: false,
  },
])

const Friends: Friend[] = [
  { avatar: avatar1, name: 'John Doe', designation: 'Software Engineer' },
  { avatar: avatar2, name: 'Jane Smith', designation: 'Frontend Developer' },
  { avatar: avatar3, name: 'Robert Johnson', designation: 'Backend Developer' },
  { avatar: avatar4, name: 'Jessica Lee', designation: 'UI/UX Designer' },
  { avatar: avatar5, name: 'William Brown', designation: 'Data Scientist' },
  { avatar: avatar6, name: 'Emily Davis', designation: 'Marketing Manager' },
  { avatar: avatar7, name: 'Michael Wilson', designation: 'Product Manager' },
  { avatar: avatar8, name: 'Stephanie Lee', designation: 'HR Manager' },
  { avatar: avatar9, name: 'David Chen', designation: 'Database Administrator' },
  { avatar: avatar10, name: 'Alexandra Kim', designation: 'Mobile Developer' },
  { avatar: avatar11, name: 'Brian Thompson', designation: 'Software Engineer' },
  { avatar: avatar12, name: 'Ashley Garcia', designation: 'Fullstack Developer' },
  { avatar: avatar13, name: 'Christopher Robinson', designation: 'DevOps Engineer' },
  { avatar: avatar14, name: 'Melanie Nguyen', designation: 'UI/UX Designer' },
  { avatar: avatar15, name: 'Joshua Patel', designation: 'Data Analyst' },
]

// watch route change and update currentTab value to route.params.tab
watch(() => route.params.tab, val => {
  currentTab.value = val
  tab.value = val
},
)
</script>

<template>
  <div>
    <VRow class="mb-4">
      <!-- Breadcrumbs -->
      <VCol cols="12">
        <VBreadcrumbs
          :items="breadcrumbs"
          divider="-"
          class="px-0"
        />
      </VCol>

      <!-- profile header -->
      <VCol cols="12">
        <VCard rounded="lg">
          <VImg
            height="210"
            cover
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            :src="cookies"
            style="z-index: -1;"
          />
          <VCardText class="heading-content pb-0">
            <div class="d-flex align-center gap-4 mb-3">
              <VAvatar
                size="100"
                :image="avatar6"
              />

              <div class="text-white">
                <h6 class="text-h6 font-weight-semibold">
                  John Doe
                </h6>
                <p class="mb-0">
                  Software Engineer
                </p>
              </div>
            </div>

            <!-- tabs -->
            <VTabs
              v-model="tab"
              align-tabs="end"
              density="compact"
              color="primary"
            >
              <VTab
                v-for="item in tabsItems"
                :key="item.name"
                :value="item.value"
                @click="router.replace({ name: 'apps-user-profile', params: { tab: item.value } })"
              >
                <VIcon
                  :icon="item.icon"
                  start
                />
                <span>{{ item.name }}</span>
              </VTab>
            </VTabs>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VWindow
      v-model="tab"
      class="user-window"
    >
      <VWindowItem
        value="profile"
        :transition="false"
        :reverse-transition="false"
      >
        <Profile />
      </VWindowItem>

      <VWindowItem
        value="followers"
        :transition="false"
        :reverse-transition="false"
      >
        <h5 class="text-h5 mb-6">
          Followers
        </h5>

        <VRow>
          <VCol
            v-for="follower in followers"
            :key="follower.name"
            cols="12"
            sm="6"
            md="4"
          >
            <FollowerComponents
              v-bind="follower"
              v-model:follow-back="follower.followBack"
            />
          </VCol>
        </VRow>
      </VWindowItem>

      <VWindowItem
        value="friends"
        :transition="false"
        :reverse-transition="false"
      >
        <VRow>
          <VCol
            v-for="item in Friends"
            :key="item.name"
            cols="120 sm=6"
            md="4"
          >
            <FriendComponent v-bind="item" />
          </VCol>
        </VRow>
      </VWindowItem>

      <VWindowItem
        value="settings"
        :transition="false"
        :reverse-transition="false"
      >
        <h5 class="text-h5 mb-6">
          Notification
        </h5>

        <Settings />
      </VWindowItem>
    </VWindow>
  </div>
</template>

<style lang="scss">
// heading-content
.heading-content {
  margin-block-start: -6.5rem;
}

.user-window {
  padding: 1rem;
  margin: -1rem;
}
</style>

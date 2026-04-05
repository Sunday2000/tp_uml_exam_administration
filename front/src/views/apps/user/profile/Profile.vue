<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import avatar from '@/assets/avatars/avatar-6.png'
import pineapple from '@/assets/pages/pineapple.png'
import sunset from '@/assets/pages/sunset.jpg'
import umbrellaImg from '@/assets/pages/umbrella.jpg'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import Post from './Post.vue'

const introData = [
  { icon: 'mdi-briefcase-variant-outline', title: 'MNO Technology as a Software Developer' },
  { icon: 'mdi-school-outline', title: 'Studied at University of Michigan, Ann Arbor' },
  { icon: 'mdi-home-outline', title: 'Lives in 123 Main Street, Anywhere, USA' },
  { icon: 'mdi-map-marker-outline', title: 'From London, United Kingdom' },
  { icon: 'mdi-heart-outline', title: 'Married' },
  { icon: 'mdi-clock-outline', title: 'Joined on December 2011' },
]

const posts = [
  {
    createdBy: {
      name: 'John Doe',
      avatar: avatar1,
    },
    createdAt: '2 hours ago',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt luctus, nunc odio lacinia nunc, eget aliquam massa nisl eget dolor. Sed euismod, nisl vel tincidunt luctus, nunc odio lacinia nunc, eget aliquam massa nisl eget dolor.',
    image: umbrellaImg,
    likes: 12,
    comments: [
      {
        createdBy: {
          name: 'John Doe',
          avatar: avatar1,
        },
        createdAt: '2 hours ago',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      },
      {
        createdBy: {
          name: 'John Doe',
          avatar: avatar1,
        },
        createdAt: '2 hours ago',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
  {
    createdBy: {
      name: 'Jane Smith',
      avatar: avatar2,
    },
    createdAt: '1 day ago',
    content: 'Nulla eget sem vitae eros pharetra viverra. Sed aliquet suscipit ipsum, in vehicula felis rhoncus vitae. Etiam et turpis non magna interdum varius.',
    image: pineapple,
    likes: 28,
    comments: [
      {
        createdBy: {
          name: 'Jane Smith',
          avatar: avatar2,
        },
        createdAt: '1 day ago',
        content: 'Nulla eget sem vitae eros pharetra viverra. Sed aliquet suscipit ipsum.',
      },
      {
        createdBy: {
          name: 'John Doe',
          avatar: avatar1,
        },
        createdAt: '1 day ago',
        content: 'Maecenas tincidunt consequat ante, eu dictum nunc luctus ut.',
      },
    ],
  },

  {
    createdBy: {
      name: 'Alice Lee',
      avatar: avatar3,
    },
    createdAt: '2 weeks ago',
    content: 'Vestibulum cursus leo quis malesuada pharetra. Donec eget mauris sed sapien facilisis mollis. Nunc id lorem hendrerit, hendrerit odio a, rhoncus risus. ',
    image: sunset,
    likes: 64,
    comments: [
      {
        createdBy: {
          name: 'Bob Johnson',
          avatar: avatar4,
        },
        createdAt: '2 weeks ago',
        content: 'Vivamus sem augue, blandit eget consequat sed, iaculis at arcu.',
      },
      {
        createdBy: {
          name: 'Alice Lee',
          avatar: avatar3,
        },
        createdAt: '2 weeks ago',
        content: 'Vestibulum cursus leo quis malesuada pharetra.',
      },
      {
        createdBy: {
          name: 'John Doe',
          avatar: avatar1,
        },
        createdAt: '2 weeks ago',
        content: 'Praesent sodales ante vitae tortor fermentum, vitae tempus quam faucibus.',
      },
    ],
  },
]
</script>

<template>
  <VRow>
    <!-- profile bio -->
    <VCol
      cols="12"
      md="4"
    >
      <!-- follower and following -->
      <VCard class="mb-6">
        <VCardText class="d-flex align-center justify-space-between">
          <div>
            <h5 class="text-h5 font-weight-semibold">
              94,049
            </h5>
            <span>Follower</span>
          </div>

          <VDivider vertical />

          <div>
            <h5 class="text-h5 font-weight-semibold">
              12,584
            </h5>
            <span>Following</span>
          </div>
        </VCardText>
      </VCard>

      <!-- intro -->
      <VCard title="Intro">
        <VCardText>
          <p>Software engineer, coffee lover, and occasional writer.</p>

          <VBtn
            block
            variant="tonal"
            class="mb-2"
          >
            Edit Bio
          </VBtn>

          <VList density="compact">
            <VListItem
              v-for="data in introData"
              :key="data.title"
              class="px-0"
              :prepend-icon="data.icon"
              :title="data.title"
            />
          </VList>

          <VBtn
            block
            variant="tonal"
          >
            Edit details
          </VBtn>

          <div class="d-flex align-center flex-wrap gap-2 mt-4">
            <VChip
              prepend-icon="mdi-book-open-page-variant-outline"
              variant="outlined"
              color="primary"
            >
              Reading Book
            </VChip>

            <VChip
              prepend-icon="mdi-airplane"
              variant="outlined"
              color="error"
            >
              Adaptive hunting
            </VChip>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- new post and post -->
    <VCol
      cols="12"
      md="8"
    >
      <!-- New post -->
      <VCard>
        <VCardText class="d-flex align-start gap-4">
          <VAvatar
            size="48"
            :image="avatar"
          />
          <VTextarea
            rows="2"
            auto-grow
            hide-details="auto"
            placeholder="What's on your mind?"
          />
        </VCardText>

        <VDivider />

        <!-- actions buttons -->
        <VCardActions class="justify-space-between flex-wrap">
          <VBtn>
            <VIcon
              start
              size="28"
              icon="mdi-video-outline"
              color="error"
            />
            <span>Live video</span>
          </VBtn>
          <VBtn>
            <VIcon
              start
              size="28"
              icon="mdi-image"
              color="success"
            />
            <span>Photo/video</span>
          </VBtn>
          <VBtn>
            <VIcon
              start
              size="28"
              icon="mdi-flag-checkered"
              color="info"
            />
            <span>Life event</span>
          </VBtn>
        </VCardActions>
      </VCard>

      <!-- post card -->
      <template
        v-for="post in posts"
        :key="post.likes"
      >
        <Post
          v-bind="post"
          class="mt-6"
        />
      </template>
    </VCol>
  </VRow>
</template>

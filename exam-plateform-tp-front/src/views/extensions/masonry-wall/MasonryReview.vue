<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar10 from '@/assets/avatars/avatar-10.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import avatar5 from '@/assets/avatars/avatar-5.png'
import avatar6 from '@/assets/avatars/avatar-6.png'
import avatar7 from '@/assets/avatars/avatar-7.png'
import avatar8 from '@/assets/avatars/avatar-8.png'
import avatar9 from '@/assets/avatars/avatar-9.png'
import MasonryWall from '@yeger/vue-masonry-wall'

const items = [
  {
    avatar: avatar1,
    title: 'John Doe',
    username: 'JohnDoe',
    description: 'wow! great job! clean code, no need to remove 95% of spare code, starter-kit did the job! everything\'s perfect!',
    review: 5,
    verified: true,
  },
  {
    avatar: avatar2,
    title: 'Jane Smith',
    username: 'JaneSmith',
    description: 'Awesome work! The code is well-structured and easy to understand.',
    review: 4,
    verified: false,
  },
  {
    avatar: avatar3,
    title: 'Bob Johnson',
    username: 'BobJohnson',
    description: 'Impressive job! The application is running smoothly without any errors.',
    review: 5,
    verified: true,
  },
  {
    avatar: avatar4,
    title: 'Emily Davis',
    username: 'EmilyDavis',
    description: 'Good effort, but there are a few areas that need improvement.',
    review: 3,
    verified: true,
  },
  {
    avatar: avatar5,
    title: 'Alex Wilson',
    username: 'AlexWilson',
    description: 'Decent work. Some minor bugs need to be fixed.',
    review: 3,
    verified: true,
  },
  {
    avatar: avatar6,
    title: 'Sarah Brown',
    username: 'SarahBrown',
    description: 'Not satisfied with the code quality. Requires extensive refactoring.',
    review: 2,
    verified: true,
  },
  {
    avatar: avatar7,
    title: 'Michael Lee',
    username: 'MichaelLee',
    description: 'Mediocre work. The application lacks essential features.',
    review: 2,
    verified: true,
  },
  {
    avatar: avatar8,
    title: 'Olivia Taylor',
    username: 'OliviaTaylor',
    description: 'Unsatisfactory results. Major issues need immediate attention.',
    review: 1,
    verified: true,
  },
  {
    avatar: avatar9,
    title: 'William Clark',
    username: 'WilliamClark',
    description: 'Below average quality. Numerous bugs and performance problems.',
    review: 2,
    verified: true,
  },
  {
    avatar: avatar10,
    title: 'William Clark',
    username: 'SophiaMartin',
    description: 'Fair work. The code needs better organization and optimization.',
    review: 3,
    verified: true,
  },
]
</script>

<template>
  <MasonryWall
    :items="items"
    :column-width="300"
    :gap="24"
  >
    <template #default="{ item }">
      <VCard
        color="secondary"
        variant="tonal"
        elevation="5"
      >
        <VCardText class="text-center">
          <VBadge
            :color="item.verified ? 'success' : 'error'"
            :icon="item.verified ? 'mdi-check' : 'mdi-shield-alert-outline'"
            location="bottom right"
            offset-y="8"
            offset-x="3"
            bordered
          >
            <VAvatar
              size="56"
              :image="item.avatar"
            />
          </VBadge>
          <VCardTitle class="font-weight-semibold text-high-emphasis pb-0">
            {{ item.title }}
          </VCardTitle>
          <VCardSubtitle class="text-high-emphasis mb-4">
            @{{ item.username }}
          </VCardSubtitle>
          <VRating
            readonly
            :model-value="item.review"
            density="comfortable"
          />
          <p class="text-medium-emphasis mb-0">
            {{ item.description }}
          </p>
        </VCardText>
      </VCard>
    </template>
  </MasonryWall>
</template>

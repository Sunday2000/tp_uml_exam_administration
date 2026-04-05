<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import { useSortable } from '@vueuse/integrations/useSortable'

const el = ref<HTMLElement | null>(null)

const list = ref([
  {
    title: 'Jayvion Simon',
    subtitle: 'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
    avatar: avatar1,
  },
  {
    title: 'Lainey Davidson',
    subtitle: 'Delicious Recipes for a Vegan Diet',
    avatar: avatar2,
  },
  {
    title: 'Melanie Noble',
    subtitle: 'Unde a inventore et. Sed esse ut. Atque ducimus quibusdam fuga quas id qui fuga.',
    avatar: avatar3,
  },
])

useSortable(el, list, {
  animation: 150,
})
</script>

<template>
  <VList
    ref="el"
    variant="outlined"
  >
    <VListItem
      v-for="item in list"
      :key="item.title"
      :title="item.title"
      :subtitle="item.subtitle"
      :prepend-avatar="item.avatar"
      class="py-3 rounded mb-2"
    >
      <template #append>
        <VBtn
          icon
          size="small"
          variant="outlined"
          color="primary"
          class="me-3"
        >
          <VIcon icon="mdi-pencil-outline" />
        </VBtn>
        <VBtn
          icon
          size="small"
          variant="outlined"
          color="info"
          class="me-3"
        >
          <VIcon icon="mdi-share-outline" />
        </VBtn>
        <VBtn
          icon
          size="small"
          variant="outlined"
          color="error"
        >
          <VIcon icon="mdi-delete-outline" />
        </VBtn>
      </template>
    </VListItem>
  </VList>
</template>

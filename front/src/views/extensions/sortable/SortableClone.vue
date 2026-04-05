<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar6 from '@/assets/avatars/avatar-6.png'
import avatar7 from '@/assets/avatars/avatar-7.png'
import avatar8 from '@/assets/avatars/avatar-8.png'
import { useSortable } from '@vueuse/integrations/useSortable'

const clone1 = ref<HTMLElement | null>(null)
const clone2 = ref<HTMLElement | null>(null)

const list = ref([
  {
    title: 'Jayvion Simon',
    avatar: avatar1,
  },
  {
    title: 'Lainey Davidson',
    avatar: avatar2,
  },
  {
    title: 'Melanie Noble',
    avatar: avatar3,
  },
])

const list2 = ref([
  {
    title: 'Jamal Kerrod',
    avatar: avatar6,
  },
  {
    title: 'Shamus Tuttle',
    avatar: avatar7,
  },
  {
    title: 'Ariella Filippyev',
    avatar: avatar8,
  },
])

useSortable(clone1, list, {
  group: { name: 'shared', pull: 'clone' },
  animation: 150,
})

useSortable(clone2, list2, {
  group: { name: 'shared', pull: 'clone' },
  animation: 150,
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VList
        ref="clone1"
        variant="outlined"
      >
        <VListItem
          v-for="item in list"
          :key="item.title"
          :title="item.title"
          :prepend-avatar="item.avatar"
          class="py-3 rounded mb-2"
        >
          <template #append>
            <VBtn
              icon
              size="small"
              variant="outlined"
              color="secondary"
            >
              <VIcon icon="mdi-atom" />
            </VBtn>
          </template>
        </VListItem>
      </VList>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VList
        ref="clone2"
        variant="outlined"
      >
        <VListItem
          v-for="item in list2"
          :key="item.title"
          :title="item.title"
          :prepend-avatar="item.avatar"
          class="py-3 rounded mb-2"
        >
          <template #append>
            <VBtn
              icon
              size="small"
              variant="outlined"
              color="secondary"
            >
              <VIcon icon="mdi-atom" />
            </VBtn>
          </template>
        </VListItem>
      </VList>
    </VCol>
  </VRow>
</template>

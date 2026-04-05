<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import { VDataIterator } from 'vuetify/labs/VDataIterator'

const activities = ref([
  {
    date: 'September 25, 2023',
    day: 'Monday',
    activity: 'Team brainstorming session',
    time: '10:00 AM - 12:30 PM',
  },
  {
    date: 'October 10, 2023',
    day: 'Tuesday',
    activity: 'Client presentation',
    time: '2:00 PM - 4:30 PM',
  },
  {
    date: 'November 15, 2023',
    day: 'Wednesday',
    activity: 'Marketing strategy workshop',
    time: '9:30 AM - 12:00 PM',
  },
  {
    date: 'December 5, 2023',
    day: 'Monday',
    activity: 'Meeting for campaign with sales teams',
    time: '12:00 PM - 2:30 PM',
  },
  {
    date: 'January 20, 2024',
    day: 'Friday',
    activity: 'Product development discussion',
    time: '11:00 AM - 1:30 PM',
  },
  {
    date: 'February 7, 2024',
    day: 'Tuesday',
    activity: 'Quarterly review meeting',
    time: '3:00 PM - 5:30 PM',
  },
  {
    date: 'March 14, 2024',
    day: 'Wednesday',
    activity: 'Marketing budget planning',
    time: '2:30 PM - 5:00 PM',
  },
  {
    date: 'April 25, 2024',
    day: 'Thursday',
    activity: 'Webinar preparation',
    time: '9:00 AM - 11:30 AM',
  },
  {
    date: 'May 30, 2024',
    day: 'Wednesday',
    activity: 'Team-building workshop',
    time: '10:30 AM - 1:00 PM',
  },
  {
    date: 'June 12, 2024',
    day: 'Thursday',
    activity: 'Meeting for campaign with sales teams',
    time: '12:30 PM - 3:00 PM',
  },
])

const page = ref(1)
const ItemPerPage = ref(4)

const getMonthAndDate = (value: string) => {
  const date = new Date(value)
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()

  return {
    month,
    day,
  }
}

const totalPages = computed(() => {
  if (activities.value)
    return Math.ceil(activities.value.length / ItemPerPage.value)
})
</script>

<template>
  <VCard title="Upcoming Activities">
    <template #append>
      <VBtn
        icon
        size="x-small"
        variant="plain"
      >
        <VIcon
          size="22"
          icon="mdi-dots-vertical"
        />
      </VBtn>
    </template>
    <VDivider />
    <VDataIterator
      :items="activities"
      :items-per-page="ItemPerPage"
      :page="page"
    >
      <template #default="{ items }">
        <VList lines="three">
          <template
            v-for="item in items"
            :key="item.raw.activity"
          >
            <VListItem>
              <template #prepend>
                <div
                  class="activity-date-bg rounded text-center pa-2 me-4"
                  style="width: 55px;"
                >
                  <h6
                    class="text-lg mb-1"
                    style="line-height: normal;"
                  >
                    {{ getMonthAndDate(item.raw.date).day }}
                  </h6>
                  <p
                    class="text-sm text-medium-emphasis font-weight-medium text-uppercase mb-0"
                    style="line-height: normal;"
                  >
                    {{ getMonthAndDate(item.raw.date).month }}
                  </p>
                </div>
              </template>
              <VListItemSubtitle>{{ item.raw.time }}</VListItemSubtitle>
              <VListItemTitle class="font-weight-medium">
                {{ item.raw.activity }}
              </VListItemTitle>
              <template #append>
                <div class="v-avatar-group">
                  <VAvatar
                    v-for="avatar in [avatar1, avatar2, avatar3, avatar4]"
                    :key="avatar"
                    size="26"
                    :image="avatar"
                  />
                </div>
              </template>
            </VListItem>
            <VDivider />
          </template>
        </VList>
      </template>
    </VDataIterator>
    <VCardText class="pt-0">
      <VPagination
        v-model="page"
        :length="totalPages"
        density="compact"
        active-color="primary"
      />
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.activity-date-bg {
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
}
</style>

export const activator = `<script setup lang="ts">
const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]
</script>

<template>
  <div class="d-flex flex-wrap gap-6">
    <VMenu>
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Activator slot
        </VBtn>
      </template>
      <VList>
        <VListItem
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>

    <VBtn color="primary">
      Parent activator

      <VMenu activator="parent">
        <VList>
          <VListItem
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <VListItemTitle>{{ item.title }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VBtn>

    <VBtn
      id="menu-activator"
      color="primary"
    >
      Sibling activator
    </VBtn>

    <VMenu activator="#menu-activator">
      <VList>
        <VListItem
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>
`
export const customTransition = `<script setup lang="ts">
const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]
</script>

<template>
  <div class="d-flex flex-wrap gap-6">
    <VMenu transition="scale-transition">
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Scale Transition
        </VBtn>
      </template>

      <VList>
        <VListItem
          v-for="(item, i) in items"
          :key="i"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>

    <VMenu transition="slide-x-transition">
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Slide X Transition
        </VBtn>
      </template>

      <VList>
        <VListItem
          v-for="(item, i) in items"
          :key="i"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>

    <VMenu transition="slide-y-transition">
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Slide Y Transition
        </VBtn>
      </template>
      <VList>
        <VListItem
          v-for="(item, i) in items"
          :key="i"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>
`
export const hover = `<script setup lang="ts">
const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]
</script>

<template>
  <div>
    <VMenu open-on-hover>
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Open on hover
        </VBtn>
      </template>

      <VList>
        <VListItem
          v-for="(item, index) in items"
          :key="index"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>
`
export const location = `<script setup lang="ts">
const location = ref('end')

const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]

const locations = [
  'top',
  'bottom',
  'start',
  'end',
  'center',
]
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VSelect
      v-model="location"
      :items="locations"
      label="Location"
      style="max-width: 8rem;"
    />

    <VMenu :location="location">
      <template #activator="{ props }">
        <VBtn
          color="primary"
          dark
          v-bind="props"
        >
          Dropdown
        </VBtn>
      </template>

      <VList>
        <VListItem
          v-for="(item, index) in items"
          :key="index"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>
`
export const popover = `<script setup lang="ts">
import avatar1 from '@/assets/avatars/avatar-1.png'

const fav = ref(true)
const menu = ref(false)
const message = ref(false)
const hints = ref(true)
</script>

<template>
  <div>
    <VMenu
      v-model="menu"
      :close-on-content-click="false"
      location="end"
    >
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          Menu as Popover
        </VBtn>
      </template>

      <VCard min-width="300">
        <VList>
          <VListItem
            :prepend-avatar="avatar1"
            title="John Leider"
            subtitle="Founder of Vuetify"
          >
            <template #append>
              <VBtn
                variant="text"
                :class="fav ? 'text-red' : ''"
                icon="mdi-heart-outline"
                @click="fav = !fav"
              />
            </template>
          </VListItem>
        </VList>

        <VDivider />

        <VList>
          <VListItem>
            <VSwitch
              v-model="message"
              color="purple"
              label="Enable messages"
              hide-details
            />
          </VListItem>

          <VListItem>
            <VSwitch
              v-model="hints"
              color="purple"
              label="Enable hints"
              hide-details
            />
          </VListItem>
        </VList>

        <VCardActions>
          <VSpacer />

          <VBtn
            variant="text"
            @click="menu = false"
          >
            Cancel
          </VBtn>
          <VBtn
            color="primary"
            variant="text"
            @click="menu = false"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VMenu>
  </div>
</template>
`
export const slot = `<script setup lang="ts">
import { mergeProps } from 'vue'

const items = [
  { title: 'Click Me 1' },
  { title: 'Click Me 2' },
  { title: 'Click Me 3' },
  { title: 'Click Me 4' },
]
</script>

<template>
  <div>
    <VMenu>
      <template #activator="{ props: menu }">
        <VTooltip location="top">
          <template #activator="{ props: tooltip }">
            <VBtn
              color="primary"
              v-bind="mergeProps(menu, tooltip)"
            >
              Dropdown w/ Tooltip
            </VBtn>
          </template>
          <span>I'm A Tooltip</span>
        </VTooltip>
      </template>
      <VList>
        <VListItem
          v-for="(item, index) in items"
          :key="index"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>
`

<script setup lang="ts">
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

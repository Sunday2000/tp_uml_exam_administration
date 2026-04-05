<script setup lang="ts">
interface Friend {
  avatar: string
  name: string
  designation: string
}

const props = defineProps<Friend>()

const socialButtons = [
  {
    icon: 'mdi-facebook',
    color: 'blue',
  },
  {
    icon: 'mdi-instagram',
    color: 'pink',
  },
  {
    icon: 'mdi-linkedin',
    color: 'blue',
  },
  {
    icon: 'mdi-twitter',
    color: 'blue',
  },
]
</script>

<template>
  <VCard>
    <VCardText class="text-center pa-8">
      <VAvatar
        size="80"
        :image="props.avatar"
        class="mb-4"
      />
      <h6 class="text-lg font-weight-regular mb-1">
        {{ props.name }}
      </h6>
      <span>{{ props.designation }}</span>

      <div class="mt-4">
        <VBtn
          v-for="item in socialButtons"
          :key="item.icon"
          icon
          size="36"
          :color="item.color"
          variant="text"
        >
          <VIcon
            size="20"
            :icon="item.icon"
          />
        </VBtn>
      </div>
    </VCardText>
  </VCard>
</template>

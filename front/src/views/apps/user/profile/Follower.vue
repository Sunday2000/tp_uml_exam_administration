<script setup lang="ts">
interface Follower {
  name: string
  avatar: string
  location: string
  followBack: boolean
}

interface Emit {
  (e: 'update:followBack', value: boolean): void
}

const props = defineProps<Follower>()
const emit = defineEmits<Emit>()
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardItem>
          <template #prepend>
            <VAvatar :image="props.avatar" />
          </template>
          <VCardTitle class="text-base">
            {{ props.name }}
          </VCardTitle>
          <VCardSubtitle class="d-flex align-center gap-1">
            <VIcon icon="mdi-map-marker-outline" />
            <span>{{ props.location }}</span>
          </VCardSubtitle>

          <template #append>
            <VBtn
              size="small"
              variant="tonal"
              :color="props.followBack ? 'success' : 'primary'"
              @click="emit('update:followBack', !props.followBack)"
            >
              {{ props.followBack ? 'Following' : 'Follow' }}
            </VBtn>
          </template>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

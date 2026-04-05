<script setup lang="ts">
const items = [
  {
    color: 'primary',
    icon: 'mdi-hexagram-outline',
  },
  {
    color: 'warning',
    icon: 'mdi-book-open-variant',
  },
  {
    color: 'success',
    icon: 'mdi-airballoon-outline',
  },
  {
    color: 'info',
    icon: 'mdi-layers-triple-outline',
  },
]
</script>

<template>
  <VTimeline
    align="start"
    :side="$vuetify.display.mdAndDown ? 'end' : undefined"
  >
    <VTimelineItem
      v-for="(item, i) in items"
      :key="i"
      :dot-color="item.color"
      :icon="item.icon"
      fill-dot
      size="x-small"
    >
      <VCard>
        <VCardItem :class="[`bg-${item.color}`]">
          <VCardTitle>
            Lorem Ipsum Dolor
          </VCardTitle>
        </VCardItem>
        <VCardText class="pt-5">
          <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
          <VBtn
            :color="item.color"
            variant="outlined"
          >
            Button
          </VBtn>
        </VCardText>
      </VCard>
    </VTimelineItem>
  </VTimeline>
</template>

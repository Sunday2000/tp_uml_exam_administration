export const alignment = `<template>
  <VTimeline
    align="start"
    :density="$vuetify.display.mdAndDown ? 'compact' : 'default'"
  >
    <VTimelineItem dot-color="primary">
      <template #opposite>
        Opposite content
      </template>
      <div>
        <div class="text-h6">
          Content title
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </VTimelineItem>

    <VTimelineItem dot-color="warning">
      <template #opposite>
        Opposite content
      </template>
      <div>
        <div class="text-h6">
          Content title
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </VTimelineItem>

    <VTimelineItem dot-color="success">
      <template #opposite>
        Opposite content
      </template>
      <div>
        <div class="text-h6">
          Content title
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </VTimelineItem>
  </VTimeline>
</template>
`
export const direction = `<template>
  <VTimeline
    :direction="$vuetify.display.mdAndUp ? 'horizontal' : 'vertical'"
    :density="$vuetify.display.mdAndDown ? 'compact' : 'comfortable'"
  >
    <VTimelineItem dot-color="primary">
      <template #opposite>
        Opposite content
      </template>
      <div>
        <div class="text-h6">
          Content title
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </VTimelineItem>

    <VTimelineItem dot-color="warning">
      <template #opposite>
        Opposite content
      </template>
      <div>
        <div class="text-h6">
          Content title
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </VTimelineItem>

    <VTimelineItem dot-color="success">
      <template #opposite>
        Opposite content
      </template>
      <div>
        <div class="text-h6">
          Content title
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </VTimelineItem>
  </VTimeline>
</template>
`
export const dotsIcon = `<script setup lang="ts">
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
        <VCardItem :class="[\`bg-\${item.color}\`]">
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
`
export const side = `<script setup lang="ts">
const items = [
  {
    id: 1,
    color: 'info',
    icon: 'mdi-information',
  },
  {
    id: 2,
    color: 'error',
    icon: 'mdi-alert-circle',
  },
]
</script>

<template>
  <VTimeline side="end">
    <VTimelineItem
      v-for="item in items"
      :key="item.id"
      :dot-color="item.color"
      size="small"
    >
      <VAlert
        value
        :color="item.color"
        :icon="item.icon"
      >
        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
      </VAlert>
    </VTimelineItem>
  </VTimeline>
</template>
`

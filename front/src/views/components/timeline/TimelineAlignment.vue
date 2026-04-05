<template>
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

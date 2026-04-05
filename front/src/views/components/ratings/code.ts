export const color = `<script setup lang="ts">
const rating = ref(3)
</script>

<template>
  <div class="d-flex flex-column">
    <VRating
      v-model="rating"
      color="secondary"
      active-color="primary"
    />

    <VRating
      v-model="rating"
      color="error"
      active-color="warning"
    />

    <VRating
      v-model="rating"
      color="warning"
      active-color="info"
    />
  </div>
</template>
`
export const density = `<script setup lang="ts">
const rating = ref(3)
</script>

<template>
  <div class="d-flex flex-column gap-4">
    <VRating
      v-model="rating"
      density="default"
    />

    <VRating
      v-model="rating"
      density="comfortable"
    />

    <VRating
      v-model="rating"
      density="compact"
    />
  </div>
</template>
`
export const halfIncrements = `<script setup lang="ts">
const rating = ref(3.5)
</script>

<template>
  <VRating
    v-model="rating"
    hover
    half-increments
  />
  <div class="font-weight-bold ps-4">
    {{ rating }}
  </div>
</template>
`
export const hoverEffect = `<script setup lang="ts">
const rating = ref(3)
</script>

<template>
  <VRating
    v-model="rating"
    hover
  />
</template>
 `
export const icons = `<script setup lang="ts">
const rating = ref(3.5)
</script>

<template>
  <VRating
    v-model="rating"
    empty-icon="mdi-circle-outline"
    full-icon="mdi-circle"
    half-icon="mdi-circle-half"
    half-increments
    hover
  />
</template>
`

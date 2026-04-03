export const icon = `<script setup lang="ts">
const page = ref(1)
</script>

<template>
  <VPagination
    v-model="page"
    :length="4"
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
  />
</template>
`
export const length = `<script setup lang="ts">
const page = ref(1)
</script>

<template>
  <VPagination
    v-model="page"
    :length="15"
  />
</template>
`
export const rounded = `<script setup lang="ts">
const page = ref(1)
</script>

<template>
  <VPagination
    v-model="page"
    :length="4"
    rounded="circle"
  />
</template>
`
export const size = `<script setup lang="ts">
const page = ref(1)
const size = ref('default')
</script>

<template>
  <VSelect
    v-model="size"
    label="Size"
    :items="['large', 'default', 'small', 'x-small']"
    class="mb-6"
    style="max-width: 10rem;"
  />

  <VPagination
    v-model="page"
    length="4"
    :size="size"
    color="secondary"
    active-color="primary"
  />
</template>
`
export const totalVisible = `<script setup lang="ts">
const page = ref(1)
</script>

<template>
  <VPagination
    v-model="page"
    :length="15"
    :total-visible="7"
  />
</template>
`
export const variant = `<script setup lang="ts">
type Variant = 'elevated' | 'outlined' | 'flat' | 'tonal' | 'plain' | 'text'
const page = ref(1)
const variant = ref<Variant>('elevated')
</script>

<template>
  <VSelect
    v-model="variant"
    label="Variant"
    :items="['elevated', 'outlined', 'flat', 'tonal', 'plain', 'text']"
    class="mb-6"
    style="max-width: 10rem;"
  />

  <VPagination
    v-model="page"
    length="4"
    :variant="variant"
    color="secondary"
    active-color="primary"
  />
</template>
`

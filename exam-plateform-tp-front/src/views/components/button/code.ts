export const color = `<template>
  <div class="d-flex flex-wrap gap-4">
    <VBtn color="primary">
      Primary
    </VBtn>
    <VBtn color="secondary">
      Secondary
    </VBtn>
    <VBtn color="success">
      Success
    </VBtn>
    <VBtn color="warning">
      Warning
    </VBtn>
    <VBtn color="info">
      Info
    </VBtn>
    <VBtn color="error">
      Error
    </VBtn>
  </div>
</template>
`
export const density = `<template>
  <div class="d-flex flex-wrap align-end gap-4">
    <VBtn
      color="primary"
      density="compact"
    >
      Compact
    </VBtn>

    <VBtn
      color="primary"
      density="comfortable"
    >
      Comfortable
    </VBtn>

    <VBtn
      color="primary"
      density="default"
    >
      Default
    </VBtn>
  </div>
</template>
`

export const group = `<script setup lang="ts">
import { ref } from 'vue'

const toggle = ref(null)
</script>

<template>
  <VBtnToggle
    v-model="toggle"
    color="primary"
    variant="outlined"
  >
    <VBtn icon="mdi-format-align-left" />
    <VBtn icon="mdi-format-align-center" />
    <VBtn icon="mdi-format-align-right" />
    <VBtn icon="mdi-format-align-justify" />
  </VBtnToggle>
</template>
`
export const icon = `<template>
  <div class="d-flex flex-wrap gap-4">
    <VBtn
      color="primary"
      icon="mdi-vuetify"
    />
    <VBtn
      color="secondary"
      icon="mdi-plus"
    />
    <VBtn
      icon="mdi-link"
      color="success"
    />
    <VBtn
      color="warning"
      icon="mdi-share"
    />
  </div>
</template>
`
export const loader = `<script setup lang="ts">
const loading = ref(false)

const load = () => {
  loading.value = true
  setTimeout(() => (loading.value = false), 3000)
}
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VBtn
      :loading="loading"
      variant="tonal"
      @click="load"
    >
      Default loader
    </VBtn>

    <VBtn
      :loading="loading"
      color="primary"
      @click="load"
    >
      Custom loader

      <template #loader>
        <VProgressLinear indeterminate />
      </template>
    </VBtn>
  </div>
</template>
`

export const rounded = `<template>
  <div class="d-flex flex-wrap gap-4">
    <VBtn
      color="primary"
      rounded="0"
    >
      Rounded 0
    </VBtn>

    <VBtn
      color="primary"
      rounded="xs"
    >
      Rounded xs
    </VBtn>

    <VBtn
      color="primary"
      rounded="sm"
    >
      Rounded sm
    </VBtn>

    <VBtn color="primary">
      Button
    </VBtn>

    <VBtn
      color="primary"
      rounded="lg"
    >
      Rounded lg
    </VBtn>

    <VBtn
      color="primary"
      rounded="xl"
    >
      Rounded xl
    </VBtn>
  </div>
</template>
`

export const size = `<template>
  <div class="d-flex flex-wrap align-end gap-4">
    <VBtn
      color="primary"
      size="x-small"
    >
      Extra small
    </VBtn>
    <VBtn
      color="primary"
      size="small"
    >
      Small
    </VBtn>
    <VBtn color="primary">
      Regular
    </VBtn>
    <VBtn
      color="primary"
      size="large"
    >
      Large
    </VBtn>
    <VBtn
      color="primary"
      size="x-large"
    >
      X-Large
    </VBtn>
  </div>
</template>
`
export const variant = `<template>
  <div class="d-flex flex-wrap gap-4">
    <VBtn
      color="primary"
      variant="elevated"
    >
      Elevated
    </VBtn>
    <VBtn
      color="secondary"
      variant="flat"
    >
      Flat
    </VBtn>
    <VBtn
      color="success"
      variant="tonal"
    >
      Tonal
    </VBtn>
    <VBtn
      color="warning"
      variant="outlined"
    >
      Outlined
    </VBtn>
    <VBtn
      color="info"
      variant="text"
    >
      Text
    </VBtn>
    <VBtn
      color="error"
      variant="plain"
    >
      Plain
    </VBtn>
  </div>
</template>
`

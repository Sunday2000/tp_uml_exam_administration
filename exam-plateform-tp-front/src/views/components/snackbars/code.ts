export const basic = `<script setup lang="ts">
const snackbar = ref(false)
const text = ref('Hello, I\'m a snackbar')
</script>

<template>
  <div>
    <VBtn
      color="primary"
      @click="snackbar = true"
    >
      Open Snackbar
    </VBtn>

    <VSnackbar v-model="snackbar">
      {{ text }}

      <template #actions>
        <VBtn
          color="error"
          variant="tonal"
          size="small"
          @click="snackbar = false"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </div>
</template>
`
export const multiLine = `<script setup lang="ts">
const snackbar = ref(false)

const text = 'I am a multi-line snackbar.\nI can have more than one line. This is another line that is quite long.'
</script>

<template>
  <div>
    <VBtn
      color="primary"
      @click="snackbar = true"
    >
      Open Snackbar
    </VBtn>

    <VSnackbar
      v-model="snackbar"
      multi-line
    >
      {{ text }}

      <template #actions>
        <VBtn
          color="error"
          variant="tonal"
          size="small"
          @click="snackbar = false"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </div>
</template>
`
export const timeout = `<script setup lang="ts">
const snackbar = ref(false)
const text = ref('My timeout is set to 2000.')
const timeout = ref(2000)
</script>

<template>
  <div>
    <VBtn
      color="primary"
      @click="snackbar = true"
    >
      Open Snackbar
    </VBtn>

    <VSnackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template #actions>
        <VBtn
          color="error"
          variant="tonal"
          size="small"
          @click="snackbar = false"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </div>
</template>
`
export const variant = `<template>
  <div class="d-flex flex-wrap gap-4">
    <VSnackbar :timeout="2000">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          open
        </VBtn>
      </template>

      Lorem ipsum dolor sit amet consectetur.
    </VSnackbar>

    <VSnackbar
      :timeout="2000"
      color="primary"
      rounded="pill"
    >
      <template #activator="{ props }">
        <VBtn
          rounded="pill"
          color="primary"
          v-bind="props"
        >
          open
        </VBtn>
      </template>

      Snackbar with <strong>rounded="pill"</strong>.
    </VSnackbar>

    <VSnackbar
      :timeout="2000"
      color="primary"
      elevation="24"
    >
      <template #activator="{ props }">
        <VBtn
          color="primary"
          v-bind="props"
        >
          open
        </VBtn>
      </template>

      Snackbar with <strong>elevation="24"</strong>.
    </VSnackbar>

    <VSnackbar
      :timeout="2000"
      color="primary"
      variant="tonal"
    >
      <template #activator="{ props }">
        <VBtn
          color="primary"
          variant="tonal"

          v-bind="props"
        >
          open
        </VBtn>
      </template>

      Snackbar with <strong>tonal</strong> variant.
    </VSnackbar>

    <VSnackbar
      :timeout="2000"
      color="primary"
      variant="outlined"
    >
      <template #activator="{ props }">
        <VBtn
          color="primary"
          variant="outlined"

          v-bind="props"
        >
          open
        </VBtn>
      </template>

      Snackbar with <strong>outlined</strong> variant.
    </VSnackbar>
  </div>
</template>
`
export const vertical = `<script setup lang="ts">
const snackbar = ref(false)
</script>

<template>
  <div>
    <VBtn
      color="primary"
      @click="snackbar = true"
    >
      Open Snackbar
    </VBtn>

    <VSnackbar
      v-model="snackbar"
      vertical
    >
      <div class="text-subtitle-1 pb-2">
        This is a snackbar message
      </div>

      <p>This is a longer paragraph explaining something</p>

      <template #actions>
        <VBtn
          color="error"
          variant="tonal"
          size="small"
          @click="snackbar = false"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </div>
</template>
`

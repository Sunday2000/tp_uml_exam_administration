<template>
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

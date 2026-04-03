<template>
  <VDialog
    transition="dialog-bottom-transition"
    width="auto"
  >
    <template #activator="{ props }">
      <VBtn
        color="primary"
        v-bind="props"
        class="me-4"
      >
        From the bottom
      </VBtn>
    </template>

    <template #default="{ isActive }">
      <VCard>
        <VToolbar
          color="primary"
          title="Opening from the bottom"
        />
        <VCardText>
          <div class="text-h2 pa-12">
            Hello world!
          </div>
        </VCardText>
        <VCardActions class="justify-end">
          <VBtn
            variant="text"
            @click="isActive.value = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>

  <VDialog
    transition="dialog-top-transition"
    width="auto"
  >
    <template #activator="{ props }">
      <VBtn
        color="primary"
        v-bind="props"
      >
        From the top
      </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VToolbar
          color="primary"
          title="Opening from the top"
        />
        <VCardText>
          <div class="text-h2 pa-12">
            Hello world!
          </div>
        </VCardText>
        <VCardActions class="justify-end">
          <VBtn
            variant="text"
            @click="isActive.value = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>

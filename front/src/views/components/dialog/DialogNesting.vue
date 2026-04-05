<script setup lang="ts">
const dialog = ref(false)
const dialog2 = ref(false)
const dialog3 = ref(false)
</script>

<template>
  <div>
    <VBtn
      color="primary"
      @click="dialog = true"
    >
      Open Dialog 1
    </VBtn>

    <VDialog
      v-model="dialog"
      width="auto"
    >
      <VCard title="Dialog 1">
        <VCardText>
          <VBtn
            color="primary"
            @click="dialog2 = true"
          >
            Open Dialog 2
          </VBtn>
        </VCardText>

        <VCardActions>
          <VBtn
            color="primary"
            @click="dialog = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog
      v-model="dialog2"
      width="auto"
    >
      <VCard title="Dialog 2">
        <VCardText>
          <VBtn
            color="primary"
            @click="dialog3 = !dialog3"
          >
            Open Dialog 3
          </VBtn>
        </VCardText>

        <VCardActions>
          <VBtn
            color="primary"
            @click="dialog2 = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog
      v-model="dialog3"
      width="auto"
    >
      <VCard title="Dialog 3">
        <VCardActions>
          <VBtn
            color="primary"
            @click="dialog3 = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

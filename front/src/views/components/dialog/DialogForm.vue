<script setup lang="ts">
const dialog = ref(false)
</script>

<template>
  <VDialog
    v-model="dialog"
    persistent
    width="600"
  >
    <template #activator="{ props }">
      <VBtn
        color="primary"
        v-bind="props"
      >
        Open Dialog
      </VBtn>
    </template>

    <VCard title="User Profile">
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField
              label="Legal first name*"
              required
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField
              label="Legal middle name"
              hint="example of helper text only on focus"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField
              label="Legal last name*"
              hint="example of persistent helper text"
              persistent-hint
              required
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              label="Email*"
              required
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              label="Password*"
              type="password"
              required
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <VSelect
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Age*"
              required
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <VAutocomplete
              :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
              label="Interests"
              multiple
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn
          color="error"
          @click="dialog = false"
        >
          Close
        </VBtn>
        <VBtn
          color="primary"
          @click="dialog = false"
        >
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

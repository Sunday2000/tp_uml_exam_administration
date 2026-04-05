<script setup lang="ts">
const dialogm1 = ref('')
const dialog = ref(false)
</script>

<template>
  <VDialog
    v-model="dialog"
    scrollable
    width="auto"
  >
    <template #activator="{ props }">
      <VBtn
        color="primary"
        v-bind="props"
      >
        Open Dialog
      </VBtn>
    </template>

    <VCard title="Select Country">
      <VDivider />
      <VCardText style="height: 300px;">
        <VRadioGroup
          v-model="dialogm1"
          column
        >
          <VRadio
            label="Bahamas, The"
            value="bahamas"
          />
          <VRadio
            label="Bahrain"
            value="bahrain"
          />
          <VRadio
            label="Bangladesh"
            value="bangladesh"
          />
          <VRadio
            label="Barbados"
            value="barbados"
          />
          <VRadio
            label="Belarus"
            value="belarus"
          />
          <VRadio
            label="Belgium"
            value="belgium"
          />
          <VRadio
            label="Belize"
            value="belize"
          />
          <VRadio
            label="Benin"
            value="benin"
          />
          <VRadio
            label="Bhutan"
            value="bhutan"
          />
          <VRadio
            label="Bolivia"
            value="bolivia"
          />
          <VRadio
            label="Bosnia and Herzegovina"
            value="bosnia"
          />
          <VRadio
            label="Botswana"
            value="botswana"
          />
          <VRadio
            label="Brazil"
            value="brazil"
          />
          <VRadio
            label="Brunei"
            value="brunei"
          />
          <VRadio
            label="Bulgaria"
            value="bulgaria"
          />
          <VRadio
            label="Burkina Faso"
            value="burkina"
          />
          <VRadio
            label="Burma"
            value="burma"
          />
          <VRadio
            label="Burundi"
            value="burundi"
          />
        </VRadioGroup>
      </VCardText>

      <VDivider />

      <VCardActions>
        <VBtn
          color="error"
          @click="dialog = false"
        >
          Close
        </VBtn>
        <VBtn
          color="success"
          @click="dialog = false"
        >
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

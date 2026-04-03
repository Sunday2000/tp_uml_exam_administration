<script setup lang="ts">
const checkOn = ref(true)
const checkOff = ref(false)
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <VCheckbox
        v-model="checkOn"
        label="On"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <VCheckbox
        v-model="checkOff"
        label="Off"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <VCheckbox
        indeterminate
        label="Indeterminate"
      />
    </VCol>

    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <VCheckbox
        model-value="disabledOn"
        disabled
        label="Disabled On"
        value="disabledOn"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <VCheckbox
        :model-value="false"
        disabled
        label="Disabled Off"
      />
    </VCol>
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <VCheckbox
        disabled
        indeterminate
        label="Disabled Indeterminate"
      />
    </VCol>
  </VRow>
</template>

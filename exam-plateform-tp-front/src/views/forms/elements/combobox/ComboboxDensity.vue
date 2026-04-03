<script setup lang="ts">
const items = ['foo', 'bar', 'fizz', 'buzz']

const value = ref('foo')
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCombobox
        v-model="value"
        :items="items"
        density="default"
        label="Default"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="value"
        :items="items"
        density="comfortable"
        label="Comfortable"
      />
    </VCol>
    <VCol cols="12">
      <VCombobox
        v-model="value"
        :items="items"
        density="compact"
        label="Compact"
      />
    </VCol>
  </VRow>
</template>

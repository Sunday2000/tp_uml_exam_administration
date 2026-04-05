<script setup lang="ts">
const files = ref([])
</script>

<template>
  <VFileInput
    v-model="files"
    counter
    multiple
    label="File input"
    placeholder="Select your files"
    prepend-icon="mdi-paperclip"
    :show-size="1000"
  >
    <template #selection="{ fileNames }">
      <template
        v-for="(fileName, index) in fileNames"
        :key="fileName"
      >
        <VChip
          v-if="index < 2"
          color="primary"
          label
          size="small"
          class="me-2"
        >
          {{ fileName }}
        </VChip>

        <span
          v-else-if="index === 2"
          class="text-overline mx-2"
        >
          +{{ files.length - 2 }} File(s)
        </span>
      </template>
    </template>
  </VFileInput>
</template>

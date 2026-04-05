<script setup lang="ts">
const selectedBg = ref(undefined)
</script>

<template>
  <div class="d-flex gap-4 align-center flex-wrap">
    <VBreadcrumbs
      :bg-color="selectedBg"
      :items="['Foo', 'Bar', 'Fizz']"
      class="flex-grow-1"
    />

    <div style="width: 8rem;">
      <VSelect
        v-model="selectedBg"
        label="Select bg"
        :items="['primary', 'secondary', 'success', 'warning', 'info', 'error']"
      />
    </div>
  </div>
</template>

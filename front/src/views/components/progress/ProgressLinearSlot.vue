<script setup lang="ts">
const skill = ref(20)
const knowledge = ref(33)
const power = ref(78)
</script>

<template>
  <div class="d-flex flex-column gap-4">
    <VProgressLinear
      v-model="power"
      color="primary"
      height="25"
    />

    <VProgressLinear
      v-model="skill"
      color="secondary"
      height="25"
    >
      <template #default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </VProgressLinear>

    <VProgressLinear
      v-model="knowledge"
      height="25"
      color="info"
    >
      <strong>{{ Math.ceil(knowledge) }}%</strong>
    </VProgressLinear>
  </div>
</template>

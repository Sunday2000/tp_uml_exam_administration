<script setup lang="ts">
const rules = [(v: string | any[]) => v.length <= 25 || 'Max 25 characters']

const value = ref('Hello!')
</script>

<template>
  <VTextarea
    counter
    label="Text"
    :rules="rules"
    :model-value="value"
  />
</template>

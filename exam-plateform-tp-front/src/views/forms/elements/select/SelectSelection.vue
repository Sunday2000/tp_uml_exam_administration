<script setup lang="ts">
const items = ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar']

const value = ref(['foo', 'bar', 'fizz'])
</script>

<template>
  <VSelect
    v-model="value"
    :items="items"
    label="Select Item"
    multiple
  >
    <template #selection="{ item, index }">
      <VChip v-if="index < 2">
        <span>{{ item.title }}</span>
      </VChip>
      <span
        v-if="index === 2"
        class="text-grey text-caption align-self-center"
      >
        (+{{ value.length - 2 }} others)
      </span>
    </template>
  </VSelect>
</template>

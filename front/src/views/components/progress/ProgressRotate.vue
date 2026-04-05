<script setup lang="ts">
const value = ref(0)

let interval = setInterval(() => {
  if (value.value === 100)
    return (value.value = 0)

  value.value += 10
}, 1000)

onMounted(() => {
  interval = setInterval(() => {
    if (value.value === 100)
      return (value.value = 0)

    value.value += 10
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="d-flex align-center gap-4 flex-wrap">
    <VProgressCircular
      :rotate="360"
      :size="70"
      :width="7"
      :model-value="value"
      color="teal"
    >
      {{ value }}
    </VProgressCircular>

    <VProgressCircular
      :rotate="-90"
      :size="70"
      :width="7"
      :model-value="value"
      color="primary"
    >
      {{ value }}
    </VProgressCircular>

    <VProgressCircular
      :rotate="90"
      :size="70"
      :width="7"
      :model-value="value"
      color="red"
    >
      {{ value }}
    </VProgressCircular>

    <VProgressCircular
      :rotate="180"
      :size="70"
      :width="7"
      :model-value="value"
      color="pink"
    >
      {{ value }}
    </VProgressCircular>
  </div>
</template>

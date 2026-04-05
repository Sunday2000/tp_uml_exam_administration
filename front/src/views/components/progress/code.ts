export const color = `<template>
  <div class="d-flex align-center flex-wrap gap-4">
    <VProgressCircular
      model-value="100"
      color="primary"
    />

    <VProgressCircular
      model-value="80"
      color="secondary"
    />

    <VProgressCircular
      model-value="60"
      color="success"
    />

    <VProgressCircular
      model-value="40"
      color="warning"
    />

    <VProgressCircular
      model-value="20"
      color="info"
    />

    <VProgressCircular
      model-value="20"
      color="error"
    />
  </div>
</template>
`
export const indeterminate = `<template>
  <div class="d-flex align-center gap-4 flex-wrap">
    <VProgressCircular
      indeterminate
      color="primary"
    />

    <VProgressCircular
      indeterminate
      color="secondary"
    />

    <VProgressCircular
      indeterminate
      color="success"
    />

    <VProgressCircular
      indeterminate
      color="warning"
    />

    <VProgressCircular
      indeterminate
      color="info"
    />

    <VProgressCircular
      indeterminate
      color="error"
    />
  </div>
</template>
`
export const linearColor = `<template>
  <div class="d-flex flex-column gap-4">
    <VProgressLinear
      model-value="15"
      color="primary"
    />

    <VProgressLinear
      model-value="30"
      bg-color="warning"
      color="warning"
    />

    <VProgressLinear
      model-value="45"
      bg-color="success"
      color="error"
    />
  </div>
</template>
`
export const linearIndeterminate = `<template>
  <div class="d-flex flex-column gap-4">
    <VProgressLinear
      indeterminate
      color="primary"
    />

    <VProgressLinear
      indeterminate
      color="success"
    />

    <VProgressLinear
      indeterminate
      color="warning"
    />
  </div>
</template>
`
export const linearRounded = `<template>
  <div class="d-flex flex-column gap-4">
    <VProgressLinear
      model-value="100"
      color="primary"
      rounded
    />

    <VProgressLinear
      model-value="100"
      color="success"
      rounded
    />

    <VProgressLinear
      model-value="100"
      color="warning"
      rounded
    />
  </div>
</template>
`
export const linearSlot = `<script setup lang="ts">
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
`
export const linearStriped = `<template>
  <div class="d-flex flex-column gap-4">
    <VProgressLinear
      model-value="10"
      color="primary"
      height="10"
      striped
    />

    <VProgressLinear
      model-value="20"
      color="success"
      height="10"
      striped
    />

    <VProgressLinear
      model-value="45"
      height="10"
      striped
      color="warning"
    />
  </div>
</template>
`
export const rotate = `<script setup lang="ts">
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
`
export const sizeWidth = `<template>
  <div class="d-flex align-center flex-wrap gap-4">
    <VProgressCircular
      :size="50"
      color="primary"
      indeterminate
    />

    <VProgressCircular
      :width="3"
      color="red"
      indeterminate
    />

    <VProgressCircular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    />

    <VProgressCircular
      :width="3"
      color="green"
      indeterminate
    />

    <VProgressCircular
      :size="50"
      color="amber"
      indeterminate
    />
  </div>
</template>
`

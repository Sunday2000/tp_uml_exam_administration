export const color = `<template>
  <VRow>
    <VCol
      cols="12"
      sm="4"
      md="4"
    >
      <VSwitch
        model-value="red"
        label="red"
        color="red"
        value="red"
      />
      <VSwitch
        model-value="red-darken-3"
        label="red-darken-3"
        color="red-darken-3"
        value="red-darken-3"
      />
    </VCol>
    <VCol
      cols="12"
      sm="4"
      md="4"
    >
      <VSwitch
        model-value="indigo"
        label="indigo"
        color="indigo"
        value="indigo"
      />
      <VSwitch
        model-value="indigo-darken-3"
        label="indigo-darken-3"
        color="indigo-darken-3"
        value="indigo-darken-3"
      />
    </VCol>
    <VCol
      cols="12"
      sm="4"
      md="4"
    >
      <VSwitch
        model-value="orange"
        label="orange"
        color="orange"
        value="orange"
      />
      <VSwitch
        model-value="orange-darken-3"
        label="orange-darken-3"
        color="orange-darken-3"
        value="orange-darken-3"
      />
    </VCol>
  </VRow>

  <VRow class="mt-6">
    <VCol
      cols="12"
      sm="4"
      md="4"
    >
      <VSwitch
        model-value="primary"
        label="primary"
        color="primary"
        value="primary"
      />
      <VSwitch
        model-value="secondary"
        label="secondary"
        color="secondary"
        value="secondary"
      />
    </VCol>
    <VCol
      cols="12"
      sm="4"
      md="4"
    >
      <VSwitch
        model-value="success"
        label="success"
        color="success"
        value="success"
      />
      <VSwitch
        model-value="info"
        label="info"
        color="info"
        value="info"
      />
    </VCol>
    <VCol
      cols="12"
      sm="4"
      md="4"
    >
      <VSwitch
        model-value="warning"
        label="warning"
        color="warning"
        value="warning"
      />
      <VSwitch
        model-value="error"
        label="error"
        color="error"
        value="error"
      />
    </VCol>
  </VRow>
</template>
`
export const custom = `<script setup lang="ts">
const switchToggle = ref(false)
</script>

<template>
  <VLabel
    class="custom-label border rounded w-100"
    :class="switchToggle ? 'text-primary border-primary border-opacity-100' : ''"
  >
    <VIcon
      :icon="switchToggle ? 'mdi-unfold-more-vertical' : 'mdi-unfold-less-vertical'"
      class="custom-label-icon"
    />
    <VSwitch v-model="switchToggle" />

    <VTooltip
      activator="parent"
      location="top"
    >
      {{ switchToggle ? 'Expand' : 'Collapse' }}
    </VTooltip>
  </VLabel>
</template>
`
export const inset = `<script setup lang="ts">
const model = ref(true)
</script>

<template>
  <VSwitch
    v-model="model"
    inset
    :label="\`Switch: \${model.toString()}\`"
  />
</template>
`
export const slot = `<script setup lang="ts">
const switchMe = ref(false)
</script>

<template>
  <VSwitch v-model="switchMe">
    <template #label>
      Turn on the progress:
      <VProgressCircular
        :indeterminate="switchMe"
        size="24"
        class="ms-2"
      />
    </template>
  </VSwitch>
</template>
`
export const states = `<template>
  <VRow>
    <VCol cols="6">
      <VSwitch
        color="primary"
        model-value
        label="on"
      />
    </VCol>
    <VCol cols="6">
      <VSwitch
        color="primary"
        :model-value="false"
        label="off"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="6">
      <VSwitch
        color="primary"
        model-value="onDisabled"
        disabled
        label="on disabled"
        value="onDisabled"
      />
    </VCol>
    <VCol cols="6">
      <VSwitch
        color="primary"
        :model-value="false"
        disabled
        label="off disabled"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="6">
      <VSwitch
        loading="warning"
        model-value
        label="on loading"
      />
    </VCol>
    <VCol cols="6">
      <VSwitch
        :model-value="false"
        loading="warning"
        label="off loading"
      />
    </VCol>
  </VRow>
</template>
`

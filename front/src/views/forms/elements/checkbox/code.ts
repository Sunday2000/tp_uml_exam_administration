export const color = `<template>
  <div>
    <VRow>
      <VCol
        cols="12"
        sm="4"
      >
        <VCheckbox
          model-value="red"
          label="red"
          color="red"
          value="red"
        />
        <VCheckbox
          model-value="red-darken-3"
          label="red-darken-3"
          color="red-darken-3"
          value="red-darken-3"
        />
      </VCol>
      <VCol
        cols="12"
        sm="4"
      >
        <VCheckbox
          model-value="indigo"
          label="indigo"
          color="indigo"
          value="indigo"
        />
        <VCheckbox
          model-value="indigo-darken-3"
          label="indigo-darken-3"
          color="indigo-darken-3"
          value="indigo-darken-3"
        />
      </VCol>
      <VCol
        cols="12"
        sm="4"
      >
        <VCheckbox
          model-value="orange"
          label="orange"
          color="orange"
          value="orange"
        />
        <VCheckbox
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
      >
        <VCheckbox
          model-value="primary"
          label="primary"
          color="primary"
          value="primary"
        />
        <VCheckbox
          model-value="secondary"
          label="secondary"
          color="secondary"
          value="secondary"
        />
      </VCol>
      <VCol
        cols="12"
        sm="4"
      >
        <VCheckbox
          model-value="success"
          label="success"
          color="success"
          value="success"
        />
        <VCheckbox
          model-value="info"
          label="info"
          color="info"
          value="info"
        />
      </VCol>
      <VCol
        cols="12"
        sm="4"
      >
        <VCheckbox
          model-value="warning"
          label="warning"
          color="warning"
          value="warning"
        />
        <VCheckbox
          model-value="error"
          label="error"
          color="error"
          value="error"
        />
      </VCol>
    </VRow>
  </div>
</template>
`

export const custom = `<script setup lang="ts">
const selectedCheckbox = ref<string[]>(['checkbox-1'])

const checkboxes = [
  {
    label: 'Option 1',
    value: 'checkbox-1',
    icon: 'mdi-view-compact-outline',
  },
  {
    label: 'Option 2',
    value: 'checkbox-2',
    icon: 'mdi-view-dashboard-outline',
  },
  {
    label: 'Option 3',
    value: 'checkbox-3',
    icon: 'mdi-view-sequential-outline',
  },
]
</script>

<template>
  <div class="d-flex justify-space-between gap-4 w-100">
    <VLabel
      v-for="item in checkboxes"
      :key="item.value"
      class="custom-label border rounded"
      :class="selectedCheckbox.includes(item.value) ? 'text-primary border-primary border-opacity-100' : ''"
    >
      <VIcon
        :icon="item.icon"
        class="custom-label-icon"
      />
      <VCheckbox
        v-model="selectedCheckbox"
        :value="item.value"
      />
      <VTooltip
        activator="parent"
        location="top"
      >
        {{ item.label }}
      </VTooltip>
    </VLabel>
  </div>
</template>
`
export const labelSlot = `<script setup lang="ts">
const checkbox = ref(false)
</script>

<template>
  <VCheckbox v-model="checkbox">
    <template #label>
      I agree that Vuetify is awesome
    </template>
  </VCheckbox>
</template>
`
export const modelAsArray = `<script setup lang="ts">
const selected = ref(['John'])
</script>

<template>
  <p>{{ selected }}</p>
  <VCheckbox
    v-model="selected"
    label="John"
    value="John"
  />
  <VCheckbox
    v-model="selected"
    label="Jacob"
    value="Jacob"
  />
</template>
`
export const modelAsBoolean = `<script setup lang="ts">
const checkbox1 = ref(true)
const checkbox2 = ref(false)
</script>

<template>
  <VCheckbox
    v-model="checkbox1"
    :label="\`Checkbox 1: \${checkbox1.toString()}\`"
  />
  <VCheckbox
    v-model="checkbox2"
    :label="\`Checkbox 2: \${checkbox2.toString()}\`"
  />
</template>
`
export const states = `<script setup lang="ts">
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
`

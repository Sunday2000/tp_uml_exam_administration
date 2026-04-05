export const color = `<script setup lang="ts">
const ex8 = ref('primary')
</script>

<template>
  <VRadioGroup
    v-model="ex8"
    inline
  >
    <VRadio
      label="primary"
      color="primary"
      value="primary"
    />
    <VRadio
      label="secondary"
      color="secondary"
      value="secondary"
    />
    <VRadio
      label="success"
      color="success"
      value="success"
    />
    <VRadio
      label="info"
      color="info"
      value="info"
    />
    <VRadio
      label="warning"
      color="warning"
      value="warning"
    />
    <VRadio
      label="error"
      color="error"
      value="error"
    />
  </VRadioGroup>
</template>
`
export const custom = `<script setup lang="ts">
const customRadio = ref('radio-1')

const radios = [
  {
    label: 'Option 1',
    value: 'radio-1',
    icon: 'mdi-view-compact-outline',
  },
  {
    label: 'Option 2',
    value: 'radio-2',
    icon: 'mdi-view-dashboard-outline',
  },
  {
    label: 'Option 3',
    value: 'radio-3',
    icon: 'mdi-view-sequential-outline',
  },
]
</script>

<template>
  <VRadioGroup
    v-model="customRadio"
    inline
  >
    <div class="d-flex justify-space-between gap-4 w-100">
      <VLabel
        v-for="item in radios"
        :key="item.value"
        class="custom-label border rounded"
        :class="customRadio === item.value ? 'text-primary border-primary border-opacity-100' : ''"
      >
        <VIcon
          :icon="item.icon"
          class="custom-label-icon"
        />
        <VRadio :value="item.value" />
        <VTooltip
          activator="parent"
          location="top"
        >
          {{ item.label }}
        </VTooltip>
      </VLabel>
    </div>
  </VRadioGroup>
</template>
`
export const direction = `<script setup lang="ts">
const column = ref(null)
const inline = ref(null)
</script>

<template>
  <VRadioGroup
    v-model="column"
    column
  >
    <VRadio
      label="Option 1"
      value="radio-1"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
    />
  </VRadioGroup>

  <VDivider />

  <VRadioGroup
    v-model="inline"
    inline
  >
    <VRadio
      label="Option 1"
      value="radio-1"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
    />
  </VRadioGroup>
</template>
`
export const label = `<script setup lang="ts">
const radios = ref('Duckduckgo')
</script>

<template>
  <VRadioGroup v-model="radios">
    <template #label>
      <div>Your favorite <strong>search engine</strong></div>
    </template>
    <VRadio value="Google">
      <template #label>
        <div>Of course it's <strong class="text-success">Google</strong></div>
      </template>
    </VRadio>
    <VRadio value="Duckduckgo">
      <template #label>
        <div>Definitely <strong class="text-primary">Duckduckgo</strong></div>
      </template>
    </VRadio>
  </VRadioGroup>
</template>
`

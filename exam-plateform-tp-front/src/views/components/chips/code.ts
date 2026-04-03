export const colors = `<template>
  <div class="d-flex flex-wrap gap-4">
    <VChip>Default</VChip>

    <VChip color="primary">
      Primary
    </VChip>

    <VChip color="secondary">
      Secondary
    </VChip>

    <VChip color="success">
      Success
    </VChip>

    <VChip color="warning">
      Warning
    </VChip>

    <VChip color="info">
      Info
    </VChip>

    <VChip color="error">
      Error
    </VChip>
  </div>
</template>
`
export const label = `<template>
  <div class="d-flex flex-wrap gap-4">
    <VChip label>
      Default
    </VChip>

    <VChip
      label
      color="primary"
    >
      Primary
    </VChip>

    <VChip
      label
      color="secondary"
    >
      Secondary
    </VChip>

    <VChip
      label
      color="success"
    >
      Success
    </VChip>

    <VChip
      label
      color="warning"
    >
      Warning
    </VChip>

    <VChip
      label
      color="info"
    >
      Info
    </VChip>

    <VChip
      label
      color="error"
    >
      Error
    </VChip>
  </div>
</template>
`

export const outlined = `<template>
  <div class="d-flex flex-wrap gap-4">
    <VChip variant="outlined">
      Default
    </VChip>

    <VChip
      variant="outlined"
      color="primary"
    >
      Primary
    </VChip>

    <VChip
      variant="outlined"
      color="secondary"
    >
      Secondary
    </VChip>

    <VChip
      variant="outlined"
      color="success"
    >
      Success
    </VChip>

    <VChip
      variant="outlined"
      color="warning"
    >
      Warning
    </VChip>

    <VChip
      variant="outlined"
      color="info"
    >
      Info
    </VChip>

    <VChip
      variant="outlined"
      color="error"
    >
      Error
    </VChip>
  </div>
</template>
`

export const sizes = `<template>
  <div class="d-flex flex-wrap align-end gap-4">
    <VChip size="x-small">
      x-small chip
    </VChip>

    <VChip size="small">
      small chip
    </VChip>

    <VChip>
      Default
    </VChip>

    <VChip size="large">
      large chip
    </VChip>

    <VChip size="x-large">
      x-large chip
    </VChip>
  </div>
</template>
`
export const slots = `<template>
  <div class="d-flex flex-wrap align-end gap-4">
    <VChip
      color="indigo"
      prepend-icon="mdi-account-circle"
    >
      Mike
    </VChip>

    <VChip
      color="orange"
      append-icon="mdi-star"
    >
      Premium
    </VChip>

    <VChip
      color="primary"
      append-icon="mdi-cake-variant"
    >
      1 Year
    </VChip>

    <VChip color="success">
      <template #prepend>
        <VAvatar
          variant="tonal"
          color="success"
          start
        >
          1
        </VAvatar>
      </template>

      Years
    </VChip>

    <VChip
      color="warning"
      pill
    >
      <template #prepend>
        <VAvatar
          variant="tonal"
          color="success"
          start
        >
          1
        </VAvatar>
      </template>

      Pill Chip
    </VChip>

    <VChip
      closable
      color="teal"
      prepend-icon="mdi-checkbox-marked-circle"
    >
      Confirmed
    </VChip>

    <VChip
      closable
      color="error"
      close-icon="mdi-delete"
      prepend-icon="mdi-checkbox-marked-circle"
    >
      Confirmed
    </VChip>
  </div>
</template>
`

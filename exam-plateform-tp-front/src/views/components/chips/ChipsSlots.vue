<template>
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

<template>
  <div class="d-flex flex-wrap gap-6">
    <VBtn color="primary">
      Start
      <VTooltip
        activator="parent"
        location="start"
      >
        Tooltip
      </VTooltip>
    </VBtn>

    <VBtn color="primary">
      End
      <VTooltip
        activator="parent"
        location="end"
      >
        Tooltip
      </VTooltip>
    </VBtn>

    <VBtn color="primary">
      Top
      <VTooltip
        activator="parent"
        location="top"
      >
        Tooltip
      </VTooltip>
    </VBtn>

    <VBtn color="primary">
      Bottom
      <VTooltip
        activator="parent"
        location="bottom"
      >
        Tooltip
      </VTooltip>
    </VBtn>
  </div>
</template>

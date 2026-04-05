<template>
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

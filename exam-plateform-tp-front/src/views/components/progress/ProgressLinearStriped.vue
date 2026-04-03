<template>
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

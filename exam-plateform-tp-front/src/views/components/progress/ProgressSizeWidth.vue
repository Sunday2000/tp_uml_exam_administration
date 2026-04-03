<template>
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

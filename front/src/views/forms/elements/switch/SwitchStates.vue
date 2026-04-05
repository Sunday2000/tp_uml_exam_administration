<template>
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

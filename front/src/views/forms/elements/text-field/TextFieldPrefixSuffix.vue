<template>
  <VRow>
    <VCol cols="4">
      <VListSubheader>Prefix for dollar currency</VListSubheader>
    </VCol>

    <VCol cols="8">
      <VTextField
        label="Amount"
        model-value="10.00"
        prefix="$"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="4">
      <VListSubheader>Suffix for weight</VListSubheader>
    </VCol>

    <VCol cols="8">
      <VTextField
        label="Weight"
        model-value="28.00"
        suffix="lbs"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="4">
      <VListSubheader>Suffix for email domain</VListSubheader>
    </VCol>

    <VCol cols="8">
      <VTextField
        label="Email address"
        model-value="example"
        suffix="@gmail.com"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="4">
      <VListSubheader>Suffix for time zone</VListSubheader>
    </VCol>

    <VCol cols="8">
      <VTextField
        label="Label Text"
        model-value="12:30:00"
        type="time"
        suffix="PST"
      />
    </VCol>
  </VRow>
</template>

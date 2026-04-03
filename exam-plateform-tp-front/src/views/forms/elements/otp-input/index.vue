<script setup lang="ts">
import OtpInputFinish from './OtpInputFinish.vue'
import OtpInputHidden from './OtpInputHidden.vue'
import OtpInputVariant from './OtpInputVariant.vue'
import * as code from './code'
import CodeToggler from '@/components/CodeToggler.vue'

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Forms',
    disabled: true,
  },
  {
    title: 'Otp Input',
    disabled: true,
  },
]
</script>

<template>
  <VRow>
    <!-- Breadcrumbs -->
    <VCol
      cols="12"
      class="d-flex align-center justify-space-between flex-wrap"
    >
      <VBreadcrumbs
        divider="-"
        :items="breadcrumbs"
        class="pa-0 "
      />

      <div>
        <ApiBtn
          href="https://vuetifyjs.com/en/components/otp-input/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Variant">
        <VCardText>
          <OtpInputVariant />
        </VCardText>
        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Finish Event">
        <VCardText>
          <OtpInputFinish />
        </VCardText>
        <CodeToggler :code="code.finish" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Hidden">
        <VCardText>
          <OtpInputHidden />
        </VCardText>
        <CodeToggler :code="code.hidden" />
      </VCard>
    </VCol>
  </VRow>
</template>

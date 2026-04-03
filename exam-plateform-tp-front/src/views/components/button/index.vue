<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import ButtonColor from './ButtonColor.vue'
import ButtonDensity from './ButtonDensity.vue'
import ButtonGroup from './ButtonGroup.vue'
import ButtonIcon from './ButtonIcon.vue'
import ButtonLoader from './ButtonLoader.vue'
import ButtonRounded from './ButtonRounded.vue'
import ButtonSize from './ButtonSize.vue'
import ButtonVariant from './ButtonVariant.vue'
import * as code from './code'

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Components',
    disabled: true,
  },
  {
    title: 'Button',
    disabled: true,
  },
]
</script>

<template>
  <VRow>
    <!-- breadcrumbs -->
    <VCol
      cols="12"
      class="d-flex align-center justify-space-between flex-wrap"
    >
      <VBreadcrumbs
        divider="-"
        :items="breadcrumbs"
        class="pa-0"
      />

      <div>
        <ApiBtn
          href="https://vuetifyjs.com/en/api/v-btn/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Colors">
        <VCardText>
          <ButtonColor />
        </VCardText>

        <CodeToggler :code="code.color" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Variant">
        <VCardText>
          <ButtonVariant />
        </VCardText>
        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Density">
        <VCardText>
          <ButtonDensity />
        </VCardText>
        <CodeToggler :code="code.density" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Icon">
        <VCardText>
          <ButtonIcon />
        </VCardText>
        <CodeToggler :code="code.icon" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Size">
        <VCardText>
          <ButtonSize />
        </VCardText>
        <CodeToggler :code="code.size" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Rounded">
        <VCardText>
          <ButtonRounded />
        </VCardText>
        <CodeToggler :code="code.rounded" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Loader">
        <VCardText>
          <ButtonLoader />
        </VCardText>
        <CodeToggler :code="code.loader" />
      </VCard>
    </VCol>

    <!-- Btn Group -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Group">
        <VCardText>
          <ButtonGroup />
        </VCardText>
        <CodeToggler :code="code.group" />
      </VCard>
    </VCol>
  </VRow>
</template>

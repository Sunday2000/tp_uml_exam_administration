<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import SwitchColor from './SwitchColor.vue'
import SwitchCustom from './SwitchCustom.vue'
import SwitchInset from './SwitchInset.vue'
import SwitchSlot from './SwitchSlot.vue'
import SwitchStates from './SwitchStates.vue'
import * as code from './code'

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
    title: 'Sliders',
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
          href="https://vuetifyjs.com/en/components/switches/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Color -->
    <VCol cols="12">
      <VCard title="Color">
        <VCardText>
          <SwitchColor />
        </VCardText>
        <CodeToggler :code="code.color" />
      </VCard>
    </VCol>

    <!-- Inset -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Inset">
        <VCardText>
          <SwitchInset />
        </VCardText>
        <CodeToggler :code="code.inset" />
      </VCard>
    </VCol>

    <!-- Slot -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Slot">
        <VCardText>
          <SwitchSlot />
        </VCardText>
        <CodeToggler :code="code.slot" />
      </VCard>
    </VCol>

    <!-- States -->
    <VCol cols="12">
      <VCard title="States">
        <VCardText>
          <SwitchStates />
        </VCardText>
        <CodeToggler :code="code.states" />
      </VCard>
    </VCol>

    <!-- Custom -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Custom">
        <VCardText>
          <SwitchCustom />
        </VCardText>
        <CodeToggler :code="code.custom" />
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import MenuActivator from './MenuActivator.vue'
import MenuCustomTransition from './MenuCustomTransition.vue'
import MenuHover from './MenuHover.vue'
import MenuLocation from './MenuLocation.vue'
import MenuPopover from './MenuPopover.vue'
import MenuSlot from './MenuSlot.vue'
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
    title: 'Menu',
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
          href="https://vuetifyjs.com/en/components/menus"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Activator -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Activator">
        <VCardText>
          <MenuActivator />
        </VCardText>
        <CodeToggler :code="code.activator" />
      </VCard>
    </VCol>

    <!-- Location -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Location">
        <VCardText>
          <MenuLocation />
        </VCardText>
        <CodeToggler :code="code.location" />
      </VCard>
    </VCol>

    <!-- Hover -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Hover">
        <VCardText>
          <MenuHover />
        </VCardText>
        <CodeToggler :code="code.hover" />
      </VCard>
    </VCol>

    <!-- Slot -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Slot">
        <VCardText>
          <MenuSlot />
        </VCardText>
        <CodeToggler :code="code.slot" />
      </VCard>
    </VCol>

    <!-- Custom transitions -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Custom transitions">
        <VCardText>
          <MenuCustomTransition />
        </VCardText>
        <CodeToggler :code="code.customTransition" />
      </VCard>
    </VCol>

    <!-- Popover -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Popover">
        <VCardText>
          <MenuPopover />
        </VCardText>
        <CodeToggler :code="code.popover" />
      </VCard>
    </VCol>
  </VRow>
</template>

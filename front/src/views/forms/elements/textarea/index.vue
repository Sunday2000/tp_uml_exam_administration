<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import TextareaAutoGrow from './TextareaAutoGrow.vue'
import TextareaClearable from './TextareaClearable.vue'
import TextareaCounter from './TextareaCounter.vue'
import TextareaIcons from './TextareaIcons.vue'
import TextareaNoResize from './TextareaNoResize.vue'
import TextareaRows from './TextareaRows.vue'
import TextareaVariant from './TextareaVariant.vue'
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
    title: 'Textarea',
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
          href="https://vuetifyjs.com/en/components/textareas/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Variant -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Variant">
        <VCardText>
          <TextareaVariant />
        </VCardText>
        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>

    <!-- Auto Grow -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Auto Grow">
        <VCardText>
          <TextareaAutoGrow />
        </VCardText>
        <CodeToggler :code="code.autoGrow" />
      </VCard>
    </VCol>

    <!-- Clearable -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Clearable">
        <VCardText>
          <TextareaClearable />
        </VCardText>
        <CodeToggler :code="code.clearable" />
      </VCard>
    </VCol>

    <!-- Counter -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Counter">
        <VCardText>
          <TextareaCounter />
        </VCardText>
        <CodeToggler :code="code.counter" />
      </VCard>
    </VCol>

    <!-- No resize -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="No Resize">
        <VCardText>
          <TextareaNoResize />
        </VCardText>
        <CodeToggler :code="code.noResize" />
      </VCard>
    </VCol>

    <!-- Icons -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Icons">
        <VCardText>
          <TextareaIcons />
        </VCardText>
        <CodeToggler :code="code.icons" />
      </VCard>
    </VCol>

    <!-- Rows -->
    <VCol cols="12">
      <VCard title="Rows">
        <VCardText>
          <TextareaRows />
        </VCardText>
        <CodeToggler :code="code.rows" />
      </VCard>
    </VCol>
  </VRow>
</template>

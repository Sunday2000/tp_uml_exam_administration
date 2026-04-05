<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import CheckboxColor from './CheckboxColor.vue'
import CheckboxCustom from './CheckboxCustom.vue'
import CheckboxLabelSlot from './CheckboxLabelSlot.vue'
import CheckboxModelAsArray from './CheckboxModelAsArray.vue'
import CheckboxModelAsBoolean from './CheckboxModelAsBoolean.vue'
import CheckboxStates from './CheckboxStates.vue'
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
    title: 'Checkbox',
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
          href="https://vuetifyjs.com/en/components/checkboxes/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Checkbox Color -->
    <VCol cols="12">
      <VCard title="Colors">
        <VCardText>
          <CheckboxColor />
        </VCardText>
        <CodeToggler :code="code.color" />
      </VCard>
    </VCol>

    <!-- Model as Array -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Model as Array">
        <VCardText>
          <CheckboxModelAsArray />
        </VCardText>
        <CodeToggler :code="code.modelAsArray" />
      </VCard>
    </VCol>

    <!-- Model as Boolean -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Model as Boolean">
        <VCardText>
          <CheckboxModelAsBoolean />
        </VCardText>
        <CodeToggler :code="code.modelAsBoolean" />
      </VCard>
    </VCol>

    <!-- States -->
    <VCol cols="12">
      <VCard title="States">
        <VCardText>
          <CheckboxStates />
        </VCardText>
        <CodeToggler :code="code.states" />
      </VCard>
    </VCol>

    <!-- Label Slot -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Label Slot">
        <VCardText>
          <CheckboxLabelSlot />
        </VCardText>
        <CodeToggler :code="code.labelSlot" />
      </VCard>
    </VCol>

    <!-- Custom -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Custom">
        <VCardText>
          <CheckboxCustom />
        </VCardText>
        <CodeToggler :code="code.custom" />
      </VCard>
    </VCol>
  </VRow>
</template>

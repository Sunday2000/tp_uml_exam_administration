<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import TextFieldDensity from './TextFieldDensity.vue'
import TextFieldEvents from './TextFieldEvents.vue'
import TextFieldHint from './TextFieldHint.vue'
import TextFieldIcons from './TextFieldIcons.vue'
import TextFieldLabelSlot from './TextFieldLabelSlot.vue'
import TextFieldPrefixSuffix from './TextFieldPrefixSuffix.vue'
import TextFieldValidation from './TextFieldValidation.vue'
import TextFieldVariant from './TextFieldVariant.vue'
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
    title: 'Text Field',
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
          href="https://vuetifyjs.com/en/components/text-fields/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- variant -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Variant">
        <VCardText>
          <TextFieldVariant />
        </VCardText>
        <CodeToggler :code="code.variant" />
      </VCard>
    </VCol>

    <!-- Density -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Density">
        <VCardText>
          <TextFieldDensity />
        </VCardText>
        <CodeToggler :code="code.density" />
      </VCard>
    </VCol>

    <!-- Hint -->
    <VCol cols="12">
      <VCard title="Hint">
        <VCardText>
          <TextFieldHint />
        </VCardText>
        <CodeToggler :code="code.hint" />
      </VCard>
    </VCol>

    <!-- Icons -->
    <VCol cols="12">
      <VCard title="Icons">
        <VCardText>
          <TextFieldIcons />
        </VCardText>
        <CodeToggler :code="code.icons" />
      </VCard>
    </VCol>

    <!-- Suffix and Prefix -->
    <VCol cols="12">
      <VCard title="Prefixes and Suffixes">
        <VCardText>
          <TextFieldPrefixSuffix />
        </VCardText>
        <CodeToggler :code="code.prefixSuffix" />
      </VCard>
    </VCol>

    <!-- Validation -->
    <VCol cols="12">
      <VCard title="Validation">
        <VCardText>
          <TextFieldValidation />
        </VCardText>
        <CodeToggler :code="code.validation" />
      </VCard>
    </VCol>

    <!-- Events -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Events">
        <VCardText>
          <TextFieldEvents />
        </VCardText>
        <CodeToggler :code="code.events" />
      </VCard>
    </VCol>

    <!-- Label Slot -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Label Slot">
        <VCardText>
          <TextFieldLabelSlot />
        </VCardText>
        <CodeToggler :code="code.labelSlot" />
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import CleaveInputBlock from './CleaveInputBlock.vue'
import CleaveInputCard from './CleaveInputCard.vue'
import CleaveInputDate from './CleaveInputDate.vue'
import CleaveInputDelimiter from './CleaveInputDelimiter.vue'
import CleaveInputMonthYear from './CleaveInputMonthYear.vue'
import CleaveInputNumeral from './CleaveInputNumeral.vue'
import CleaveInputPhone from './CleaveInputPhone.vue'
import CleaveInputPrefix from './CleaveInputPrefix.vue'
import CleaveInputTimeFormat from './CleaveInputTimeFormat.vue'
import CleaveInputValidate from './CleaveInputValidate.vue'

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Extensions',
    disabled: false,
  },
  {
    title: 'Cleave Input',
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
          href="https://nosir.github.io/cleave.js/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>
    <!-- Breadcrumbs -->

    <!-- Card -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Cards">
        <VCardText>
          <CleaveInputCard />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Phone -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Phone">
        <VCardText>
          <CleaveInputPhone />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Date -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Date">
        <VCardText>
          <CleaveInputDate />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Month Year -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Month Year">
        <VCardText>
          <CleaveInputMonthYear />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Time Format -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Time Format">
        <VCardText>
          <CleaveInputTimeFormat />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Numeral formatting -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Numeral Format">
        <VCardText>
          <CleaveInputNumeral />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Block formatting -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Custom Block">
        <VCardText>
          <CleaveInputBlock />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Delimiter -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Delimiter">
        <VCardText>
          <CleaveInputDelimiter />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Prefix -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Prefix">
        <VCardText>
          <CleaveInputPrefix />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Validate -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Validate">
        <VCardText>
          <CleaveInputValidate />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

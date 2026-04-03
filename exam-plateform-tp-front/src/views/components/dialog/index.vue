<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import DialogActivator from './DialogActivator.vue'
import DialogBasic from './DialogBasic.vue'
import DialogForm from './DialogForm.vue'
import DialogFullscreen from './DialogFullscreen.vue'
import DialogLoader from './DialogLoader.vue'
import DialogNesting from './DialogNesting.vue'
import DialogOverflow from './DialogOverflow.vue'
import DialogPersistent from './DialogPersistent .vue'
import DialogScrollable from './DialogScrollable.vue'
import DialogTransition from './DialogTransition.vue'
import DialogVmodel from './DialogVmodel.vue'
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
    title: 'Dialogs',
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
          href="https://vuetifyjs.com/en/components/dialogs/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Basic">
        <VCardText>
          <DialogBasic />
        </VCardText>
        <CodeToggler :code="code.basic" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Activator">
        <VCardText>
          <DialogActivator />
        </VCardText>
        <CodeToggler :code="code.activator" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="v-model">
        <VCardText>
          <DialogVmodel />
        </VCardText>
        <CodeToggler :code="code.vmodel" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="FullScreen">
        <VCardText>
          <DialogFullscreen />
        </VCardText>
        <CodeToggler :code="code.fullscrren" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Transitions">
        <VCardText>
          <DialogTransition />
        </VCardText>
        <CodeToggler :code="code.transition" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Persistent">
        <VCardText>
          <DialogPersistent />
        </VCardText>
        <CodeToggler :code="code.persistent" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Scrollable">
        <VCardText>
          <DialogScrollable />
        </VCardText>
        <CodeToggler :code="code.scrollable" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Form">
        <VCardText>
          <DialogForm />
        </VCardText>
        <CodeToggler :code="code.form" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Loader">
        <VCardText>
          <DialogLoader />
        </VCardText>
        <CodeToggler :code="code.loader" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Nesting">
        <VCardText>
          <DialogNesting />
        </VCardText>
        <CodeToggler :code="code.nesting" />
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Overflowed">
        <VCardText>
          <DialogOverflow />
        </VCardText>
        <CodeToggler :code="code.overflow" />
      </VCard>
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
import CodeToggler from '@/components/CodeToggler.vue'
import AvatarColor from './AvatarColor.vue'
import AvatarGroup from './AvatarGroup.vue'
import AvatarIcon from './AvatarIcon.vue'
import AvatarImage from './AvatarImage.vue'
import AvatarSize from './AvatarSize.vue'
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
    title: 'Avatar',
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
          href="https://vuetifyjs.com/en/api/v-avatar/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- Colors -->
    <VCol cols="12">
      <VCard title="Colors">
        <VCardText>
          <AvatarColor />
        </VCardText>

        <CodeToggler :code="code.color" />
      </VCard>
    </VCol>

    <!-- Images -->
    <VCol cols="12">
      <VCard title="Images">
        <VCardText>
          <AvatarImage />
        </VCardText>
        <CodeToggler :code="code.image" />
      </VCard>
    </VCol>

    <!-- Size -->
    <VCol cols="12">
      <VCard title="Size">
        <VCardText>
          <AvatarSize />
        </VCardText>

        <CodeToggler :code="code.size" />
      </VCard>
    </VCol>

    <!-- Icon -->
    <VCol cols="12">
      <VCard title="Icon">
        <VCardText>
          <AvatarIcon />
        </VCardText>

        <CodeToggler :code="code.icon" />
      </VCard>
    </VCol>

    <!-- Group -->
    <VCol cols="12">
      <VCard title="Group">
        <template #append>
          <VChip
            label
            size="small"
            color="primary"
          >
            Custom
          </VChip>
        </template>
        <VCardText>
          <AvatarGroup />
        </VCardText>

        <CodeToggler :code="code.group" />
      </VCard>
    </VCol>
  </VRow>
</template>

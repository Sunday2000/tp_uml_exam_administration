<script setup lang="ts">
import CodeToggler from '@/components/CodeToggler.vue'
import RatingsColor from './RatingsColor.vue'
import RatingsDensity from './RatingsDensity.vue'
import RatingsHalfIncrements from './RatingsHalfIncrements.vue'
import RatingsHoverEffect from './RatingsHoverEffect.vue'
import RatingsIcons from './RatingsIcons.vue'
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
    title: 'Ratings',
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
          href="https://vuetifyjs.com/en/components/ratings/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>

    <!-- color -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Color">
        <VCardText>
          <RatingsColor />
        </VCardText>
        <CodeToggler :code="code.color" />
      </VCard>
    </VCol>

    <!-- Density -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Density">
        <VCardText>
          <RatingsDensity />
        </VCardText>
        <CodeToggler :code="code.density" />
      </VCard>
    </VCol>

    <!-- Hover Effect -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Hover Effect">
        <VCardText>
          <RatingsHoverEffect />
        </VCardText>
        <CodeToggler :code="code.hoverEffect" />
      </VCard>
    </VCol>

    <!-- Icons -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Icons">
        <VCardText>
          <RatingsIcons />
        </VCardText>
        <CodeToggler :code="code.icons" />
      </VCard>
    </VCol>

    <!-- Half Increments -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Half Increments">
        <VCardText>
          <RatingsHalfIncrements />
        </VCardText>
        <CodeToggler :code="code.halfIncrements" />
      </VCard>
    </VCol>
  </VRow>
</template>

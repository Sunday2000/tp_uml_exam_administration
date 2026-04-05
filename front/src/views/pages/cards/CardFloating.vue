<script setup lang="ts">
import lights from '@/assets/pages/lights.jpg'
import sunset from '@/assets/pages/sunset.jpg'
import sunshine from '@/assets/pages/sunshine.jpg'
import FloatingCard from '@/components/FloatingCard.vue'
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <FloatingCard
        title="Floating Card"
        subtitle="It is costume card"
        :image="{ src: lights }"
      >
        <template #append>
          <VIcon
            icon="mdi-cog"
            color="secondary"
          />
        </template>
        <VCardText>
          Shortbread chocolate danish soufflé pudding biscuit croissant. Jelly wafer carrot cake icing candy canes. Gummies halvah chocolate marshmallow halvah caramels.
        </VCardText>
      </FloatingCard>
    </VCol>

    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <FloatingCard
        title="Floating Card 2"
        subtitle="It is costume card"
        :image="{ src: sunset }"
      >
        <template #append>
          <VIcon
            icon="mdi-cog"
            color="secondary"
          />
        </template>
        <VCardText>
          Sesame snaps jelly icing jujubes candy canes chocolate. Jujubes tiramisu tart jelly beans wafer danish. Jelly jujubes oat cake tart powder tiramisu. Macaroon danish brownie donut gingerbread cake gingerbread.
        </VCardText>
      </FloatingCard>
    </VCol>

    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <FloatingCard
        title="Floating Card 3"
        subtitle="It is costume card"
        :image="{ src: sunshine, height: '200' }"
      >
        <template #append>
          <VIcon
            icon="mdi-cog"
            color="secondary"
          />
        </template>
        <VCardText>
          Pudding pudding tiramisu candy chocolate sesame snaps dragée. Marshmallow bonbon sesame snaps wafer sweet roll chupa chups. Gummies pudding tootsie roll bonbon macaroon gummi bears macaroon. Shortbread chocolate.
        </VCardText>
      </FloatingCard>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import sunset from '@/assets/pages/hotel.jpg'
import lights from '@/assets/pages/sunshine.jpg'
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
        title="Sky & Stars"
        subtitle="Using image prop"
        :image="{ src: lights, height: '185' }"
      >
        <VCardText>
          Shortbread chocolate danish soufflé pudding biscuit croissant.
        </VCardText>
      </FloatingCard>
    </VCol>

    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <FloatingCard
        title="Visit Luxurious hotel"
        subtitle="At affordable price"
        :image="{ src: sunset, height: '185' }"
      >
        <VCardText>
          Sesame snaps jelly icing jujubes candy canes chocolate.
        </VCardText>
      </FloatingCard>
    </VCol>

    <VCol
      cols="12"
      md="4"
      sm="6"
    >
      <FloatingCard
        title="With icon"
        subtitle="No transition style"
        class="no-transition"
      >
        <template #floatingContent>
          <VAvatar
            color="primary"
            size="70"
          >
            <VIcon
              size="45"
              icon="mdi-chart-areaspline"
            />
          </VAvatar>
        </template>

        <VCardText>
          Sesame snaps jelly icing jujubes candy canes chocolate. Pudding pudding tiramisu candy chocolate sesame snaps dragée.
        </VCardText>

        <VCardText>
          <VProgressLinear
            height="8"
            rounded
            rounded-bar
            color="error"
            model-value="50"
          />
        </VCardText>

        <VCardText class="d-flex align-center justify-space-between flex-wrap">
          <VBtn color="primary">
            Download
          </VBtn>

          <VBtn
            icon
            variant="text"
            color="error"
          >
            <VIcon icon="mdi-heart" />
          </VBtn>
        </VCardText>
      </FloatingCard>
    </VCol>
  </VRow>
</template>

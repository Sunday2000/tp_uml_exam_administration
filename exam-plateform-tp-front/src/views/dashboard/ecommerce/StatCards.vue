<script setup lang="ts">
const cards = [
  {
    label: 'ÉCOLES VALIDÉES',
    value: '89',
    sub: '+12 ce mois',
    subColor: 'success',
    subIcon: 'mdi-trending-up',
    iconBg: '#e8f5e9',
    iconColor: '#4caf50',
    icon: 'mdi-check',
  },
  {
    label: 'EN ATTENTE',
    value: '12',
    sub: 'Demandes ouvertes',
    subColor: 'warning',
    subIcon: null,
    iconBg: '#fff8e1',
    iconColor: '#ff9800',
    icon: 'mdi-clock-outline',
  },
  {
    label: 'CANDIDATS',
    value: '1 247',
    sub: '+243 cette semaine',
    subColor: 'success',
    subIcon: 'mdi-trending-up',
    iconBg: '#e3f2fd',
    iconColor: '#2196f3',
    icon: 'mdi-account-outline',
  },
  {
    label: 'CENTRES ACTIFS',
    value: '14',
    sub: '5 régions',
    subColor: 'success',
    subIcon: null,
    iconBg: '#e8f5e9',
    iconColor: '#4caf50',
    icon: 'mdi-map-marker-outline',
  },
]
</script>

<template>
  <VRow>
    <VCol
      v-for="card in cards"
      :key="card.label"
      cols="12"
      sm="6"
      lg="3"
    >
      <VCard rounded="lg" elevation="0" border>
        <VCardText class="pa-5">
          <div class="d-flex align-center justify-space-between mb-4">
            <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis tracking-wide">
              {{ card.label }}
            </span>
            <div
              class="icon-wrap d-flex align-center justify-center rounded"
              :style="{ background: card.iconBg, width: '36px', height: '36px' }"
            >
              <VIcon :icon="card.icon" :color="card.iconColor" size="18" />
            </div>
          </div>

          <div class="text-h4 font-weight-bold mb-2">
            {{ card.value }}
          </div>

          <div class="d-flex align-center gap-1">
            <VIcon
              v-if="card.subIcon"
              :icon="card.subIcon"
              :color="card.subColor"
              size="14"
            />
            <span :class="`text-caption text-${card.subColor}`">
              {{ card.sub }}
            </span>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
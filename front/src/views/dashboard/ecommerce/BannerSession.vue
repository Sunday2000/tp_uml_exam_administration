<script setup lang="ts">
// Données de la session active
const stats = [
  { label: 'Écoles', value: '89' },
  { label: 'Candidats', value: '1 247' },
  { label: 'Centres', value: '14' },
]
</script>

<template>
  <VCard
    color="#1a3a6b"
    class="session-banner"
    rounded="lg"
  >
    <VCardText class="pa-5">
      <VRow align="center">
        <!-- Infos session -->
        <VCol cols="12" md="7">
          <VChip
            size="default"
            color="success"
            variant="tonal"
            class="mb-3"
            prepend-icon="mdi-circle-small"
          >
            <span class="text-white">SESSION ACTIVE</span>
          </VChip>

          <h2 class="text-h5 font-weight-bold text-white mb-1">
            BAC Général — Année 2025–2026
          </h2>
          <p class="text-body-2 text-white" style="opacity: 0.75;">
            Inscriptions : 01 mars → 30 mars 2026 &nbsp;·&nbsp; Examens : 15–22 juin 2026
          </p>
        </VCol>

        <!-- Stats rapides -->
        <VCol cols="12" md="5">
          <div class="d-flex justify-end gap-3">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="stat-box text-center pa-3 rounded-lg"
            >
              <div class="text-h5 font-weight-bold text-white">
                {{ stat.value }}
              </div>
              <div class="text-caption text-white" style="opacity: 0.7;">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style scoped>
.session-banner {
  background: linear-gradient(135deg, #1a3a6b 0%, #1e4d8c 100%) !important;
}

.stat-box {
  background: rgba(255, 255, 255, 0.12);
  min-width: 80px;
  backdrop-filter: blur(4px);
}
</style>
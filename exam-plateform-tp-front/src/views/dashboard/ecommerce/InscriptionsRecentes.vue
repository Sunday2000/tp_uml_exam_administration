<script setup lang="ts">
const inscriptions = [
  {
    nom: 'Lycée National A. Boganda',
    code: 'LNA-001',
    series: ['A', 'C', 'D'],
    candidats: 148,
    statut: 'Validée',
  },
  {
    nom: 'Collège Évangélique',
    code: 'CEV-042',
    series: ['A', 'G'],
    candidats: 87,
    statut: 'En attente',
  },
  {
    nom: 'Lycée Technique Cotonou',
    code: 'LTC-019',
    series: ['C', 'D'],
    candidats: 203,
    statut: 'Validée',
  },
  {
    nom: 'Établissement Sainte Marie',
    code: 'ESM-077',
    series: ['A', 'B'],
    candidats: 64,
    statut: 'En attente',
  },
]

const statutColor = (statut: string) => statut === 'Validée' ? 'success' : 'warning'
</script>

<template>
  <VCard rounded="lg" elevation="0" border>
    <VCardText class="pa-5">
      <div class="d-flex align-center justify-space-between mb-4">
        <span class="text-subtitle-1 font-weight-bold">Inscriptions récentes</span>
        <a href="#" class="text-caption text-primary text-decoration-none">
          Voir tout →
        </a>
      </div>

      <VTable density="compact">
        <thead>
          <tr>
            <th class="text-uppercase text-caption text-medium-emphasis font-weight-bold">Établissement</th>
            <th class="text-uppercase text-caption text-medium-emphasis font-weight-bold">Séries</th>
            <th class="text-uppercase text-caption text-medium-emphasis font-weight-bold">Candidats</th>
            <th class="text-uppercase text-caption text-medium-emphasis font-weight-bold">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inscriptions" :key="item.code">
            <td class="py-3">
              <div class="text-body-2 font-weight-medium">{{ item.nom }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.code }}</div>
            </td>
            <td>
              <div class="d-flex gap-1 flex-wrap">
                <VChip
                  v-for="serie in item.series"
                  :key="serie"
                  size="x-small"
                  variant="tonal"
                  color="primary"
                >
                  {{ serie }}
                </VChip>
              </div>
            </td>
            <td class="text-body-2">{{ item.candidats }}</td>
            <td>
              <VChip
                size="small"
                :color="statutColor(item.statut)"
                variant="tonal"
              >
                <VIcon start size="10" icon="mdi-circle" />
                {{ item.statut }}
              </VChip>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard>
</template>
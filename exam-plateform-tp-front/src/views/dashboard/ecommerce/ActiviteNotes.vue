<script setup lang="ts">
const activites = [
  {
    color: 'success',
    text: 'LNA-001 a soumis 148 candidats',
    highlight: 'LNA-001',
    time: 'Il y a 18 min',
  },
  {
    color: 'primary',
    text: 'Convocations générées — Cotonou Nord',
    highlight: 'Cotonou Nord',
    time: 'Il y a 1 h',
  },
  {
    color: 'warning',
    text: 'CEV-042 — demande d\'inscription',
    highlight: 'CEV-042',
    time: 'Il y a 2 h',
  },
  {
    color: 'success',
    text: 'Notes Maths Série C validées',
    highlight: null,
    time: 'Hier, 17:32',
  },
]

const notes = [
  { matiere: 'Mathématiques — Série C', pct: 100, color: '#2e7d32' },
  { matiere: 'Physique-Chimie — Série C', pct: 74, color: '#1565c0' },
  { matiere: 'Histoire-Géo — Série A', pct: 38, color: '#6d4c00' },
]
</script>

<template>
  <VCard rounded="lg" elevation="0" border>
    <VCardText class="pa-5">
      <!-- Activité récente -->
      <div class="text-subtitle-1 font-weight-bold mb-4">Activité récente</div>
      <VDivider class="mb-5" />

      <div class="d-flex flex-column gap-3 mb-6">
        <div
          v-for="(act, i) in activites"
          :key="i"
          class="d-flex align-start gap-3"
        >
          <VIcon
            icon="mdi-circle"
            :color="act.color"
            size="10"
            class="mt-1"
          />
          <div>
            <div class="text-body-2">{{ act.text }}</div>
            <div class="text-caption text-medium-emphasis">{{ act.time }}</div>
          </div>
        </div>
      </div>
</VCardText>
  </VCard>
 <VCard rounded="lg" elevation="0" border class="mt-4">
    <VCardText class="pa-5">
      <!-- Avancement notes -->
      <div class="text-subtitle-1 font-weight-bold mb-4">Avancement notes</div>
      <VDivider class="mb-5" />

      <div class="d-flex flex-column gap-4">
        <div v-for="note in notes" :key="note.matiere">
          <div class="d-flex justify-space-between mb-1">
            <span class="text-body-2">{{ note.matiere }}</span>
            <span
              class="text-caption font-weight-bold"
              :style="{ color: note.color }"
            >
              {{ note.pct }}%
            </span>
          </div>
          <VProgressLinear
            :model-value="note.pct"
            :color="note.color"
            rounded
            height="6"
            bg-color="#f0f0f0"
          />
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
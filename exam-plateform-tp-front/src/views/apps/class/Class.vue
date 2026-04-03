<script setup lang="ts">
import { useClasses } from '@/composables/useClasses'
import { useSeries } from '@/composables/useSeries'
import { Grade } from '@/interfaces/grade'
import AppTable from '@/layouts/AppTable.vue'
import AppModal from '@/views/components/modal/AppModal.vue'

// ─── Composables API ──────────────────────────────────────────────────────────
const { classes, loading: loadingClasses, error: errorClasses, fetchAll, fetchById, create, update, remove } = useClasses()
const { series: seriesDisponibles, loading: loadingSeries, fetchAll: fetchSeries } = useSeries()

// Charger les deux au démarrage
onMounted(async () => {
  await Promise.all([fetchAll(), fetchSeries()])
})

// ─── Colonnes du tableau ──────────────────────────────────────────────────────
const columns = [
  { key: 'label',       label: 'Intitulé' },
  { key: 'code',        label: 'Code' },
  { key: 'description', label: 'Description' },
  { key: 'series',      label: 'Séries associées' },
  { key: 'actions',     label: 'Actions', align: 'end' as const },
]

// ─── Recherche ────────────────────────────────────────────────────────────────
const recherche = ref('')
const classesFiltrees = computed(() =>
  classes.value.filter(c =>
    c.label.toLowerCase().includes(recherche.value.toLowerCase()) ||
    c.code.toLowerCase().includes(recherche.value.toLowerCase()),
  ),
)

// ─── Classe sélectionnée (panneau détail) ─────────────────────────────────────
const classeSelectionnee = ref<Grade | null>(null)

watch(classes, val => {
  if (val.length && !classeSelectionnee.value)
    classeSelectionnee.value = val[0]
}, { immediate: true })

const selectionner = async (classe: Grade) => {
  const result = await fetchById(classe.id)
  if (result)
    classeSelectionnee.value = result
}

// ─── Dissocier une série ──────────────────────────────────────────────────────
const dissocier = async (serieId: number) => {
  if (!classeSelectionnee.value) return
  const newSerieIds = (classeSelectionnee.value.specialities ?? [])
    .filter(s => s.serie_id !== serieId)
    .map(s => s.serie_id)
  loadingSeries.value = true
  try {
    await update(classeSelectionnee.value.id, { serie_ids: newSerieIds })
    await fetchAll()
    // Mettre à jour la classe sélectionnée
    classeSelectionnee.value = classes.value.find(c => c.id === classeSelectionnee.value?.id) ?? null
  }
  finally {
    loadingSeries.value = false
  }
}

// ─── Modal Ajouter / Modifier ─────────────────────────────────────────────────
const dialogAjouter = ref(false)
const modeEdition = ref(false)
const classeEnEdition = ref<Grade | null>(null)

const formClasse = reactive({
  label: '',
  code: '',
  description: '',
  seriesChoisies: [] as number[], // ids
})

const ouvrirAjouter = () => {
  modeEdition.value = false
  classeEnEdition.value = null
  Object.assign(formClasse, { label: '', code: '', description: '', seriesChoisies: [] })
  dialogAjouter.value = true
}

const ouvrirModifier = (classe: Grade) => {
  modeEdition.value = true
  classeEnEdition.value = classe
  Object.assign(formClasse, {
    label: classe.label,
    code: classe.code,
    description: classe.description ?? '',
    seriesChoisies: (classe.specialities ?? []).map(s => s.serie_id),
  })
  dialogAjouter.value = true
}

const enregistrerClasse = async () => {
  if (!formClasse.label || !formClasse.code) return

  const payload = {
    label: formClasse.label,
    code: formClasse.code,
    description: formClasse.description,
    serie_ids: formClasse.seriesChoisies,
  }

  try {
    if (modeEdition.value && classeEnEdition.value) {
      await update(classeEnEdition.value.id, payload)
      const result = await fetchById(classeEnEdition.value.id)
			if(result)
	  	classeSelectionnee.value = result
    }
    else {
      await create(payload)
      await fetchAll()
    }

    dialogAjouter.value = false
  }
  catch (e) {
    console.error('Erreur lors de l\'enregistrement:', e)
  }
}

// ─── Suppression ─────────────────────────────────────────────────────────────
const dialogSuppr   = ref(false)
const gradeASuppr = ref<Grade | null>(null)

const confirmerSuppression = (s: Grade) => { gradeASuppr.value = s; dialogSuppr.value = true }
const supprimerGrade = async () => {
  if (gradeASuppr.value) await remove(gradeASuppr.value.id)
  dialogSuppr.value = false; gradeASuppr.value = null
}

// ─── Couleurs séries (visuel) ─────────────────────────────────────────────────
const serieColors: Record<string, { couleur: string; bgColor: string }> = {
  A:    { couleur: '#1565c0', bgColor: '#e3f2fd' },
  B:    { couleur: '#2e7d32', bgColor: '#e8f5e9' },
  C:    { couleur: '#2e7d32', bgColor: '#e8f5e9' },
  D:    { couleur: '#e65100', bgColor: '#fff3e0' },
  G:    { couleur: '#6a1b9a', bgColor: '#f3e5f5' },
  BEPC: { couleur: '#00695c', bgColor: '#e0f2f1' },
}

const getSerieColor = (label: string) =>
  serieColors[label] ?? { couleur: '#555', bgColor: '#f0f0f0' }

// ─── Loading global ───────────────────────────────────────────────────────────
const loading = computed(() => loadingClasses.value || loadingSeries.value)
const error   = computed(() => errorClasses.value)
</script>

<template>
  <VRow>
    <!-- ── En-tête ── -->
    <VCol cols="12">
      <h1 class="text-h5 font-weight-bold">Gestion des classes</h1>
      <p class="text-body-2 text-medium-emphasis mt-1 mb-0">
        US06 · US07 · US10 — Référentiel des classes
      </p>
    </VCol>

    <!-- ── Erreur API ── -->
    <VCol v-if="error" cols="12">
      <VAlert type="error" variant="tonal" closable>
        {{ error }}
      </VAlert>
    </VCol>

    <!-- ── Barre recherche + bouton ── -->
    <VCol cols="12" class="d-flex align-center justify-space-between gap-3 flex-wrap">
      <VTextField
        v-model="recherche"
        placeholder="Rechercher..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        style="max-width: 300px;"
      />
      <VBtn color="#1a3a6b" prepend-icon="mdi-plus" @click="ouvrirAjouter">
        Ajouter une classe
      </VBtn>
    </VCol>

    <!-- ── Tableau ── -->
    <VCol cols="12" md="7">
      <div v-if="loading && !classes.length" class="d-flex justify-center py-10">
        <VProgressCircular indeterminate color="primary" />
      </div>

      <AppTable
        v-else
        title="Liste des classes"
        :columns="columns"
        :items="classesFiltrees"
        :count="classesFiltrees.length"
      >
        <!-- Intitulé -->
        <template #cell-label="{ item }">
          <span
            class="text-body-2 font-weight-medium"
            style="cursor: pointer;"
            @click="selectionner(item)"
          >
            {{ item.label }}
          </span>
        </template>

        <!-- Code -->
        <template #cell-code="{ item }">
          <span class="text-body-2 text-medium-emphasis">{{ item.code }}</span>
        </template>

        <!-- Description -->
        <template #cell-description="{ item }">
          <span class="text-body-2 text-medium-emphasis">{{ item.description ?? '—' }}</span>
        </template>

        <!-- Séries -->
        <template #cell-series="{ item }">
          <div v-if="item.specialities?.length" class="d-flex gap-1 flex-wrap">
            <VChip
              v-for="s in item.specialities"
              :key="s.id"
              size="x-small"
              variant="tonal"
              :style="{ color: getSerieColor(s.serie?.label ?? '').couleur, background: getSerieColor(s.serie?.label ?? '').bgColor }"
            >
              {{ s.serie?.label }}
            </VChip>
          </div>
          <span v-else class="text-caption text-medium-emphasis">Aucune</span>
        </template>

        <!-- Actions -->
        <template #cell-actions="{ item }">
          <div class="d-flex gap-2 justify-end">
            <VBtn size="small" variant="outlined" @click.stop="ouvrirModifier(item)">Modifier</VBtn>
              <VBtn size="small" variant="outlined" color="error" @click.stop="confirmerSuppression(item)">Suppr.</VBtn>
          </div>
        </template>
      </AppTable>
    </VCol>

    <!-- ── Panneau détail ── -->
    <VCol cols="12" md="5">
      <VCard elevation="0" border rounded="lg" min-height="300">
        <VCardText class="pa-5">
          <template v-if="classeSelectionnee">
            <h2 class="text-subtitle-1 font-weight-bold mb-4">
              Détail — {{ classeSelectionnee.label }}
            </h2>

            <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-3">
              Séries associées
            </div>

            <div class="d-flex flex-column gap-2 mb-4">
              <div
                v-for="serie in classeSelectionnee.specialities"
                :key="serie.id"
                class="d-flex align-center justify-space-between pa-3 rounded-lg"
                :style="{ background: getSerieColor(serie.serie?.label ?? '').bgColor }"
              >
                <div class="d-flex align-center gap-3">
                  <span class="text-caption font-weight-bold" :style="{ color: getSerieColor(serie.serie?.label ?? '').couleur }">
                    {{ serie.serie?.label ?? '' }}
                  </span>
                  <span class="text-body-2 font-weight-medium">{{ serie.serie?.description ?? serie.serie?.label ?? '' }}</span>
                </div>
                <VBtn size="small" variant="outlined" color="error" :loading="loadingClasses" @click="dissocier(serie.serie?.id ?? 0)">
                  Dissocier
                </VBtn>
              </div>

              <div v-if="!classeSelectionnee.specialities?.length" class="text-caption text-medium-emphasis text-center py-4">
                Aucune série associée
              </div>
            </div>

            <VBtn block variant="outlined" prepend-icon="mdi-plus" @click="ouvrirModifier(classeSelectionnee)">
              Associer une série
            </VBtn>
          </template>

          <div v-else class="text-center text-medium-emphasis py-10">
            Sélectionnez une classe pour voir le détail
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- ─── Modal Ajouter / Modifier ─────────────────────────────────────────── -->
  <AppModal
    v-model="dialogAjouter"
    title="Ajouter / Modifier une classe"
    :max-width="560"
    @close="dialogAjouter = false"
  >
    <!-- Label + Code -->
    <VRow class="mb-2">
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Intitulé</div>
        <VTextField
          v-model="formClasse.label"
          placeholder="Ex: Terminale"
          variant="outlined"
          density="compact"
          hide-details
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Code</div>
        <VTextField
          v-model="formClasse.code"
          placeholder="Ex: TERM"
          variant="outlined"
          density="compact"
          hide-details
        />
      </VCol>
    </VRow>

    <!-- Description -->
    <div class="mb-4">
      <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Description</div>
      <VTextField
        v-model="formClasse.description"
        placeholder="Description optionnelle..."
        variant="outlined"
        density="compact"
        hide-details
      />
    </div>

    <!-- Séries à associer (checkboxes dynamiques depuis API) -->
    <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-3">
      Séries à associer
    </div>

    <!-- Loader séries -->
    <div v-if="loadingSeries" class="d-flex justify-center py-4">
      <VProgressCircular indeterminate color="primary" size="24" />
    </div>

    <div v-else class="d-flex flex-column gap-2">
      <label
        v-for="serie in seriesDisponibles"
        :key="serie.id"
        class="serie-checkbox-row d-flex align-center gap-3 pa-3 rounded-lg"
        :class="{ 'serie-checked': formClasse.seriesChoisies.includes(serie.id) }"
      >
        <input
          v-model="formClasse.seriesChoisies"
          type="checkbox"
          :value="serie.id"
          class="serie-cb"
        />
        <div>
          <span class="text-body-2 font-weight-medium">Série {{ serie.label }}</span>
          <span v-if="serie.description" class="text-caption text-medium-emphasis ms-2">
            — {{ serie.description }}
          </span>
        </div>
      </label>

      <div v-if="!seriesDisponibles.length" class="text-caption text-medium-emphasis text-center py-2">
        Aucune série disponible
      </div>
    </div>

    <!-- Actions -->
    <template #actions>
      <VBtn variant="outlined" @click="dialogAjouter = false">Annuler</VBtn>
      <VBtn color="#1a3a6b" :loading="loadingClasses" @click="enregistrerClasse">Enregistrer</VBtn>
    </template>
  </AppModal>

	<!-- Modal de suppression -->
	  <AppModal v-model="dialogSuppr" title="Confirmer la suppression" :max-width="440" @close="dialogSuppr = false">
    <p class="text-body-1">Voulez-vous vraiment supprimer <strong>{{ gradeASuppr?.label }}</strong> ?</p>
    <template #actions>
      <VBtn variant="outlined" @click="dialogSuppr = false">Annuler</VBtn>
      <VBtn color="error" :loading="loading" @click="supprimerGrade">Supprimer</VBtn>
    </template>
  </AppModal>
</template>

<style scoped>
.serie-checkbox-row {
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background 0.15s;
}
.serie-checkbox-row:hover { background: #f5f5f5; }
.serie-checked { background: #f0f4ff; border-color: #90a4d4; }
.serie-cb {
  width: 16px;
  height: 16px;
  accent-color: #1a3a6b;
  cursor: pointer;
}
</style>
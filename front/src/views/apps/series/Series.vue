<script setup lang="ts">
import AppTable from '@/layouts/AppTable.vue'
import AppModal from '@/views/components/modal/AppModal.vue'
import { useSeries } from '@/composables/useSeries'
import type { SeriePayload } from '@/api/series'

// ─── Composable API ───────────────────────────────────────────────────────────
const { series, loading, error, fetchAll, create, update, remove } = useSeries()

// Charger les séries au montage
onMounted(() => fetchAll())

// ─── Colonnes du tableau ──────────────────────────────────────────────────────
const columns = [
  { key: 'label',       label: 'Série' },
  { key: 'description', label: 'Description' },
  { key: 'actions',     label: 'Actions', align: 'end' as const },
]

// ─── Recherche ────────────────────────────────────────────────────────────────
const recherche = ref('')
const seriesFiltrees = computed(() =>
  series.value.filter(s => {
    const q = recherche.value.toLowerCase()
    return !q
      || s.label.toLowerCase().includes(q)
      || (s.description ?? '').toLowerCase().includes(q)
  }),
)

// ─── Modal Ajouter / Modifier ─────────────────────────────────────────────────
const dialog        = ref(false)
const modeEdition   = ref(false)
const idEnEdition   = ref<number | null>(null)

const form = reactive<SeriePayload>({
  label: '',
  description: '',
})

const erreurs = reactive({ label: '' })

const resetForm = () => {
  form.label       = ''
  form.description = ''
  erreurs.label    = ''
  idEnEdition.value = null
}

const ouvrirAjouter = () => {
  modeEdition.value = false
  resetForm()
  dialog.value = true
}

const ouvrirModifier = (s: { id: number; label: string; description: string | null }) => {
  modeEdition.value    = true
  idEnEdition.value    = s.id
  form.label           = s.label
  form.description     = s.description ?? ''
  erreurs.label        = ''
  dialog.value         = true
}

const validerForm = (): boolean => {
  erreurs.label = ''
  if (!form.label.trim()) { erreurs.label = 'Champ requis'; return false }
  return true
}

const enregistrer = async () => {
  if (!validerForm()) return
  const payload: SeriePayload = {
    label: form.label.trim().toUpperCase(),
    description: form.description?.trim() || undefined,
  }
  if (modeEdition.value && idEnEdition.value !== null) {
    await update(idEnEdition.value, payload)
  } else {
    await create(payload)
  }
  if (!error.value) {
    dialog.value = false
    resetForm()
  }
}

// ─── Modal Suppression ────────────────────────────────────────────────────────
const dialogSuppression = ref(false)
const idASupprimer      = ref<number | null>(null)
const labelASupprimer   = ref('')

const demanderSuppression = (s: { id: number; label: string }) => {
  idASupprimer.value    = s.id
  labelASupprimer.value = s.label
  dialogSuppression.value = true
}

const confirmerSuppression = async () => {
  if (idASupprimer.value !== null)
    await remove(idASupprimer.value)
  dialogSuppression.value = false
}
</script>

<template>
  <VRow>
    <!-- ── En-tête ── -->
    <VCol cols="12">
      <div class="d-flex align-center justify-space-between flex-wrap gap-3">
        <div>
          <h1 class="text-h5 font-weight-bold">Gestion des séries</h1>
          <p class="text-body-2 text-medium-emphasis mt-1 mb-0">Référentiel des séries</p>
        </div>
        <VBtn color="#1a3a6b" prepend-icon="mdi-plus" @click="ouvrirAjouter">
          Ajouter une série
        </VBtn>
      </div>
    </VCol>

    <!-- ── Erreur API ── -->
    <VCol v-if="error" cols="12">
      <VAlert type="error" variant="tonal" closable>{{ error }}</VAlert>
    </VCol>

    <!-- ── Barre recherche ── -->
    <VCol cols="12">
      <VTextField
        v-model="recherche"
        placeholder="Rechercher..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        style="max-width: 320px;"
      />
    </VCol>

    <!-- ── Tableau ── -->
    <VCol cols="12">
      <AppTable
        title="Liste des séries"
        :columns="columns"
        :items="seriesFiltrees"
        :count="seriesFiltrees.length"
        :loading="loading"
      >
        <!-- Colonne SÉRIE -->
        <template #cell-label="{ item }">
          <span class="font-weight-bold text-body-1">{{ item.label }}</span>
        </template>

        <!-- Colonne DESCRIPTION -->
        <template #cell-description="{ item }">
          <span class="text-body-2 text-medium-emphasis">
            {{ item.description ?? '—' }}
          </span>
        </template>

        <!-- Colonne ACTIONS -->
        <template #cell-actions="{ item }">
          <div class="d-flex gap-2 justify-end">
            <VBtn size="small" variant="outlined" @click="ouvrirModifier(item)">Modifier</VBtn>
            <VBtn size="small" variant="outlined" color="error" @click="demanderSuppression(item)">Suppr.</VBtn>
          </div>
        </template>
      </AppTable>
    </VCol>
  </VRow>

  <!-- ─── Modal Ajouter / Modifier ─────────────────────────────────────────── -->
  <AppModal
    v-model="dialog"
    :title="modeEdition ? 'Modifier la série' : 'Ajouter une série'"
    :max-width="480"
    @close="dialog = false; resetForm()"
  >
    <VRow>
      <!-- Label -->
      <VCol cols="12">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Libellé *</div>
        <VTextField
          v-model="form.label"
          placeholder="Ex: C"
          variant="outlined"
          density="compact"
          hide-details="auto"
          :error-messages="erreurs.label"
          @input="form.label = (form.label as string).toUpperCase()"
        />
      </VCol>

      <!-- Description -->
      <VCol cols="12">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Description</div>
        <VTextField
          v-model="form.description"
          placeholder="Ex: Sciences Exactes"
          variant="outlined"
          density="compact"
          hide-details="auto"
        />
      </VCol>
    </VRow>

    <template #actions>
      <VBtn variant="outlined" @click="dialog = false; resetForm()">Annuler</VBtn>
      <VBtn color="#1a3a6b" :loading="loading" @click="enregistrer">Enregistrer</VBtn>
    </template>
  </AppModal>

  <!-- ─── Modal Confirmation Suppression ───────────────────────────────────── -->
  <AppModal
    v-model="dialogSuppression"
    title="Supprimer cette série ?"
    :max-width="420"
    @close="dialogSuppression = false"
  >
    <p class="text-body-2 text-medium-emphasis">
      La série <strong>{{ labelASupprimer }}</strong> sera supprimée définitivement.
    </p>
    <template #actions>
      <VBtn variant="outlined" @click="dialogSuppression = false">Annuler</VBtn>
      <VBtn color="error" :loading="loading" @click="confirmerSuppression">Supprimer</VBtn>
    </template>
  </AppModal>
</template>

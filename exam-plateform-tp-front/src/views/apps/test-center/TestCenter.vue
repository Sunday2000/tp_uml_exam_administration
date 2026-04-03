<script setup lang="ts">

import { useTestCenter } from '@/composables/useTestCenter'
import { TestCenter } from '@/interfaces/testCenter'
import AppTable from '@/layouts/AppTable.vue'
import AppModal from '@/views/components/modal/AppModal.vue'

// ─── Composable API ───────────────────────────────────────────────────────────
const { testCenters, loading, error, fetchAll, create, update, remove } = useTestCenter()

onMounted(() => fetchAll())

// ─── Colonnes du tableau ──────────────────────────────────────────────────────
const columns = [
  { key: 'title',               label: 'Centre' },
  { key: 'code',                label: 'Code' },
  { key: 'location_indication', label: 'Localisation' },
  { key: 'seating_capacity',    label: 'Capacité' },
  { key: 'phone',               label: 'Téléphone' },
  { key: 'actions',             label: 'Actions', align: 'end' as const },
]

// ─── Recherche ────────────────────────────────────────────────────────────────
const recherche = ref('')
const centresFiltres = computed(() =>
  testCenters.value.filter(c =>
    (c.title ?? '').toLowerCase().includes(recherche.value.toLowerCase()) ||
    (c.code ?? '').toLowerCase().includes(recherche.value.toLowerCase()),
  ),
)

// ─── Modal Ajouter / Modifier ─────────────────────────────────────────────────
const dialog      = ref(false)
const modeEdition = ref(false)
const centreEnEdition = ref<TestCenter | null>(null)

const form = reactive({
  title: '',
  code: '',
  location_indication: '',
  phone: '',
  seating_capacity: null as number | null,
  description: '',
  longitude: null as number | null,
  latitude: null as number | null,
})

const resetForm = () => {
  Object.assign(form, {
    title: '', code: '', location_indication: '', phone: '',
    seating_capacity: null, description: '', longitude: null, latitude: null,
  })
}

const ouvrirAjouter = () => {
  modeEdition.value = false
  centreEnEdition.value = null
  resetForm()
  dialog.value = true
}

const ouvrirModifier = (centre: TestCenter) => {
  modeEdition.value = true
  centreEnEdition.value = centre
  Object.assign(form, {
    title:               centre.title,
    code:                centre.code,
    location_indication: centre.location_indication ?? '',
    phone:               centre.phone ?? '',
    seating_capacity:    centre.seating_capacity,
    description:         centre.description ?? '',
    longitude:           centre.longitude,
    latitude:            centre.latitude,
  })
  dialog.value = true
}

const enregistrer = async () => {
  if (!form.title || !form.code) return

  const payload = {
    title:               form.title,
    code:                form.code,
    location_indication: form.location_indication || null,
    phone:               form.phone || null,
    seating_capacity:    form.seating_capacity,
    description:         form.description || null,
    longitude:           form.longitude,
    latitude:            form.latitude,
  }

  if (modeEdition.value && centreEnEdition.value)
    await update(centreEnEdition.value.id, payload)
  else
    await create(payload)

  dialog.value = false
  resetForm()
}

// ─── Suppression ─────────────────────────────────────────────────────────────
const dialogSuppr   = ref(false)
const testCenterASuppr = ref<TestCenter | null>(null)

const confirmerSuppression = (s: TestCenter) => { testCenterASuppr.value = s; dialogSuppr.value = true }
const supprimerTestCenter = async () => {
  if (testCenterASuppr.value) await remove(testCenterASuppr.value.id)
  dialogSuppr.value = false; testCenterASuppr.value = null
}
</script>

<template>
  <VRow>
    <!-- ── En-tête ── -->
    <VCol cols="12">
      <div class="d-flex align-center justify-space-between flex-wrap gap-3">
        <div>
          <h1 class="text-h5 font-weight-bold">Centres d'examen</h1>
          <p class="text-body-2 text-medium-emphasis mt-1 mb-0">Configuration et gestion des centres</p>
        </div>
        <VBtn color="#1a3a6b" prepend-icon="mdi-plus" @click="ouvrirAjouter">
          Ajouter un centre
        </VBtn>
      </div>
    </VCol>

    <!-- ── Erreur API ── -->
    <VCol v-if="error" cols="12">
      <VAlert type="error" variant="tonal" closable>{{ error }}</VAlert>
    </VCol>

    <!-- ── Recherche ── -->
    <VCol cols="12">
      <VTextField
        v-model="recherche"
        placeholder="Rechercher..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        style="max-width: 300px;"
      />
    </VCol>

    <!-- ── Tableau ── -->
    <VCol cols="12">
      <div v-if="loading && !testCenters.length" class="d-flex justify-center py-10">
        <VProgressCircular indeterminate color="primary" />
      </div>

      <AppTable
        v-else
        title="Liste des centres"
        :columns="columns"
        :items="centresFiltres"
        :count="centresFiltres.length"
      >
        <!-- Centre -->
        <template #cell-title="{ item }">
          <span class="text-body-2 font-weight-semibold text-primary">{{ item.title }}</span>
        </template>

        <!-- Code -->
        <template #cell-code="{ item }">
          <span class="text-body-2 text-medium-emphasis">{{ item.code }}</span>
        </template>

        <!-- Localisation -->
        <template #cell-location_indication="{ item }">
          <span class="text-body-2">{{ item.location_indication ?? '—' }}</span>
        </template>

        <!-- Capacité -->
        <template #cell-seating_capacity="{ item }">
          <span class="text-body-2">{{ item.seating_capacity ?? '—' }}</span>
        </template>

        <!-- Téléphone -->
        <template #cell-phone="{ item }">
          <span class="text-body-2">{{ item.phone ?? '—' }}</span>
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
  </VRow>

  <!-- ─── Modal Ajouter / Modifier ─────────────────────────────────────────── -->
  <AppModal
    v-model="dialog"
    :title="modeEdition ? 'Modifier un centre' : 'Ajouter un centre'"
    :max-width="620"
    @close="dialog = false; resetForm()"
  >
    <VRow>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Nom du centre *</div>
        <VTextField v-model="form.title" placeholder="Ex: Lycée de..." variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Code *</div>
        <VTextField v-model="form.code" placeholder="Ex: CTN-02" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Localisation</div>
        <VTextField v-model="form.location_indication" placeholder="Ex: Quartier Saint-Michel" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Téléphone</div>
        <VTextField v-model="form.phone" placeholder="Ex: +229 97000000" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Capacité (places)</div>
        <VTextField v-model.number="form.seating_capacity" placeholder="Ex: 300" type="number" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Description</div>
        <VTextField v-model="form.description" placeholder="Description..." variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Longitude</div>
        <VTextField v-model.number="form.longitude" placeholder="Ex: 2.3522" type="number" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Latitude</div>
        <VTextField v-model.number="form.latitude" placeholder="Ex: 6.3654" type="number" variant="outlined" density="compact" hide-details />
      </VCol>
    </VRow>

    <template #actions>
      <VBtn variant="outlined" @click="dialog = false; resetForm()">Annuler</VBtn>
      <VBtn color="#1a3a6b" :loading="loading" @click="enregistrer">
        {{ modeEdition ? 'Modifier' : 'Créer' }}
      </VBtn>
    </template>
  </AppModal>

	<!-- ───Modal Suppression ───────────────────────────────────────────────────────────── -->

	  <AppModal v-model="dialogSuppr" title="Confirmer la suppression" :max-width="440" @close="dialogSuppr = false">
    <p class="text-body-1">Voulez-vous vraiment supprimer <strong>{{ testCenterASuppr?.title }}</strong> ?</p>
    <template #actions>
      <VBtn variant="outlined" @click="dialogSuppr = false">Annuler</VBtn>
      <VBtn color="error" :loading="loading" @click="supprimerTestCenter">Supprimer</VBtn>
    </template>
  </AppModal>
</template>
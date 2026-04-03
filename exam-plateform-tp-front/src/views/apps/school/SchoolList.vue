<script setup lang="ts">
import { useSchools } from '@/composables/useSchools'
import { School } from '@/interfaces/school'
import AppModal from '@/views/components/modal/AppModal.vue'

// ─── Composable API ───────────────────────────────────────────────────────────
const { schools, loading, error, fetchAll, create, update, remove, dialogValidateOrReject,
      fetchById,
      selectedSchool,
      openValidationDialog,
      confirmAction,
      closeDialog } = useSchools()

onMounted(() => fetchAll())

// ─── Statuts ──────────────────────────────────────────────────────────────────
type SchoolStatus = 'en_attente' | 'validee' | 'rejetee'

const resolveStatusKey = (status: string | boolean | null | undefined): SchoolStatus =>
  status === true ? 'validee' : status === false ? 'rejetee' : 'en_attente'

const statusLabels: Record<SchoolStatus, string> = {
  en_attente: 'En attente',
  validee:    'Validée',
  rejetee:    'Rejetée',
}
const statusColors: Record<SchoolStatus, string> = {
  en_attente: '#9b5e16',
  validee:    '#3d6f1f',
  rejetee:    '#a52c2c',
}
const statusBgColors: Record<SchoolStatus, string> = {
  en_attente: '#fef3c7',
  validee:    '#dcfce7',
  rejetee:    '#fee2e2',
}

const getStatusInfo = (status: any) => {
  if (typeof status === 'boolean') {
    return {
      label: status ? 'Validée' : 'Rejetée',
      color: status ? '#3d6f1f' : '#a52c2c',
      bgColor: status ? '#dcfce7' : '#fee2e2',
    }
  }
  // Fallback pour chaînes de caractères
  return {
    label: statusLabels[status as SchoolStatus] ?? status,
    color: statusColors[status as SchoolStatus] ?? '#555',
    bgColor: statusBgColors[status as SchoolStatus] ?? '#f3f4f6',
  }
}

// ─── Filtres ──────────────────────────────────────────────────────────────────
const activeFilter = ref<'all' | SchoolStatus>('all')
const search = ref('')

const filterTabs: Array<{ key: 'all' | SchoolStatus; label: string }> = [
  { key: 'all',       label: 'Toutes' },
  { key: 'en_attente',label: 'En attente' },
  { key: 'validee',   label: 'Validées' },
  { key: 'rejetee',   label: 'Rejetées' },
]

const schoolsFiltres = computed(() => {
  const term = search.value.trim().toLowerCase()
  return schools.value.filter(s => {
    const statusKey = resolveStatusKey(s.status)
    const matchFilter = activeFilter.value === 'all' || statusKey === activeFilter.value
    const matchSearch = !term
      || (s.name ?? '').toLowerCase().includes(term)
      || (s.code ?? '').toLowerCase().includes(term)
      || (s.responsible?.email ?? '').toLowerCase().includes(term)
      || (`${s.responsible?.name ?? ''} ${s.responsible?.firstname ?? ''}`).toLowerCase().includes(term)
    return matchFilter && matchSearch
  })
})

// ─── Totaux ───────────────────────────────────────────────────────────────────
const totals = computed(() =>
  schools.value.reduce(
    (acc, s) => {
      const statusKey = resolveStatusKey(s.status)
      acc.total++
      if (statusKey === 'validee') acc.validee++
      else if (statusKey === 'en_attente') acc.en_attente++
      else if (statusKey === 'rejetee') acc.rejetee++
      return acc
    },
    { total: 0, validee: 0, en_attente: 0, rejetee: 0 },
  ),
)

// ─── Modal Ajouter / Modifier ─────────────────────────────────────────────────
const dialog        = ref(false)
const modeEdition   = ref(false)
const schoolEnEdition = ref<School | null>(null)

const editForm = reactive({
  name:          '',
  authorization: '',
  creation_date: '',
  phone:         '',
  latitude:      null as number | null,
  longitude:     null as number | null,
  status:        null as boolean | null,
})

const statusOptions = [
  { title: 'En attente', value: null },
  { title: 'Validée', value: true },
  { title: 'Rejetée', value: false },
]

const toDateTimeLocal = (value: string | null | undefined) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const pad = (part: number) => String(part).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const form = reactive({
  // Infos utilisateur
  name:                  '',
  firstname:             '',
  email:                 '',
  phone_number:          '',
  password:              '',
  password_confirmation: '',
  // Infos école
  school: {
    name:          '',
    authorization: '',
    creation_date: '',
    phone:         '',
    latitude:      null as number | null,
    longitude:     null as number | null,
    status:        null as boolean | null,
  },
})

const resetForm = () => {
  Object.assign(form, {
    name: '', firstname: '', email: '', phone_number: '',
    password: '', password_confirmation: '',
    school: {
      name: '', authorization: '', creation_date: '',
      phone: '', latitude: null, longitude: null, status: null,
    },
  })

  Object.assign(editForm, {
    name: '', authorization: '', creation_date: '',
    phone: '', latitude: null, longitude: null, status: null,
  })
}

const ouvrirAjouter = () => {
  modeEdition.value     = false
  schoolEnEdition.value = null
  resetForm()
  dialog.value = true
}

const ouvrirModifier = async (school: School) => {
  modeEdition.value     = true
  schoolEnEdition.value = school

  const schoolDetails = await fetchById(school.id)
  if (!schoolDetails) {
    modeEdition.value = false
    schoolEnEdition.value = null
    return
  }

  Object.assign(editForm, {
    name:          schoolDetails.name ?? '',
    authorization: schoolDetails.authorization ?? '',
    creation_date: toDateTimeLocal(schoolDetails.creation_date),
    phone:         schoolDetails.phone ?? '',
    latitude:      schoolDetails.latitude ?? null,
    longitude:     schoolDetails.longitude ?? null,
    status:        schoolDetails.status ?? null,
  })

  dialog.value = true
}

const enregistrer = async () => {
  if (modeEdition.value && schoolEnEdition.value) {
    if (!editForm.name || !editForm.authorization || !editForm.creation_date) return

    const payload = {
      ...editForm,
      phone: editForm.phone || null,
    }

    await update(schoolEnEdition.value.id, payload)
  }
  else {
    if (!form.name || !form.email || !form.school.name) return

    await create({ ...form, school: { ...form.school } })
  }

  dialog.value = false
  resetForm()
}

// ─── Suppression ─────────────────────────────────────────────────────────────
const dialogSupprimer   = ref(false)

const schoolASupprimer  = ref<School | null>(null)

const confirmerSuppression = (school: School) => {
  schoolASupprimer.value  = school
  dialogSupprimer.value   = true
}

const supprimerSchool = async () => {
  if (schoolASupprimer.value)
    await remove(schoolASupprimer.value.id)
  dialogSupprimer.value  = false
  schoolASupprimer.value = null
}

</script>

<template>
  <VRow class="school-list-page">
    <!-- ── En-tête ── -->
    <VCol cols="12">
      <div class="d-flex align-start justify-space-between flex-wrap gap-4">
        <div>
          <h1 class="text-h5 font-weight-bold mb-1">Écoles inscrites</h1>
          <p class="text-body-2 text-medium-emphasis mb-0">Gestion et validation des établissements</p>
        </div>
        <VBtn color="#1f62a6" prepend-icon="mdi-plus" class="text-none font-weight-bold" @click="ouvrirAjouter">
          Ajouter une école
        </VBtn>
      </div>
    </VCol>

    <!-- ── Erreur API ── -->
    <VCol v-if="error" cols="12">
      <VAlert type="error" variant="tonal" closable>{{ error }}</VAlert>
    </VCol>

    <!-- ── Stats ── -->
    <VCol cols="12">
      <VRow>
        <VCol cols="12" md="3">
          <VCard class="stats-card" elevation="0">
            <VCardText>
              <div class="stats-value text-primary">{{ totals.total }}</div>
              <div class="stats-label">TOTAL</div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" md="3">
          <VCard class="stats-card" elevation="0">
            <VCardText>
              <div class="stats-value" style="color: #3d6f1f;">{{ totals.validee }}</div>
              <div class="stats-label">VALIDÉES</div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" md="3">
          <VCard class="stats-card" elevation="0">
            <VCardText>
              <div class="stats-value" style="color: #9b5e16;">{{ totals.en_attente }}</div>
              <div class="stats-label">EN ATTENTE</div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" md="3">
          <VCard class="stats-card" elevation="0">
            <VCardText>
              <div class="stats-value" style="color: #a52c2c;">{{ totals.rejetee }}</div>
              <div class="stats-label">REJETÉES</div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCol>

    <!-- ── Tableau ── -->
    <VCol cols="12">
      <VCard elevation="0" class="school-table-card">
        <VCardText class="pa-4 pa-md-6">
          <!-- Filtres + Recherche -->
          <div class="d-flex align-center justify-space-between gap-3 flex-wrap mb-4">
            <div class="filters-wrap">
              <VBtn
                v-for="filter in filterTabs"
                :key="filter.key"
                size="small"
                class="text-none"
                :variant="activeFilter === filter.key ? 'flat' : 'text'"
                :color="activeFilter === filter.key ? 'primary' : 'default'"
                @click="activeFilter = filter.key"
              >
                {{ filter.label }}
              </VBtn>
            </div>
            <VTextField
              v-model="search"
              placeholder="Nom ou email..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              style="max-width: 260px"
            />
          </div>

          <!-- Loader -->
          <div v-if="loading && !schools.length" class="d-flex justify-center py-10">
            <VProgressCircular indeterminate color="primary" />
          </div>

          <!-- Table -->
          <div v-else class="table-responsive">
            <table class="schools-table">
              <thead>
                <tr>
                  <th>ÉCOLE</th>
                  <th>EMAIL</th>
                  <th>TÉLÉPHONE</th>
                  <th>STATUT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="school in schoolsFiltres" :key="school.id">
                  <td>
                    <div class="school-name">{{ school.name }}</div>
                    <div class="school-code">{{ school.code ?? '—' }}</div>
                  </td>
                  <td>{{ school.responsible?.email ?? '—' }}</td>
                  <td>{{ school.responsible?.phone_number ?? school.phone ?? '—' }}</td>
                  <td>
                    <span
                      class="status-pill"
                      :style="{
                        backgroundColor: getStatusInfo(school.status).bgColor,
                        color: getStatusInfo(school.status).color,
                      }"
                    >
                      <!-- <span class="status-dot">●</span> -->
                      {{ getStatusInfo(school.status).label }}
                    </span>
                  </td>
                  <td>
                    <div class="d-flex align-center gap-2 flex-wrap">
											<VBtn
                        size="small"
                        variant="outlined"
                        class="text-none"
                        @click="openValidationDialog(school)">
	                        Valider/Rejeter
                      </VBtn>
                      <VBtn
                        size="small"
                        variant="outlined"
                        class="text-none"
                        :to="{ name: 'apps-school-details', params: { id: school.id } }"
                      >
                        Détail
                      </VBtn>
                      <VBtn size="small" variant="outlined" class="text-none" @click="ouvrirModifier(school)">
                        Modifier
                      </VBtn>
                      <template v-if="resolveStatusKey(school.status) === 'rejetee'">
                        <VBtn size="small" variant="outlined" class="text-none">Motif</VBtn>
                      </template>
                      <VBtn size="small" variant="outlined" color="error" class="text-none" @click="confirmerSuppression(school)">
                        Suppr.
                      </VBtn>
                    </div>
                  </td>
                </tr>
                <tr v-if="!schoolsFiltres.length">
                  <td colspan="5" class="text-center py-6 text-medium-emphasis">Aucune école trouvée.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- ─── Modal Ajouter / Modifier ─────────────────────────────────────────── -->
  <AppModal
    v-model="dialog"
    :title="modeEdition ? 'Modifier une école' : 'Ajouter une école'"
    :max-width="680"
    @close="dialog = false; resetForm()"
  >
    <template v-if="!modeEdition">
      <!-- Section utilisateur -->
      <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-3">
        Informations du responsable
      </div>
      <VRow class="mb-2">
        <VCol cols="12" sm="6">
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Nom *</div>
          <VTextField v-model="form.name" placeholder="Ex: Dupont" variant="outlined" density="compact" hide-details />
        </VCol>
        <VCol cols="12" sm="6">
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Prénom *</div>
          <VTextField v-model="form.firstname" placeholder="Ex: Jean" variant="outlined" density="compact" hide-details />
        </VCol>
        <VCol cols="12" sm="6">
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Email *</div>
          <VTextField v-model="form.email" placeholder="Ex: jean@ecole.bj" type="email" variant="outlined" density="compact" hide-details />
        </VCol>
        <VCol cols="12" sm="6">
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Téléphone</div>
          <VTextField v-model="form.phone_number" placeholder="Ex: +229 97000000" variant="outlined" density="compact" hide-details />
        </VCol>
        <VCol cols="12" sm="6">
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Mot de passe *</div>
          <VTextField v-model="form.password" type="password" variant="outlined" density="compact" hide-details />
        </VCol>
        <VCol cols="12" sm="6">
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Confirmation *</div>
          <VTextField v-model="form.password_confirmation" type="password" variant="outlined" density="compact" hide-details />
        </VCol>
      </VRow>

      <VDivider class="my-4" />
    </template>

    <!-- Section école -->
    <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-3">
      Informations de l'établissement
    </div>
    <VRow v-if="modeEdition">
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Nom de l'école *</div>
        <VTextField
          v-model="editForm.name"
          placeholder="Ex: Lycée National"
          variant="outlined"
          density="compact"
          hide-details
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">N° Autorisation *</div>
        <VTextField
          v-model="editForm.authorization"
          placeholder="Ex: AUTH-2024-001"
          variant="outlined"
          density="compact"
          hide-details
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Téléphone école</div>
        <VTextField
          v-model="editForm.phone"
          placeholder="Ex: +229 21000000"
          variant="outlined"
          density="compact"
          hide-details
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Date de création *</div>
        <VTextField
          v-model="editForm.creation_date"
          type="datetime-local"
          variant="outlined"
          density="compact"
          hide-details
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Latitude</div>
        <VTextField
          v-model.number="editForm.latitude"
          type="number"
          placeholder="Ex: 6.3654"
          variant="outlined"
          density="compact"
          hide-details
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Longitude</div>
        <VTextField
          v-model.number="editForm.longitude"
          type="number"
          placeholder="Ex: 2.3522"
          variant="outlined"
          density="compact"
          hide-details
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Statut</div>
        <VSelect
          v-model="editForm.status"
          :items="statusOptions"
          item-title="title"
          item-value="value"
          variant="outlined"
          density="compact"
          hide-details
        />
      </VCol>
    </VRow>

    <VRow v-else>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Nom de l'école *</div>
        <VTextField v-model="form.school.name" placeholder="Ex: Lycée National" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">N° Autorisation *</div>
        <VTextField v-model="form.school.authorization" placeholder="Ex: AUTH-2024-001" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Téléphone école</div>
        <VTextField v-model="form.school.phone" placeholder="Ex: +229 21000000" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Date de création *</div>
        <VTextField v-model="form.school.creation_date" type="datetime-local" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Latitude</div>
        <VTextField v-model.number="form.school.latitude" type="number" placeholder="Ex: 6.3654" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Longitude</div>
        <VTextField v-model.number="form.school.longitude" type="number" placeholder="Ex: 2.3522" variant="outlined" density="compact" hide-details />
      </VCol>
    </VRow>

    <template #actions>
      <VBtn variant="outlined" @click="dialog = false; resetForm()">Annuler</VBtn>
      <VBtn color="#1a3a6b" :loading="loading" @click="enregistrer">
        {{ modeEdition ? 'Modifier' : 'Créer' }}
      </VBtn>
    </template>
  </AppModal>

  <!-- ─── Modal Confirmation Suppression ───────────────────────────────────── -->
  <AppModal
    v-model="dialogSupprimer"
    title="Confirmer la suppression"
    :max-width="440"
    @close="dialogSupprimer = false"
  >
    <p class="text-body-1">
      Voulez-vous vraiment supprimer l'école
      <strong>{{ schoolASupprimer?.name }}</strong> ?
    </p>
    <template #actions>
      <VBtn variant="outlined" @click="dialogSupprimer = false">Annuler</VBtn>
      <VBtn color="error" :loading="loading" @click="supprimerSchool">Supprimer</VBtn>
    </template>
  </AppModal>

	 <!-- ─── Modal de Validation ou du Rejet ───────────────────────────────────── -->
   <AppModal
    v-model="dialogValidateOrReject"
    title="Confirmer la validation ou le rejet de l'inscription de l'école"
    :max-width="440"
    @close="closeDialog()"
  >
		<div class="mb-6" v-if="resolveStatusKey(selectedSchool?.status) === 'en_attente'">
      <p class="text-body-1 mb-4">
        Voulez-vous <strong>valider</strong> l'inscription de l'école
        <strong>{{ selectedSchool?.name }}</strong> ?
      </p>
      <VBtn
        variant="outlined"
        class="w-full"
        @click="confirmAction(true)"
        :loading="loading"
        :disabled="loading"
      >
        Valider
      </VBtn>
    </div>
	  <VDivider class="my-4" v-if="resolveStatusKey(selectedSchool?.status) === 'rejetee'" />
    <div class="mb-6" v-if="resolveStatusKey(selectedSchool?.status) === 'rejetee'">
      <p class="text-body-1 mb-4">
        Voulez-vous <strong>rejeter</strong> l'inscription de l'école
        <strong>{{ selectedSchool?.name }}</strong> ?
      </p>
      <VBtn
        color="error"
        variant="outlined"
        class="w-full"
        @click="confirmAction(false)"
        :loading="loading"
        :disabled="loading"
      >
        Rejeter
      </VBtn>
    </div>
    <template #actions>
 <VBtn
      variant="outlined"
      @click="closeDialog"
      :disabled="loading"
    >
      Annuler
    </VBtn>
    </template>
  </AppModal>

</template>



<style scoped>
.school-list-page { 
	color: #1f2f48; 
}
.stats-card { 
	border: 1px solid #e2e6ee; border-radius: 12px; 
}
.stats-value { 
	font-size: 2rem; font-weight: 800; line-height: 1; text-align: center; 
}
.stats-label { 
	margin-top: 0.65rem; color: #7b8797; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-align: center; 
}
.school-table-card { 
	border: 1px solid #e2e6ee; border-radius: 12px; 
}
.filters-wrap { 
	display: inline-flex; gap: 0.25rem; border-radius: 10px; background: #eef1f6; padding: 0.25rem; 
}
.table-responsive { 
	overflow-x: auto; 
}
.schools-table { 
	width: 100%; border-collapse: collapse; min-width: 900px; 
}
.schools-table th { 
	padding: 0.9rem 1rem; background: #f5f3ee; color: #778190; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-align: start; border-bottom: 1px solid #e6e8ed; 
}
.schools-table td { 
	padding: 0.9rem 1rem; border-bottom: 1px solid #eef0f4; font-size: 0.9rem; 
}
.school-name { 
	color: #143f71; font-weight: 700; 
}
.school-code { 
	margin-top: 0.2rem; color: #9aa3af; font-size: 0.78rem; 
}
.status-pill { 
	display: inline-flex; align-items: center; gap: 0.35rem; border-radius: 999px; padding: 0.3rem 0.55rem; font-size: 0.75rem; font-weight: 700; 
}
.status-dot { 
	font-size: 0.5rem; line-height: 1; 
	}
</style>
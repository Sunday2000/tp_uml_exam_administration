<script setup lang="ts">
import AppModal from '@/views/components/modal/AppModal.vue'

import api from '@/api/axios'
import { candidateApi } from '@/api/candidate'
import { useExams } from '@/composables/useExam'
import { useTestCenter } from '@/composables/useTestCenter'
import { Speciality } from '@/interfaces/speciality'
import { TestCenter } from '@/interfaces/testCenter'

interface ExamDetail {
  id: number
  title: string
  start_date: string
  end_date: string
  status: string
  registration_deadline?: string
  test_centers: TestCenter[]
  specialities: Speciality[]
  schools: ExamSchool[]
  candidates: ExamCandidate[]
  creator?: { id: number; name: string; firstname: string; email: string }
}

interface ExamSchool {
  exam_school_id: number
  school_id: number
  school_name: string
  presented_candidates_count?: number
  responsible?: { 
	id: number; 
	name: string; 
	firstname: string; 
	email: string }
}

interface ExamCandidate {
  id: number
  matricule: string
  name: string
  firstname: string
  school_id?: number
  school_name?: string
  speciality_id: number
  speciality_name: string
  student_id: number
  test_center_id?: number
  test_center_name?: string
  user_id: number
  exam_school_id: number,
  table_number?: string
}

// ─── Composable ───────────────────────────────────────────────────────────────
const { fetchById, update, syncSpecialities, syncTestCenters, loading, error } = useExams()
const { testCenters: tousLesCentres, fetchAll: fetchAllCentres } = useTestCenter()

const route  = useRoute()
const examId = computed(() => Number(route.params.id))
const exam   = ref<ExamDetail | null>(null)

const refreshExam = async () => {
  const result = await fetchById(examId.value)
  if (result) exam.value = result as ExamDetail
}

onMounted(async () => {
  await Promise.all([refreshExam(), fetchAllCentres()])
})

// ─── Modal Associer un centre ─────────────────────────────────────────────────
const dialogCentre       = ref(false)
const loadingCentre      = ref(false)
const centresSelectionnes = ref<number[]>([])

const ouvrirModalCentre = () => {
  // Pré-cocher les centres déjà associés
  centresSelectionnes.value = (exam.value?.test_centers ?? []).map(c => c.id)
  dialogCentre.value = true
}

const syncCentres = async () => {
  if (!exam.value) return
  loadingCentre.value = true
  try {
    await syncTestCenters(exam.value.id, centresSelectionnes.value)
    await refreshExam()
    dialogCentre.value = false
  }
  catch (e: any) {
    console.error('Erreur sync centres:', e)
  }
  finally {
    loadingCentre.value = false
  }
}

const retirerCentre = async (centreId: number) => {
  if (!exam.value) return
  const newIds = (exam.value.test_centers ?? [])
    .filter(c => c.id !== centreId)
    .map(c => c.id)
  loadingCentre.value = true
  try {
    await syncTestCenters(exam.value.id, newIds)
    await refreshExam()

  }
  finally {
    loadingCentre.value = false
  }
}

// ─── Modal Associer une spécialité ────────────────────────────────────────────
const dialogSpecialite        = ref(false)
const loadingSpecialite       = ref(false)
const specialitesDisponibles  = ref<Speciality[]>([])
const specialitesSelectionnees = ref<number[]>([])

const ouvrirModalSpecialite = async () => {
  // Charger toutes les spécialités disponibles
  try {
    const { data } = await api.get('/specialities')
    specialitesDisponibles.value = Array.isArray(data) ? data : (data?.data ?? [])
  }
  catch (e) {
    console.error('Erreur chargement spécialités:', e)
  }
  // Pré-cocher les spécialités déjà associées
  specialitesSelectionnees.value = (exam.value?.specialities ?? []).map(s => s.id)
  dialogSpecialite.value = true
}

const syncSpecialites = async () => {
  if (!exam.value) return
  loadingSpecialite.value = true
  try {
    await syncSpecialities(exam.value.id, specialitesSelectionnees.value)
    await refreshExam()
    dialogSpecialite.value = false
  }
  catch (e: any) {
    console.error('Erreur sync spécialités:', e)
  }
  finally {
    loadingSpecialite.value = false
  }
}

const retirerSpecialite = async (specialiteId: number) => {
  if (!exam.value) return
  const newIds = (exam.value.specialities ?? [])
    .filter(s => s.id !== specialiteId)
    .map(s => s.id)
  console.log('Retirer spécialité ID:', specialiteId)
  console.log('Nouveaux IDs à envoyer:', newIds)
  loadingSpecialite.value = true
  try {
    await syncSpecialities(exam.value.id, newIds)
    await refreshExam()
    console.log('Spécialités après refresh:', exam.value?.specialities)
  }
  finally {
    loadingSpecialite.value = false
  }
}

// ─── Données dérivées ─────────────────────────────────────────────────────────
const specialities = computed(() => exam.value?.specialities ?? [])
const centers      = computed(() => exam.value?.test_centers ?? [])
const schools      = computed(() => exam.value?.schools      ?? [])
const candidates   = computed(() => exam.value?.candidates   ?? [])

// ─── Statistiques ─────────────────────────────────────────────────────────────
const statistiques = computed(() => [
  { label: 'Candidats inscrits', value: candidates.value.length,  icon: 'mdi-account-group-outline',     color: '#1a3a6b' },
  { label: 'Spécialités associées', value: specialities.value.length, icon: 'mdi-briefcase-check-outline', color: '#1565c0' },
  { label: 'Centres associés',   value: centers.value.length,     icon: 'mdi-map-marker-radius-outline', color: '#3d6f1f' },
  { label: 'Écoles inscrites',   value: schools.value.length,     icon: 'mdi-school-outline',            color: '#9b5e16' },
])

// ─── Onglets ──────────────────────────────────────────────────────────────────
const activeTab = ref(0)

// ─── Recherches ───────────────────────────────────────────────────────────────
const rechercheSpecialites = ref('')
const rechercheCentres     = ref('')
const rechercheEcoles      = ref('')
const rechercheCandidats   = ref('')

const specialitesFiltrees = computed(() => {
  const q = rechercheSpecialites.value.toLowerCase().trim()
  if (!q) return specialities.value
  return specialities.value.filter(s =>
    (s.code ?? '').toLowerCase().includes(q) ||
    (s.grade?.label ?? '').toLowerCase().includes(q) ||
    (s.serie?.label ?? '').toLowerCase().includes(q),
  )
})

const centresFiltres = computed(() => {
  const q = rechercheCentres.value.toLowerCase().trim()
  if (!q) return centers.value
  return centers.value.filter(c =>
    (c.title ?? '').toLowerCase().includes(q) ||
    (c.code ?? '').toLowerCase().includes(q) ||
    (c.location_indication ?? '').toLowerCase().includes(q),
  )
})

const ecolesFiltrees = computed(() => {
  const q = rechercheEcoles.value.toLowerCase().trim()
  if (!q) return schools.value
  return schools.value.filter(s =>
    (s.school_name ?? '').toLowerCase().includes(q),
  )
})

const pageSize = 10

const specialitesPage = ref(1)
const centresPage = ref(1)
const ecolesPage = ref(1)
const candidatsPage = ref(1)

const paginateItems = <T,>(items: T[], page: number) => {
  const start = (page - 1) * pageSize

  return items.slice(start, start + pageSize)
}

// ─── Filtres candidats ────────────────────────────────────────────────────────
const filtreEcole      = ref<string | null>(null)
const filtreSpecialite = ref<string | null>(null)
const filtreCentre     = ref<string | null>(null)

const optionsEcoles      = computed(() => [...new Set(candidates.value.map(c => c.school_name).filter(Boolean))].sort() as string[])
const optionsSpecialites = computed(() => [...new Set(candidates.value.map(c => c.speciality_name).filter(Boolean))].sort() as string[])
const optionsCentres     = computed(() => [...new Set(candidates.value.map(c => c.test_center_name).filter(Boolean))].sort() as string[])

const candidatsFiltres = computed(() =>
  candidates.value.filter(c => {
    const q = rechercheCandidats.value.toLowerCase().trim()
    const matchSearch = !q
      || (c.name ?? '').toLowerCase().includes(q)
      || (c.firstname ?? '').toLowerCase().includes(q)
      || (c.matricule ?? '').toLowerCase().includes(q)
    const matchEcole  = !filtreEcole.value      || c.school_name        === filtreEcole.value
    const matchSpec   = !filtreSpecialite.value || c.speciality_name    === filtreSpecialite.value
    const matchCentre = !filtreCentre.value     || c.test_center_name  === filtreCentre.value
    return matchSearch && matchEcole && matchSpec && matchCentre
  }),
)

const specialitesTotalPages = computed(() => Math.max(1, Math.ceil(specialitesFiltrees.value.length / pageSize)))
const centresTotalPages = computed(() => Math.max(1, Math.ceil(centresFiltres.value.length / pageSize)))
const ecolesTotalPages = computed(() => Math.max(1, Math.ceil(ecolesFiltrees.value.length / pageSize)))
const candidatsTotalPages = computed(() => Math.max(1, Math.ceil(candidatsFiltres.value.length / pageSize)))

const specialitesPaginated = computed(() => paginateItems(specialitesFiltrees.value, specialitesPage.value))
const centresPaginated = computed(() => paginateItems(centresFiltres.value, centresPage.value))
const ecolesPaginated = computed(() => paginateItems(ecolesFiltrees.value, ecolesPage.value))
const candidatsPaginated = computed(() => paginateItems(candidatsFiltres.value, candidatsPage.value))

const centresAssignables = computed(() =>
  centers.value.map(center => ({
    title: `${center.title} (${center.code})`,
    value: center.id,
  })),
)

watch(() => specialitesFiltrees.value.length, () => { specialitesPage.value = 1 })
watch(() => centresFiltres.value.length, () => { centresPage.value = 1 })
watch(() => ecolesFiltrees.value.length, () => { ecolesPage.value = 1 })
watch(() => candidatsFiltres.value.length, () => { candidatsPage.value = 1 })

const dialogAffectationCandidat = ref(false)
const dialogAffectationGlobale = ref(false)
const candidatSelectionne = ref<ExamCandidate | null>(null)
const centreSelectionneId = ref<number | null>(null)
const loadingAffectation = ref(false)
const loadingDownloadCenterId = ref<number | null>(null)
const loadingInvitationCandidateId = ref<number | null>(null)
const feedback = ref({
  visible: false,
  text: '',
  color: 'success',
})

const afficherFeedback = (text: string, color: 'success' | 'error' | 'warning' = 'success') => {
  feedback.value = {
    visible: true,
    text,
    color,
  }
}

const ouvrirAffectationCandidat = (candidate: ExamCandidate) => {
  candidatSelectionne.value = candidate
  centreSelectionneId.value = candidate.test_center_id ?? null
  dialogAffectationCandidat.value = true
}

const confirmerAffectationCandidat = async () => {
  if (!candidatSelectionne.value || !centreSelectionneId.value) {
    afficherFeedback('Veuillez sélectionner un centre.', 'warning')
    return
  }

  loadingAffectation.value = true
  try {
    await candidateApi.assignTestCenter(candidatSelectionne.value.id, centreSelectionneId.value)
    await refreshExam()
    dialogAffectationCandidat.value = false
    afficherFeedback(`Centre affecté à ${candidatSelectionne.value.firstname} ${candidatSelectionne.value.name}.`)
  }
  catch (e: any) {
    afficherFeedback(e?.response?.data?.message ?? 'Erreur lors de l\'affectation.', 'error')
  }
  finally {
    loadingAffectation.value = false
  }
}

const ouvrirAffectationGlobale = () => {
  dialogAffectationGlobale.value = true
}

const confirmerAffectationGlobale = async () => {
  if (!exam.value) return

  loadingAffectation.value = true
  try {
    await candidateApi.autoAssignByExam(exam.value.id)
    await refreshExam()
    dialogAffectationGlobale.value = false
    afficherFeedback('Les centres ont été affectés automatiquement aux candidats.')
  }
  catch (e: any) {
    afficherFeedback(e?.response?.data?.message ?? 'Erreur lors de l\'affectation automatique.', 'error')
  }
  finally {
    loadingAffectation.value = false
  }
}

const telechargerFicheEmargement = async (centerId: number, centerTitle: string) => {
  if (!exam.value) return

  loadingDownloadCenterId.value = centerId
  try {
    const pdfBlob = await candidateApi.getAttendanceListByCenter(exam.value.id, centerId)

    // Create a temporary URL for the PDF and open it in the browser
    const url = window.URL.createObjectURL(pdfBlob)
    window.open(url, '_blank')

    // Release object URL after the browser has time to consume it
    setTimeout(() => window.URL.revokeObjectURL(url), 60_000)
    afficherFeedback(`Fiche d'émargement ouverte pour ${centerTitle}.`)
  }
  catch (e: any) {
    console.log(e)
    afficherFeedback(e?.response?.data?.message ?? 'Erreur lors de l\'ouverture du document.', 'error')
  }
  finally {
    loadingDownloadCenterId.value = null
  }
}

const ouvrirConvocation = async (candidate: ExamCandidate) => {
  loadingInvitationCandidateId.value = candidate.id
  try {
    const pdfBlob = await candidateApi.downloadInvitation(candidate.id)
    const url = window.URL.createObjectURL(pdfBlob)
    const opened = window.open(url, '_blank')

    if (!opened)
      afficherFeedback('Impossible d’ouvrir la convocation. Vérifiez le bloqueur de fenêtres.', 'error')

    // Release object URL after the browser has time to load the PDF
    setTimeout(() => window.URL.revokeObjectURL(url), 60_000)
  }
  catch (e: any) {
    afficherFeedback(e?.response?.data?.message ?? 'Erreur lors de l\'ouverture de la convocation.', 'error')
  }
  finally {
    loadingInvitationCandidateId.value = null
  }
}

// ─── Statuts ──────────────────────────────────────────────────────────────────
const statusLabels:   Record<string, string> = { pending: 'En attente', ongoing: 'En cours', close: 'Clôturée' }
const statusColors:   Record<string, string> = { pending: '#b45309',    ongoing: '#1565c0',  close: '#6b7280' }
const statusBgColors: Record<string, string> = { pending: '#fef3c7',    ongoing: '#e3f2fd',  close: '#f3f4f6' }

const schoolStatusLabels:   Record<string, string> = { validee: 'Validée', en_attente: 'En attente', rejetee: 'Rejetée' }
const schoolStatusColors:   Record<string, string> = { validee: '#3d6f1f', en_attente: '#9b5e16',    rejetee: '#a52c2c' }
const schoolStatusBgColors: Record<string, string> = { validee: '#e3efd8', en_attente: '#f6e7ce',    rejetee: '#f8e2e2' }

// ─── Changement de statut ─────────────────────────────────────────────────────
const dialogStatut  = ref(false)
const nouveauStatut = ref<'ongoing' | 'close' | ''>('')

const ouvrirChangementStatut = (statut: 'ongoing' | 'close') => {
  nouveauStatut.value = statut
  dialogStatut.value  = true
}

const confirmerChangementStatut = async () => {
  if (!exam.value || !nouveauStatut.value) return
  await update(exam.value.id, { status: nouveauStatut.value })
  const result = await fetchById(exam.value.id)
  if (result) exam.value = result as ExamDetail
  dialogStatut.value  = false
  nouveauStatut.value = ''
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (date: string) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>

<template>
  <!-- Loader -->
  <div v-if="loading && !exam" class="d-flex justify-center py-16">
    <VProgressCircular indeterminate color="primary" size="48" />
  </div>

  <!-- Erreur -->
  <VAlert v-else-if="error" type="error" variant="tonal">{{ error }}</VAlert>

  <!-- Contenu -->
  <div v-else-if="exam">
    <VRow>
      <!-- Retour -->
      <VCol cols="12" class="pb-1">
        <RouterLink :to="{ name: 'apps-session-list' }" class="text-primary text-decoration-none">
          ← Sessions
        </RouterLink>
      </VCol>

      <!-- En-tête -->
      <VCol cols="12" class="pt-0">
        <div class="d-flex align-start justify-space-between gap-4 flex-wrap">
          <div>
            <h1 class="text-h4 font-weight-bold mb-1">{{ exam.title }}</h1>
            <div class="d-flex align-center flex-wrap gap-3">
              <span class="text-body-2 text-medium-emphasis">
                {{ formatDate(exam.start_date) }} — {{ formatDate(exam.end_date) }}
              </span>
              <span
                class="d-inline-flex align-center gap-1 rounded-pill px-2 py-1 text-caption font-weight-bold"
                :style="{ backgroundColor: statusBgColors[exam.status], color: statusColors[exam.status] }"
              >
                <span style="font-size: 0.5rem;">●</span>
                {{ statusLabels[exam.status] ?? exam.status }}
              </span>
            </div>
          </div>

          <div class="d-flex gap-2 flex-wrap">
            <VBtn
              v-if="exam.status === 'pending'"
              color="#3d6f1f"
              class="text-none"
              :loading="loading"
              @click="ouvrirChangementStatut('ongoing')"
            >
              Déclarer En cours
            </VBtn>
            <VBtn
              v-if="exam.status === 'ongoing'"
              color="error"
              class="text-none"
              :loading="loading"
              @click="ouvrirChangementStatut('close')"
            >
              Clôturer
            </VBtn>
          </div>
        </div>
      </VCol>

      <!-- Statistiques -->
      <VCol v-for="stat in statistiques" :key="stat.label" cols="12" sm="6" md="4">
        <VCard elevation="0" border rounded="lg">
          <VCardText class="pa-5">
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-caption text-medium-emphasis font-weight-bold text-uppercase mb-1">{{ stat.label }}</p>
                <p class="text-h4 font-weight-bold mb-0">{{ stat.value }}</p>
              </div>
              <VAvatar :color="stat.color" size="46" rounded="lg">
                <VIcon :icon="stat.icon" color="white" size="24" />
              </VAvatar>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Onglets -->
      <VCol cols="12">
        <VCard elevation="0" border rounded="lg">
          <VTabs v-model="activeTab" color="#1a3a6b">
            <VTab :value="0">Spécialités associées ({{ specialitesFiltrees.length }})</VTab>
            <VTab :value="1">Centres associés ({{ centresFiltres.length }})</VTab>
            <VTab :value="2">Écoles inscrites ({{ ecolesFiltrees.length }})</VTab>
            <VTab :value="3">Candidats inscrits ({{ candidatsFiltres.length }})</VTab>
          </VTabs>

          <VDivider />

          <VWindow v-model="activeTab">

            <!-- ── Spécialités ── -->
            <VWindowItem :value="0">
              <VCardText>
                <div class="d-flex align-center justify-space-between mb-4">
                  <span class="text-subtitle-2 font-weight-bold">Spécialités ({{ specialitesFiltrees.length }})</span>
                  <VBtn size="small" color="#1a3a6b" prepend-icon="mdi-plus" class="text-none" @click="ouvrirModalSpecialite">
                    Associer une spécialité
                  </VBtn>
                </div>
                <VTextField
                  v-model="rechercheSpecialites"
                  placeholder="Rechercher une spécialité..."
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="mb-4"
                  style="max-width: 360px;"
                />
                <VTable>
                  <thead>
                    <tr style="background: #f5f4ef;">
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Code</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Classe</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Série</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis pe-5 py-3 text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="spec in specialitesPaginated" :key="spec.id">
                      <td class="ps-5 py-3"><span class="text-body-2 font-weight-semibold text-primary">{{ spec.code }}</span></td>
                      <td class="ps-5 py-3"><span class="text-body-2">{{ spec.grade?.label ?? '—' }}</span></td>
                      <td class="ps-5 py-3"><span class="text-body-2">{{ spec.serie?.label ?? '—' }}</span></td>
                      <td class="pe-5 py-3 text-end">
                        <VBtn size="small" variant="outlined" color="error" class="text-none" :loading="loadingSpecialite" @click="retirerSpecialite(spec.id)">Retirer</VBtn>
                      </td>
                    </tr>
                    <tr v-if="!specialitesFiltrees.length">
                      <td colspan="4" class="text-center text-medium-emphasis py-8 text-body-2">Aucune spécialité associée.</td>
                    </tr>
                  </tbody>
                </VTable>
                <div v-if="specialitesTotalPages > 1" class="d-flex justify-center align-center py-4">
                  <VPagination
                    v-model="specialitesPage"
                    :length="specialitesTotalPages"
                    :total-visible="5"
                    density="compact"
                    active-color="#1a3a6b"
                  />
                </div>
              </VCardText>
            </VWindowItem>

            <!-- ── Centres ── -->
            <VWindowItem :value="1">
              <VCardText>
                <div class="d-flex align-center justify-space-between mb-4">
                  <span class="text-subtitle-2 font-weight-bold">Centres ({{ centresFiltres.length }})</span>
                  <VBtn size="small" color="#1a3a6b" prepend-icon="mdi-plus" class="text-none" @click="ouvrirModalCentre">
                    Associer un centre
                  </VBtn>
                </div>
                <VTextField
                  v-model="rechercheCentres"
                  placeholder="Rechercher un centre..."
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="mb-4"
                  style="max-width: 360px;"
                />
                <VTable>
                  <thead>
                    <tr style="background: #f5f4ef;">
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Nom</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Code</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Localisation</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Capacité</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3" style="min-width: 180px;">Occupation</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis pe-5 py-3 text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="center in centresPaginated" :key="center.id">
                      <td class="ps-5 py-3"><span class="text-body-2 font-weight-semibold text-primary">{{ center.title }}</span></td>
                      <td class="ps-5 py-3"><span class="text-body-2 text-medium-emphasis">{{ center.code }}</span></td>
                      <td class="ps-5 py-3"><span class="text-body-2">{{ center.location_indication ?? '—' }}</span></td>
                      <td class="ps-5 py-3"><span class="text-body-2">{{ center.seating_capacity ?? '—' }}</span></td>
                      <td class="ps-5 py-3" style="min-width: 180px;">
                        <template v-if="center.capacity_completion_percent != null">
                          <div class="text-caption font-weight-medium mb-1">
                            {{ center.capacity_completion_percent }}% ({{ center.assigned_candidates_count ?? 0 }}/{{ center.seating_capacity ?? '?' }})
                          </div>
                          <VProgressLinear
                            :model-value="center.capacity_completion_percent"
                            :color="center.capacity_completion_percent >= 90 ? 'error' : center.capacity_completion_percent >= 70 ? 'warning' : 'success'"
                            bg-color="grey-lighten-3"
                            height="6"
                            rounded
                          />
                        </template>
                        <span v-else class="text-medium-emphasis">—</span>
                      </td>
                      <td class="pe-5 py-3 text-end">
                        <div class="d-flex justify-end flex-wrap gap-2">
                          <VTooltip text="Télécharger la fiche d'émargement">
                            <template #activator="{ props }">
                              <VBtn size="small" variant="outlined" color="primary" class="text-none" :icon="true" :loading="loadingDownloadCenterId === center.id" @click="telechargerFicheEmargement(center.id, center.title)" v-bind="props">
                                <VIcon icon="mdi-download" size="20" />
                              </VBtn>
                            </template>
                          </VTooltip>
                          <VBtn size="small" variant="outlined" color="error" class="text-none" :loading="loadingCentre" @click="retirerCentre(center.id)">Retirer</VBtn>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="!centresFiltres.length">
                      <td colspan="6" class="text-center text-medium-emphasis py-8 text-body-2">Aucun centre associé.</td>
                    </tr>
                  </tbody>
                </VTable>
                <div v-if="centresTotalPages > 1" class="d-flex justify-center align-center py-4">
                  <VPagination
                    v-model="centresPage"
                    :length="centresTotalPages"
                    :total-visible="5"
                    density="compact"
                    active-color="#1a3a6b"
                  />
                </div>
              </VCardText>
            </VWindowItem>

            <!-- ── Écoles ── -->
            <VWindowItem :value="2">
              <VCardText>
                <span class="text-subtitle-2 font-weight-bold d-block mb-4">Écoles inscrites ({{ ecolesFiltrees.length }})</span>
                <VTextField
                  v-model="rechercheEcoles"
                  placeholder="Rechercher une école..."
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="mb-4"
                  style="max-width: 360px;"
                />
                <VTable>
                  <thead>
                    <tr style="background: #f5f4ef;">
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Responsable</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">École</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Email</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3 text-end">Candidats présentés</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis pe-5 py-3 text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="school in ecolesPaginated" :key="school.school_id">
                      <td class="ps-5 py-3">
                        <span class="text-body-2 font-weight-semibold text-primary">{{ school.responsible?.name ?? '—' }} {{ school.responsible?.firstname ?? '—' }}</span>
                      </td>
                      <td class="ps-5 py-3">
                        <span class="text-body-2">{{ school.school_name ?? '—' }}</span>
                      </td>
                      <td class="ps-5 py-3">
                        <span class="text-body-2 text-medium-emphasis">{{ school.responsible?.email ?? '—' }}</span>
                      </td>
                      <td class="ps-5 py-3 text-end">
                        <span class="text-body-2 font-weight-semibold">{{ school.presented_candidates_count ?? '—' }}</span>
                      </td>
                      <td class="pe-5 py-3 text-end">
                        <VBtn
                          size="small"
                          variant="outlined"
                          class="text-none"
                          :to="{ name: 'apps-school-details', params: { id: school.school_id } }"
                        >
                          Détail
                        </VBtn>
                      </td>
                    </tr>
                    <tr v-if="!ecolesFiltrees.length">
                      <td colspan="5" class="text-center text-medium-emphasis py-8 text-body-2">Aucune école inscrite.</td>
                    </tr>
                  </tbody>
                </VTable>
                <div v-if="ecolesTotalPages > 1" class="d-flex justify-center align-center py-4">
                  <VPagination
                    v-model="ecolesPage"
                    :length="ecolesTotalPages"
                    :total-visible="5"
                    density="compact"
                    active-color="#1a3a6b"
                  />
                </div>
              </VCardText>
            </VWindowItem>

            <!-- ── Candidats ── -->
            <VWindowItem :value="3">
              <VCardText>
                <div class="d-flex align-center justify-space-between gap-3 flex-wrap mb-4">
                  <span class="text-subtitle-2 font-weight-bold">Candidats inscrits ({{ candidatsFiltres.length }})</span>
                  <VBtn
                    v-if="exam.status === 'ongoing'"
                    size="small"
                    color="#1a3a6b"
                    prepend-icon="mdi-account-multiple-check-outline"
                    class="text-none"
                    :disabled="!candidatsFiltres.length"
                    @click="ouvrirAffectationGlobale"
                  >
                    Affecter un centre pour tous
                  </VBtn>
                </div>
                <VRow class="mb-4" dense>
                  <VCol cols="12" md="3">
                    <VTextField
                      v-model="rechercheCandidats"
                      placeholder="Rechercher un candidat..."
                      prepend-inner-icon="mdi-magnify"
                      variant="outlined"
                      density="compact"
                      hide-details
                      clearable
                    />
                  </VCol>
                  <VCol cols="12" md="3">
                    <VAutocomplete
                      v-model="filtreEcole"
                      :items="optionsEcoles"
                      placeholder="Filtrer par école"
                      variant="outlined"
                      density="compact"
                      hide-details
                      clearable
                    />
                  </VCol> 
                  <VCol cols="12" md="3">
                    <VAutocomplete
                      v-model="filtreSpecialite"
                      :items="optionsSpecialites"
                      placeholder="Filtrer par spécialité"
                      variant="outlined"
                      density="compact"
                      hide-details
                      clearable
                    />
                  </VCol>
                  <VCol cols="12" md="3">
                    <VAutocomplete
                      v-model="filtreCentre"
                      :items="optionsCentres"
                      placeholder="Filtrer par centre"
                      variant="outlined"
                      density="compact"
                      hide-details
                      clearable
                    />
                  </VCol>
                </VRow>
                <VTable>
                  <thead>
                    <tr style="background: #f5f4ef;">
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Nom</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Prénoms</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Matricule</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">N° Table</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Spécialité</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">École</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Centre</th>
                      <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis pe-5 py-3 text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cand in candidatsPaginated" :key="cand.id">
                      <td class="ps-5 py-3"><span class="text-body-2 font-weight-semibold">{{ cand.name }}</span></td>
                      <td class="ps-5 py-3"><span class="text-body-2">{{ cand.firstname }}</span></td>
                      <td class="ps-5 py-3"><span class="text-body-2">{{ cand.matricule ?? '—' }}</span></td>
                      <td class="ps-5 py-3"><span class="text-body-2">{{ cand.table_number ?? '—' }}</span></td>
                      <td class="ps-5 py-3">
                        <VChip v-if="cand.speciality_id" size="small" color="primary" variant="tonal">
                          {{ cand.speciality_name ?? '—' }}
                        </VChip>
                        <span v-else class="text-medium-emphasis">—</span>
                      </td>
                      <td class="ps-5 py-3"><span class="text-body-2">{{ cand.school_name ?? '—' }}</span></td>
                      <td class="ps-5 py-3"><span class="text-body-2">{{ cand.test_center_name ?? '—' }}</span></td>
                      <td class="pe-5 py-3 text-end">
                        <div class="d-flex justify-end flex-wrap gap-2">
                          <VBtn
                            size="small"
                            variant="outlined"
                            color="#1a3a6b"
                            class="text-none"
                            :loading="loadingInvitationCandidateId === cand.id"
                            @click="ouvrirConvocation(cand)"
                          >
                            Convocation
                          </VBtn>
                          <VBtn
                            v-if="exam.status === 'ongoing'"
                            size="small"
                            variant="outlined"
                            color="secondary"
                            class="text-none"
                            :disabled="!centresAssignables.length"
                            @click="ouvrirAffectationCandidat(cand)"
                          >
                            Affecter un centre
                          </VBtn>
                          <VBtn
                            size="small"
                            variant="outlined"
                            class="text-none"
                            :to="{ name: 'apps-candidate-details', params: { id: cand.id } }"
                          >
                            Détail
                          </VBtn>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="!candidatsFiltres.length">
                      <td colspan="7" class="text-center text-medium-emphasis py-8 text-body-2">Aucun candidat trouvé.</td>
                    </tr>
                  </tbody>
                </VTable>
                <div v-if="candidatsTotalPages > 1" class="d-flex justify-center align-center py-4">
                  <VPagination
                    v-model="candidatsPage"
                    :length="candidatsTotalPages"
                    :total-visible="5"
                    density="compact"
                    active-color="#1a3a6b"
                  />
                </div>
              </VCardText>
            </VWindowItem>

          </VWindow>
        </VCard>
      </VCol>
    </VRow>

    <!-- Modal changement de statut -->
    <AppModal
      v-model="dialogStatut"
      title="Confirmer le changement de statut"
      :max-width="440"
      @close="dialogStatut = false"
    >
      <p class="text-body-1">
        Voulez-vous vraiment changer le statut de cette session en
        <strong>{{ nouveauStatut === 'ongoing' ? 'En cours' : 'Clôturée' }}</strong> ?
      </p>
      <template #actions>
        <VBtn variant="outlined" @click="dialogStatut = false">Annuler</VBtn>
        <VBtn
          :color="nouveauStatut === 'ongoing' ? '#3d6f1f' : 'error'"
          :loading="loading"
          @click="confirmerChangementStatut"
        >
          Confirmer
        </VBtn>
      </template>
    </AppModal>

    <!-- ─── Modal Associer des centres ─────────────────────────────────────── -->
    <AppModal
      v-model="dialogCentre"
      title="Associer des centres"
      :max-width="560"
      @close="dialogCentre = false"
    >
      <p class="text-body-2 text-medium-emphasis mb-4">
        Cochez les centres à associer à cette session. Les centres décochés seront retirés.
      </p>

      <div class="d-flex flex-column gap-2">
        <label
          v-for="centre in tousLesCentres"
          :key="centre.id"
          class="centre-checkbox-row d-flex align-center gap-3 pa-3 rounded-lg"
          :class="{ 'centre-checked': centresSelectionnes.includes(centre.id) }"
        >
          <input
            v-model="centresSelectionnes"
            type="checkbox"
            :value="centre.id"
            class="sync-cb"
          />
          <div>
            <span class="text-body-2 font-weight-medium">{{ centre.title }}</span>
            <span class="text-caption text-medium-emphasis ms-2">{{ centre.code }}</span>
            <span v-if="centre.location_indication" class="text-caption text-medium-emphasis ms-2">
              — {{ centre.location_indication }}
            </span>
          </div>
        </label>

        <div v-if="!tousLesCentres.length" class="text-caption text-medium-emphasis text-center py-4">
          Aucun centre disponible
        </div>
      </div>

      <template #actions>
        <VBtn variant="outlined" @click="dialogCentre = false">Annuler</VBtn>
        <VBtn color="#1a3a6b" :loading="loadingCentre" @click="syncCentres">Enregistrer</VBtn>
      </template>
    </AppModal>

    <!-- ─── Modal Associer des spécialités ─────────────────────────────────── -->
    <AppModal
      v-model="dialogSpecialite"
      title="Associer des spécialités"
      :max-width="560"
      @close="dialogSpecialite = false"
    >
      <p class="text-body-2 text-medium-emphasis mb-4">
        Cochez les spécialités à associer à cette session. Les spécialités décochées seront retirées.
      </p>

      <div class="d-flex flex-column gap-2">
        <label
          v-for="spec in specialitesDisponibles"
          :key="spec.id"
          class="centre-checkbox-row d-flex align-center gap-3 pa-3 rounded-lg"
          :class="{ 'centre-checked': specialitesSelectionnees.includes(spec.id) }"
        >
          <input
            v-model="specialitesSelectionnees"
            type="checkbox"
            :value="spec.id"
            class="sync-cb"
          />
          <div>
            <span class="text-body-2 font-weight-medium">{{ spec.code }}</span>
            <span class="text-caption text-medium-emphasis ms-2">{{ spec.grade?.label }}</span>
            <span class="text-caption text-medium-emphasis ms-1">— {{ spec.serie?.label }}</span>
          </div>
        </label>

        <div v-if="!specialitesDisponibles.length" class="text-caption text-medium-emphasis text-center py-4">
          Aucune spécialité disponible
        </div>
      </div>

      <template #actions>
        <VBtn variant="outlined" @click="dialogSpecialite = false">Annuler</VBtn>
        <VBtn color="#1a3a6b" :loading="loadingSpecialite" @click="syncSpecialites">Enregistrer</VBtn>
      </template>
    </AppModal>

    <AppModal
      v-model="dialogAffectationCandidat"
      title="Affecter un centre au candidat"
      :max-width="520"
      @close="dialogAffectationCandidat = false"
    >
      <p class="text-body-2 text-medium-emphasis mb-4">
        Sélectionnez un centre pour
        <strong>{{ candidatSelectionne?.firstname }} {{ candidatSelectionne?.name }}</strong>.
      </p>

      <VAlert v-if="!centresAssignables.length" type="warning" variant="tonal" class="mb-4">
        Aucun centre n'est encore associé à cette session.
      </VAlert>

      <VSelect
        v-model="centreSelectionneId"
        :items="centresAssignables"
        item-title="title"
        item-value="value"
        label="Centre d'examen"
        variant="outlined"
        density="compact"
        hide-details
      />

      <template #actions>
        <VBtn variant="outlined" @click="dialogAffectationCandidat = false">Annuler</VBtn>
        <VBtn color="#1a3a6b" :disabled="!centresAssignables.length" :loading="loadingAffectation" @click="confirmerAffectationCandidat">
          Affecter
        </VBtn>
      </template>
    </AppModal>

    <AppModal
      v-model="dialogAffectationGlobale"
      title="Affecter automatiquement les centres"
      :max-width="520"
      @close="dialogAffectationGlobale = false"
    >
      <p class="text-body-2 text-medium-emphasis mb-2">
        Le système va automatiquement affecter un centre d'examen à chaque candidat de cette session
        en fonction des disponibilités et des capacités.
      </p>
      <VAlert type="info" variant="tonal" class="mt-2">
        Aucune sélection manuelle n'est requise. Cette action peut modifier les affectations existantes.
      </VAlert>

      <template #actions>
        <VBtn variant="outlined" @click="dialogAffectationGlobale = false">Annuler</VBtn>
        <VBtn color="#1a3a6b" :loading="loadingAffectation" @click="confirmerAffectationGlobale">
          Lancer l'affectation automatique
        </VBtn>
      </template>
    </AppModal>
  </div>

  <VAlert v-else type="warning" variant="tonal">
    Session introuvable.
  </VAlert>

  <VSnackbar v-model="feedback.visible" :color="feedback.color" timeout="2800" location="top right">
    {{ feedback.text }}
  </VSnackbar>
</template>

<style scoped>
.centre-checkbox-row {
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background 0.15s;
}
.centre-checkbox-row:hover { background: #f5f5f5; }
.centre-checked { background: #f0f4ff; border-color: #90a4d4; }
.sync-cb {
  width: 16px;
  height: 16px;
  accent-color: #1a3a6b;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
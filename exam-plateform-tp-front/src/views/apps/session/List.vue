<script setup lang="ts">
import type { ExamPayload } from '@/api/exam'
import { useExams } from '@/composables/useExam'
import type { Exam } from '@/interfaces/exam'
import AppTable from '@/layouts/AppTable.vue'
import AppModal from '@/views/components/modal/AppModal.vue'
import { useAuthStore } from '@/stores/auth'

// ─── Composable API ───────────────────────────────────────────────────────────
const { exams, loading, error, fetchAll, create, update, remove } = useExams()
const authStore = useAuthStore()
onMounted(() => fetchAll())

const role = computed(() => authStore.getRole())

// ─── Statuts ──────────────────────────────────────────────────────────────────
type SessionStatus = 'pending' | 'ongoing' | 'close'

const statusLabels: Record<SessionStatus, string> = {
  pending: 'En attente',
  ongoing: 'En cours',
  close:   'Clôturée',
}
const statusColors: Record<SessionStatus, string> = {
  pending: '#b45309',
  ongoing: '#1565c0',
  close:   '#6b7280',
}
const statusBgColors: Record<SessionStatus, string> = {
  pending: '#fef3c7',
  ongoing: '#e3f2fd',
  close:   '#f3f4f6',
}

const statusOptions = [
  { value: 'pending', label: 'En attente' },
  { value: 'ongoing', label: 'En cours' },
  { value: 'close',   label: 'Clôturée' },
]

// ─── Colonnes ─────────────────────────────────────────────────────────────────
const columns = [
  { key: 'title',                 label: 'Titre' },
  { key: 'start_date',            label: 'Date début' },
  { key: 'end_date',              label: 'Date fin' },
  { key: 'registration_deadline', label: 'Fin inscriptions' },
  { key: 'status',                label: 'Statut' },
  { key: 'actions',               label: 'Actions', align: 'end' as const },
]

// ─── Recherche ────────────────────────────────────────────────────────────────
const recherche = ref('')
const examsFiltres = computed(() =>
  exams.value.filter(s =>
    (s.title ?? '').toLowerCase().includes(recherche.value.toLowerCase()),
  ),
)

// ─── Modal Ajouter / Modifier ─────────────────────────────────────────────────
const dialog          = ref(false)
const modeEdition     = ref(false)
const examEnEdition   = ref<Exam | null>(null)

const form = reactive<ExamPayload>({
  title:                  '',
  start_date:             '',
  end_date:               '',
  registration_deadline:  '',
  status:                 'pending',
})

const resetForm = () => {
  Object.assign(form, {
    title:                 '',
    start_date:            '',
    end_date:              '',
    registration_deadline: '',
    status:                'pending',
  })
}

const ouvrirAjouter = () => {
  modeEdition.value   = false
  examEnEdition.value = null
  resetForm()
  dialog.value = true
}

const ouvrirModifier = (exam: Exam) => {
  modeEdition.value   = true
  examEnEdition.value = exam
  Object.assign(form, {
    title:                 exam.title,
    start_date:            exam.start_date,
    end_date:              exam.end_date,
    registration_deadline: exam.registration_deadline ?? '',
    status:                exam.status ?? 'pending',
  })
  dialog.value = true
}

const enregistrer = async () => {
  if (!form.title || !form.start_date || !form.end_date) return

  if (modeEdition.value && examEnEdition.value)
    await update(examEnEdition.value.id, form)
  else
    await create(form)

  dialog.value = false
  resetForm()
}

// ─── Suppression avec confirmation ───────────────────────────────────────────
const dialogSupprimer  = ref(false)
const examASupprimer   = ref<Exam | null>(null)

const confirmerSuppression = (exam: Exam) => {
  examASupprimer.value  = exam
  dialogSupprimer.value = true
}

const supprimerExam = async () => {
  if (examASupprimer.value)
    await remove(examASupprimer.value.id)
  dialogSupprimer.value = false
  examASupprimer.value  = null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (date: string) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}
</script>

<template>
  <VRow>
    <!-- ── En-tête ── -->
    <VCol cols="12">
      <div class="d-flex align-center justify-space-between flex-wrap gap-3">
        <div>
          <h1 class="text-h5 font-weight-bold">Sessions d'examen</h1>
          <p class="text-body-2 text-medium-emphasis mt-1 mb-0">Gestion des sessions d'examen</p>
        </div>
        <VBtn v-if="role?.isAdmin() || role?.isRegulator()" color="#1a3a6b" prepend-icon="mdi-plus" @click="ouvrirAjouter">
          Créer une session
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
        placeholder="Rechercher une session..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        style="max-width: 300px;"
      />
    </VCol>

    <!-- ── Tableau ── -->
    <VCol cols="12">
      <div v-if="loading && !exams.length" class="d-flex justify-center py-10">
        <VProgressCircular indeterminate color="primary" />
      </div>

      <AppTable
        v-else
        title="Liste des sessions"
        :columns="columns"
        :items="examsFiltres"
        :count="examsFiltres.length"
      >
        <!-- Titre -->
        <template #cell-title="{ item }">
          <span class="text-body-2 font-weight-semibold text-primary">{{ item.title }}</span>
        </template>

        <!-- Dates -->
        <template #cell-start_date="{ item }">
          <span class="text-body-2">{{ formatDate(item.start_date) }}</span>
        </template>

        <template #cell-end_date="{ item }">
          <span class="text-body-2">{{ formatDate(item.end_date) }}</span>
        </template>

        <template #cell-registration_deadline="{ item }">
          <span class="text-body-2">{{ formatDate(item.registration_deadline ?? '') }}</span>
        </template>

        <!-- Statut -->
        <template #cell-status="{ item }">
          <span
            class="d-inline-flex align-center gap-1 rounded-pill px-2 py-1 text-caption font-weight-bold"
            :style="{
              backgroundColor: statusBgColors[item.status as SessionStatus],
              color: statusColors[item.status as SessionStatus],
            }"
          >
            <span style="font-size: 0.5rem;">●</span>
            {{ statusLabels[item.status as SessionStatus] ?? item.status }}
          </span>
        </template>

        <!-- Actions -->
        <template #cell-actions="{ item }">
          <div class="d-flex gap-2 justify-end">
            <VBtn
              v-if="role?.isAdmin() || role?.isRegulator()"
              size="small"
              variant="outlined"
              color="primary"
              :to="{ name: 'apps-session-dashboard', params: { id: item.id } }"
            >
              Tableau de bord
            </VBtn>
						<VBtn
              v-if="role?.isAdmin() || role?.isRegulator() || role?.isJury()"
              size="small"
              variant="outlined"
              color="primary"
              :to="{ name: 'apps-session-noteValidation', params: { id: item.id } }"
            >
              Validation des notes
            </VBtn>
            <VBtn 
              v-if="role?.isAdmin() || role?.isRegulator()"
              size="small" 
              variant="outlined" 
              @click.stop="ouvrirModifier(item)"
            >
              Modifier
            </VBtn>
            <VBtn 
              v-if="role?.isAdmin() || role?.isRegulator()"
              size="small" 
              variant="outlined" 
              color="error" 
              @click.stop="confirmerSuppression(item)"
            >
              Suppr.
            </VBtn>
          </div>
        </template>
      </AppTable>
    </VCol>
  </VRow>

  <!-- ─── Modal Créer / Modifier ───────────────────────────────────────────── -->
  <AppModal
    v-if="role?.isAdmin() || role?.isRegulator()"
    v-model="dialog"
    :title="modeEdition ? 'Modifier la session' : 'Créer une session'"
    :max-width="620"
    @close="dialog = false; resetForm()"
  >
    <VRow>
      <VCol cols="12">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Titre *</div>
        <VTextField
          v-model="form.title"
          placeholder="Ex: BAC Général 2025-2026"
          variant="outlined"
          density="compact"
          hide-details
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Date de début *</div>
        <VTextField v-model="form.start_date" type="date" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Date de fin *</div>
        <VTextField v-model="form.end_date" type="date" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Fin inscriptions</div>
        <VTextField v-model="form.registration_deadline" type="date" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Statut *</div>
        <VSelect
          v-model="form.status"
          :items="statusOptions"
          item-title="label"
          item-value="value"
          variant="outlined"
          density="compact"
          hide-details
        />
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
      Voulez-vous vraiment supprimer la session
      <strong>{{ examASupprimer?.title }}</strong> ?
    </p>

    <template #actions>
      <VBtn variant="outlined" @click="dialogSupprimer = false">Annuler</VBtn>
      <VBtn color="error" :loading="loading" @click="supprimerExam">Supprimer</VBtn>
    </template>
  </AppModal>
</template>
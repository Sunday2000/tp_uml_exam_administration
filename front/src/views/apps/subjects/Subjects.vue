<script setup lang="ts">
import { useClasses } from '@/composables/useClasses'
import { useSubjects } from '@/composables/useSubject'
import type { Subject, SubjectType } from '@/interfaces/subjects'
import AppTable from '@/layouts/AppTable.vue'
import AppModal from '@/views/components/modal/AppModal.vue'
import SubjectAffectationForm from './components/SubjectAffectationForm.vue'
import SubjectAffectationTable from './components/SubjectAffectationTable.vue'
import SubjectFormModal from './components/SubjectFormModal.vue'

// ─── Composables ──────────────────────────────────────────────────────────────
const {
  subjects, loading, error,
  fetchAll, create, update, remove, createSpecialitySubject,
  formatAffectations, buildOptionsSpecialites, buildAffectationsFiltrees, buildTotalCoeff,
} = useSubjects()

const { classes, fetchAll: fetchClasses } = useClasses()

onMounted(() => { fetchAll(); fetchClasses() })

// ─── Onglets ──────────────────────────────────────────────────────────────────
const activeTab = ref<'referentiel' | 'affectations'>('referentiel')

const columns = [
  { key: 'label',        label: 'Intitulé' },
  { key: 'code',         label: 'Code' },
  { key: 'type',         label: 'Type' },
  { key: 'affectations', label: 'Affectations' },
  { key: 'actions',      label: 'Actions', align: 'end' as const },
]

const typeColor: Record<SubjectType, string> = {
  Ecrit: 'primary', Orale: 'success', Pratique: 'warning',
}

// ─── Recherche ────────────────────────────────────────────────────────────────
const recherche = ref('')
const subjectsFiltres = computed(() =>
  subjects.value.filter(s =>
    (s.label ?? '').toLowerCase().includes(recherche.value.toLowerCase()) ||
    (s.code ?? '').toLowerCase().includes(recherche.value.toLowerCase()),
  ),
)

// ─── Modal ajouter/modifier ───────────────────────────────────────────────────
const dialogForm    = ref(false)
const subjectEnEdit = ref<Subject | null>(null)

const ouvrirAjouter  = () => { subjectEnEdit.value = null; dialogForm.value = true }
const ouvrirModifier = (s: Subject) => { subjectEnEdit.value = s; dialogForm.value = true }

const onSave = async (payload: { label: string; code: string; type: SubjectType }) => {
  if (subjectEnEdit.value) await update(subjectEnEdit.value.id, payload)
  else await create(payload)
  dialogForm.value = false
}

// ─── Suppression ─────────────────────────────────────────────────────────────
const dialogSuppr   = ref(false)
const subjectASuppr = ref<Subject | null>(null)

const confirmerSuppression = (s: Subject) => { subjectASuppr.value = s; dialogSuppr.value = true }
const supprimerSubject = async () => {
  if (subjectASuppr.value) await remove(subjectASuppr.value.id)
  dialogSuppr.value = false; subjectASuppr.value = null
}

// ─── Affectations ─────────────────────────────────────────────────────────────
const filtreSpecialite     = ref('')
const optionsSpecialites   = computed(() => buildOptionsSpecialites(subjects.value))
const affectationsFiltrees = computed(() => buildAffectationsFiltrees(subjects.value, filtreSpecialite.value))
const affectationsGlobal   = computed(() => buildAffectationsFiltrees(subjects.value, ''))
const totalCoeffGlobal     = computed(() => buildTotalCoeff(affectationsGlobal.value))

const onAffecter = async (payload: { grade_id: number; serie_id: number; subject_id: number; coefficient: number }) => {
  await createSpecialitySubject(payload)
  if (!error.value) await fetchAll()
}

const onUpdateCoeff = async ({ subject, speciality, newCoeff }: { subject: Subject; speciality: any; newCoeff: number }) => {
  await update(subject.id, {
    label: subject.label, code: subject.code, type: subject.type,
    specialities: [{ grade_id: speciality.grade_id, serie_id: speciality.serie_id, coefficient: newCoeff, code: speciality.code }],
  })
  await fetchAll()
}

// ─── Import Excel ─────────────────────────────────────────────────────────────
const dialogImport = ref(false)
const fichierExcel = ref<File | null>(null)
const isDragOver   = ref(false)

const onFileChange = (e: Event) => {
  const t = e.target as HTMLInputElement
  if (t.files?.length) fichierExcel.value = t.files[0]
}
const onDrop = (e: DragEvent) => {
  isDragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) fichierExcel.value = file
}
const importerExcel = async () => {
  if (!fichierExcel.value) return
  console.log('TODO: import', fichierExcel.value.name)
  dialogImport.value = false; fichierExcel.value = null
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h1 class="text-h5 font-weight-bold">Gestion des matières</h1>
      <p class="text-body-2 text-medium-emphasis mt-1 mb-0">
        US11 à US15 — CRUD matières + affectation à une série d'une classe avec coefficient
      </p>
    </VCol>

    <VCol v-if="error" cols="12">
      <VAlert type="error" variant="tonal" closable>{{ error }}</VAlert>
    </VCol>

    <!-- Onglets -->
    <VCol cols="12">
      <div class="d-flex gap-2">
        <VBtn
          v-for="tab in [{ key: 'referentiel', label: 'Référentiel' }, { key: 'affectations', label: 'Affectations' }]"
          :key="tab.key"
          :variant="activeTab === tab.key ? 'flat' : 'outlined'"
          :color="activeTab === tab.key ? 'primary' : 'default'"
          size="small" class="text-none"
          @click="activeTab = tab.key as any"
        >
          {{ tab.label }}
        </VBtn>
      </div>
    </VCol>

    <!-- Référentiel -->
    <template v-if="activeTab === 'referentiel'">
      <VCol cols="12" class="d-flex align-center justify-space-between gap-3 flex-wrap">
        <VTextField
          v-model="recherche" placeholder="Rechercher une matière..."
          prepend-inner-icon="mdi-magnify" variant="outlined"
          density="compact" hide-details style="max-width: 300px;"
        />
        <div class="d-flex gap-2">
          <VBtn variant="outlined" class="text-none" @click="dialogImport = true">Import Excel</VBtn>
          <VBtn color="#1a3a6b" prepend-icon="mdi-plus" class="text-none" @click="ouvrirAjouter">Ajouter</VBtn>
        </div>
      </VCol>

      <VCol cols="12">
        <div v-if="loading && !subjects.length" class="d-flex justify-center py-10">
          <VProgressCircular indeterminate color="primary" />
        </div>
        <AppTable v-else title="Liste des matières" :columns="columns" :items="subjectsFiltres" :count="subjectsFiltres.length">
          <template #cell-label="{ item }"><span class="text-body-2 font-weight-bold">{{ item.label }}</span></template>
          <template #cell-code="{ item }"><span class="text-body-2 text-medium-emphasis">{{ item.code }}</span></template>
          <template #cell-type="{ item }">
            <VChip size="small" :color="typeColor[item.type as SubjectType]" variant="tonal">{{ item.type }}</VChip>
          </template>
          <template #cell-affectations="{ item }">
            <span class="text-body-2 text-medium-emphasis">{{ formatAffectations(item) }}</span>
          </template>
          <template #cell-actions="{ item }">
            <div class="d-flex gap-2 justify-end">
              <VBtn size="small" variant="outlined" @click.stop="ouvrirModifier(item)">Modifier</VBtn>
              <VBtn size="small" variant="outlined" color="error" @click.stop="confirmerSuppression(item)">Suppr.</VBtn>
            </div>
          </template>
        </AppTable>
      </VCol>
    </template>

    <!-- Affectations -->
    <template v-else>
      <VCol cols="12" md="5">
        <SubjectAffectationForm :subjects="subjects" :classes="classes" :loading="loading" @affecter="onAffecter" />
      </VCol>
      <VCol cols="12" md="7">
        <SubjectAffectationTable
          :filtre-specialite="filtreSpecialite"
          @update:filtreSpecialite="filtreSpecialite = $event"
          :affectations-filtrees="affectationsFiltrees"
          :options-specialites="optionsSpecialites"
          :total-coeff-global="totalCoeffGlobal"
          :loading="loading"
          @update-coeff="onUpdateCoeff"
        />
      </VCol>
    </template>
  </VRow>

  <!-- Modals -->
  <SubjectFormModal v-model="dialogForm" :subject="subjectEnEdit" :loading="loading" @save="onSave" />

  <AppModal v-model="dialogSuppr" title="Confirmer la suppression" :max-width="440" @close="dialogSuppr = false">
    <p class="text-body-1">Voulez-vous vraiment supprimer <strong>{{ subjectASuppr?.label }}</strong> ?</p>
    <template #actions>
      <VBtn variant="outlined" @click="dialogSuppr = false">Annuler</VBtn>
      <VBtn color="error" :loading="loading" @click="supprimerSubject">Supprimer</VBtn>
    </template>
  </AppModal>

  <AppModal v-model="dialogImport" title="Importer le référentiel (Excel)" :max-width="540" @close="dialogImport = false; fichierExcel = null">
    <div
      class="upload-zone rounded-lg pa-8 text-center mb-4"
      :class="{ 'upload-zone--active': isDragOver }"
      @dragover.prevent="isDragOver = true" @dragleave="isDragOver = false"
      @drop.prevent="onDrop" @click="($refs.excelInput as HTMLInputElement)?.click()"
    >
      <VIcon icon="mdi-arrow-up" size="36" color="primary" class="mb-2" />
      <p class="text-body-2 text-medium-emphasis mb-0">
        Glissez votre fichier Excel ici ou <span class="text-primary" style="cursor:pointer;">parcourez</span>
      </p>
      <p v-if="fichierExcel" class="text-body-2 font-weight-semibold text-primary mt-2 mb-0">{{ fichierExcel.name }}</p>
      <input ref="excelInput" type="file" accept=".xlsx,.xls,.csv" hidden @change="onFileChange" />
    </div>
    <VAlert type="info" variant="tonal" density="compact">
      <strong>Format :</strong> Intitulé | Code | Type | Classe | Série | Coefficient
    </VAlert>
    <template #actions>
      <VBtn variant="outlined" @click="dialogImport = false; fichierExcel = null">Annuler</VBtn>
      <VBtn color="#1a3a6b" :disabled="!fichierExcel" :loading="loading" @click="importerExcel">Importer</VBtn>
    </template>
  </AppModal>
</template>

<style scoped>
.upload-zone { border: 2px dashed #c5cad3; background: #f9fafb; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
.upload-zone:hover, .upload-zone--active { border-color: #1a3a6b; background: #f0f4ff; }
</style>
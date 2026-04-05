<script setup lang="ts">
import { useExams } from '@/composables/useExam'
import { useStudents } from '@/composables/useStudent'
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const { subscriptions, loading: loadingSubscriptions, error: subscriptionError, fetchSchoolSubscriptions } = useExams()
const { importStudents, loading: importLoading, error: importError } = useStudents()

const props = withDefaults(defineProps<{ embedded?: boolean }>(), {
  embedded: false,
})

const emit = defineEmits<{
  close: []
  success: []
}>()

interface SessionOption {
  value: number
  label: string
  specialites: { value: number; label: string }[]
}

const schoolId = computed(() => Number(authStore.session?.user?.school_id ?? 0))

onMounted(async () => {
  if (schoolId.value)
    await fetchSchoolSubscriptions(schoolId.value)
})

const sessionOptions = computed<SessionOption[]>(() =>
  subscriptions.value
    .map((row: any) => ({
      value: Number(row?.id),
      label: row?.exam?.title || `Examen #${row?.exam_id ?? row?.id}`,
      specialites: (row?.exam?.specialities ?? []).map((spec: any) => ({
        value: Number(spec.id),
        label: spec.code || spec.grade?.label || spec.serie?.label || `Specialite ${spec.id}`,
      })),
    }))
    .filter(option => Number.isFinite(option.value) && option.value > 0),
)

// Étapes
const etape = ref(1)
const selectedSession = ref<number | null>(null)
const selectedSpecialite = ref<number | null>(null)
const fichier = ref<File | null>(null)
const isDragging = ref(false)

const specialiteOptions = computed(() =>
  sessionOptions.value.find(session => session.value === selectedSession.value)?.specialites ?? [],
)

const mettreAJourEtape = () => {
  if (selectedSession.value && selectedSpecialite.value) {
    etape.value = Math.max(etape.value, 2)
  }
}

const onSessionChange = () => {
  selectedSpecialite.value = null
  importSummary.value = null
  mettreAJourEtape()
}

interface ImportSummary {
  total_rows: number
  created_students: number
  reused_users: number
  errors: { line: string | number; message: string }[]
}

const importSummary = ref<ImportSummary | null>(null)
const hasErrors = computed(() => Boolean(importSummary.value?.errors?.length))

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    fichier.value = target.files[0]
    etape.value = Math.max(etape.value, 3)
    importSummary.value = null
  }
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files?.length) {
    fichier.value = e.dataTransfer.files[0]
    etape.value = Math.max(etape.value, 3)
    importSummary.value = null
  }
}

const confirmerImport = async () => {
  if (!selectedSession.value || !selectedSpecialite.value || !fichier.value)
    return

  const result = await importStudents({
    exam_school_id: selectedSession.value,
    speciality_id: selectedSpecialite.value,
    file: fichier.value,
  })

  if (!result) return

  importSummary.value = {
    total_rows: Number(result.total_rows ?? 0),
    created_students: Number(result.created_students ?? 0),
    reused_users: Number(result.reused_users ?? 0),
    errors: Array.isArray(result.errors) ? result.errors : [],
  }

  etape.value = 4

  if (!importSummary.value.errors.length) {
    if (props.embedded) {
      emit('success')
      return
    }
    router.push({ name: 'apps-school-student-list' })
  }
}

const annulerImport = () => {
  if (props.embedded) {
    emit('close')
    return
  }
  router.push({ name: 'apps-school-student-list' })
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard elevation="0" border rounded="lg">
        <VCardText class="pa-6">
          <!-- Étape 1: Sélection session -->
          <div class="mb-6">
            <div class="d-flex align-center gap-2 mb-3">
              <VAvatar :color="etape >= 1 ? '#1a3a6b' : '#ccc'" size="28">
                <span class="text-white text-caption font-weight-bold">1</span>
              </VAvatar>
              <span class="text-subtitle-2 font-weight-bold">Sélectionner la session d'examen</span>
            </div>
            <VSelect
              v-model="selectedSession"
              :items="sessionOptions"
              item-title="label"
              item-value="value"
              placeholder="-- Sélectionner une session --"
              variant="outlined"
              density="compact"
              hide-details
              style="max-width: 400px;"
              @update:model-value="onSessionChange"
            />

            <VSelect
              v-model="selectedSpecialite"
              :items="specialiteOptions"
              item-title="label"
              item-value="value"
              placeholder="-- Sélectionner la spécialité de l'import --"
              variant="outlined"
              density="compact"
              hide-details
              class="mt-3"
              style="max-width: 400px;"
              :disabled="!selectedSession"
              @update:model-value="mettreAJourEtape"
            />

            <VAlert v-if="subscriptionError" type="error" variant="tonal" density="compact" class="mt-3" border="start">
              {{ subscriptionError }}
            </VAlert>
          </div>

          <!-- Étape 2: Télécharger modèle -->
          <div v-if="etape >= 2" class="mb-6">
            <div class="d-flex align-center gap-2 mb-3">
              <VAvatar :color="etape >= 2 ? '#1a3a6b' : '#ccc'" size="28">
                <span class="text-white text-caption font-weight-bold">2</span>
              </VAvatar>
              <span class="text-subtitle-2 font-weight-bold">Télécharger le modèle Excel</span>
            </div>
            <VAlert type="info" variant="tonal" density="compact" class="mb-3" border="start">
              L'import se fait par spécialité. Sélection actuelle:
              <strong>{{ specialiteOptions.find(item => item.value === selectedSpecialite)?.label }}</strong>
            </VAlert>
            <VBtn variant="outlined" color="#1a3a6b" prepend-icon="mdi-download" class="text-none" @click="etape = Math.max(etape, 3)">
              Télécharger le modèle
            </VBtn>
          </div>

          <!-- Étape 3: Upload -->
          <div v-if="etape >= 3" class="mb-6">
            <div class="d-flex align-center gap-2 mb-3">
              <VAvatar :color="etape >= 3 ? '#1a3a6b' : '#ccc'" size="28">
                <span class="text-white text-caption font-weight-bold">3</span>
              </VAvatar>
              <span class="text-subtitle-2 font-weight-bold">Uploader le fichier complété</span>
            </div>
            <div
              class="drop-zone rounded-lg pa-8 text-center"
              :class="{ 'drop-zone--active': isDragging }"
              @dragover.prevent="isDragging = true"
              @dragleave="isDragging = false"
              @drop.prevent="onDrop"
            >
              <VIcon icon="mdi-cloud-upload" size="40" color="#1a3a6b" class="mb-2" />
              <div class="text-body-2 text-medium-emphasis mb-2">
                Glissez-déposez votre fichier ici ou
              </div>
              <VBtn size="small" color="#1a3a6b" class="text-none" @click="($refs.fileInput as HTMLInputElement)?.click()">
                Parcourir
              </VBtn>
              <input ref="fileInput" type="file" accept=".xlsx,.xls,.csv" hidden @change="onFileChange" />
              <div v-if="fichier" class="text-body-2 mt-3 font-weight-semibold text-primary">
                {{ fichier.name }}
              </div>
            </div>
          </div>

          <!-- Étape 4: Résultat -->
          <div v-if="etape >= 3 && fichier">
            <div class="d-flex align-center gap-2 mb-3">
              <VAvatar :color="'#1a3a6b'" size="28">
                <span class="text-white text-caption font-weight-bold">4</span>
              </VAvatar>
              <span class="text-subtitle-2 font-weight-bold">Traitement de l'import</span>
            </div>

            <VAlert v-if="importError" type="error" variant="tonal" density="compact" class="mb-3">
              {{ importError }}
            </VAlert>

            <VAlert v-if="importSummary" :type="hasErrors ? 'warning' : 'success'" variant="tonal" density="compact" class="mb-3">
              Lignes lues: <strong>{{ importSummary.total_rows }}</strong> |
              Etudiants crees: <strong>{{ importSummary.created_students }}</strong> |
              Utilisateurs existants reutilises: <strong>{{ importSummary.reused_users }}</strong>
            </VAlert>

            <VTable v-if="importSummary && hasErrors">
              <thead>
                <tr style="background: #f5f4ef;">
                  <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Ligne</th>
                  <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-5 py-3">Message</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in importSummary.errors" :key="`${row.line}-${index}`">
                  <td class="ps-5 py-3">{{ row.line }}</td>
                  <td class="ps-5 py-3">{{ row.message }}</td>
                </tr>
              </tbody>
            </VTable>

            <div class="d-flex justify-end gap-3 mt-4">
              <VBtn variant="outlined" @click="annulerImport">Annuler</VBtn>
              <VBtn
                color="#1a3a6b"
                :loading="importLoading || loadingSubscriptions"
                :disabled="!selectedSession || !selectedSpecialite || !fichier || loadingSubscriptions"
                @click="confirmerImport"
              >
                Confirmer l'import
              </VBtn>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.drop-zone {
  border: 2px dashed #c5cad3;
  background: #f9fafb;
  transition: border-color 0.2s, background 0.2s;
}

.drop-zone--active {
  border-color: #1a3a6b;
  background: #eef3fa;
}
</style>

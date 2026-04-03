<script setup lang="ts">
import type { Grade } from '@/interfaces/grade';
import type { Subject, SubjectType } from '@/interfaces/subjects';

const props = defineProps<{
  subjects: Subject[]
  classes: Grade[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'affecter', payload: { grade_id: number; serie_id: number; subject_id: number; coefficient: number }): void
}>()

const form = reactive({
  grade_id:    null as number | null,
  serie_id:    null as number | null,
  subject_id:  null as number | null,
  coefficient: null as number | null,
  type:        'Ecrit' as SubjectType,
})

const seriesDeLaClasse = computed(() => {
  if (!form.grade_id) return []
  const classe = props.classes.find(c => c.id === form.grade_id)
  return classe?.specialities?.map((sp: any) => sp.serie).filter(Boolean) ?? []
})

watch(() => form.grade_id, () => {
  form.serie_id  = null
  form.subject_id = null
})

const canSubmit = computed(() =>
  !!form.grade_id && !!form.serie_id && !!form.subject_id && form.coefficient !== null,
)

const affecter = () => {
  if (!canSubmit.value) return
  emit('affecter', {
    grade_id:    form.grade_id!,
    serie_id:    form.serie_id!,
    subject_id:  form.subject_id!,
    coefficient: form.coefficient!,
  })
  Object.assign(form, { grade_id: null, serie_id: null, subject_id: null, coefficient: null, type: 'Ecrit' })
}
</script>

<template>
  <VCard elevation="0" border rounded="lg">
    <VCardText class="pa-5">
      <h3 class="text-subtitle-1 font-weight-bold mb-4">Affecter une matière</h3>

      <VAlert type="info" variant="tonal" density="compact" class="mb-4">
        Sélectionnez une <strong>classe → série → matière</strong> → définissez le <strong>coefficient</strong>.
      </VAlert>

      <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Classe</div>
      <VSelect
        v-model="form.grade_id"
        :items="classes.map(c => ({ title: c.label, value: c.id }))"
        placeholder="— Choisir —"
        variant="outlined" density="compact" hide-details class="mb-4"
      />

      <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Série (de cette classe)</div>
      <VSelect
        v-model="form.serie_id"
        :items="seriesDeLaClasse.map((s: any) => ({ title: `Série ${s?.label ?? '?'}`, value: s?.id }))"
        :placeholder="form.grade_id ? '— Choisir —' : '— Choisir d\'abord une classe —'"
        :disabled="!form.grade_id"
        variant="outlined" density="compact" hide-details class="mb-4"
      />

      <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Matière</div>
      <VSelect
        v-model="form.subject_id"
        :items="subjects.map(s => ({ title: s.label, value: s.id }))"
        placeholder="— Choisir —"
        variant="outlined" density="compact" hide-details class="mb-4"
      />

      <VRow dense class="mb-4">
        <VCol cols="6">
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Coefficient</div>
          <VTextField v-model.number="form.coefficient" placeholder="Ex: 5" type="number" variant="outlined" density="compact" hide-details />
        </VCol>
        <VCol cols="6">
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Type</div>
          <VSelect v-model="form.type" :items="['Ecrit', 'Orale', 'Pratique']" variant="outlined" density="compact" hide-details />
        </VCol>
      </VRow>

      <VBtn block color="#1a3a6b" prepend-icon="mdi-plus" :loading="loading" :disabled="!canSubmit" @click="affecter">
        Affecter la matière
      </VBtn>
    </VCardText>
  </VCard>
</template>
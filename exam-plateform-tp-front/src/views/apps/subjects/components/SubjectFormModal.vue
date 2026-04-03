<script setup lang="ts">
import type { Subject, SubjectType } from '@/interfaces/subjects';
import AppModal from '@/views/components/modal/AppModal.vue';

const props = defineProps<{
  modelValue: boolean
  subject: Subject | null // null = mode ajout
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'save', payload: { label: string; code: string; type: SubjectType }): void
}>()

const form = reactive({ label: '', code: '', type: 'Ecrit' as SubjectType })

// Pré-remplir en mode édition
watch(() => props.modelValue, (open) => {
  if (open && props.subject)
    Object.assign(form, { label: props.subject.label, code: props.subject.code, type: props.subject.type })
  else if (open)
    Object.assign(form, { label: '', code: '', type: 'Ecrit' })
})

const enregistrer = () => {
  if (!form.label || !form.code) return
  emit('save', { label: form.label, code: form.code, type: form.type })
}
</script>

<template>
  <AppModal
    :model-value="modelValue"
    :title="subject ? 'Modifier une matière' : 'Ajouter une matière'"
    :max-width="560"
    @update:model-value="emit('update:modelValue', $event)"
    @close="emit('update:modelValue', false)"
  >
    <VRow>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Intitulé *</div>
        <VTextField v-model="form.label" placeholder="Ex: Informatique" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Code *</div>
        <VTextField v-model="form.code" placeholder="Ex: INFO" variant="outlined" density="compact" hide-details />
      </VCol>
      <VCol cols="12">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Type d'épreuve *</div>
        <VSelect v-model="form.type" :items="['Ecrit', 'Orale', 'Pratique']" variant="outlined" density="compact" hide-details />
      </VCol>
    </VRow>

    <VAlert type="warning" variant="tonal" class="mt-4" density="compact">
      Le coefficient est défini lors de l'affectation à une série d'une classe.
    </VAlert>

    <template #actions>
      <VBtn variant="outlined" @click="emit('update:modelValue', false)">Annuler</VBtn>
      <VBtn color="#1a3a6b" :loading="loading" @click="enregistrer">Enregistrer</VBtn>
    </template>
  </AppModal>
</template>
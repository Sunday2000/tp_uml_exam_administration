<script setup lang="ts">
import type { Subject, SubjectType } from '@/interfaces/subjects';
import AppModal from '@/views/components/modal/AppModal.vue';

const props = defineProps<{
  affectationsFiltrees: { subject: Subject; speciality: any }[]
  optionsSpecialites: { title: string; grade_id: number; serie_id: number }[]
  filtreSpecialite: string
  totalCoeffGlobal: number
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update-coeff', payload: { subject: Subject; speciality: any; newCoeff: number }): void
  (e: 'update:filtreSpecialite', value: string): void
}>()

const localFiltre = computed({
  get: () => props.filtreSpecialite,
  set: (val) => emit('update:filtreSpecialite', val),
})

const affichees = computed(() => props.affectationsFiltrees ?? [])

const totalCoeff = computed(() =>
  affichees.value.reduce((acc, aff) => acc + (aff.speciality.coefficient ?? 0), 0)
)

const totalCoeffGlobal = computed(() => props.totalCoeffGlobal)

watch(() => props.optionsSpecialites, (options) => {
  if (options.length > 0 && !props.filtreSpecialite) {
    const firstOption = options[0]
    emit('update:filtreSpecialite', `${firstOption.grade_id}-${firstOption.serie_id}`)
  }
}, { immediate: true })
const typeColor: Record<SubjectType, string> = {
  Ecrit: 'primary', Orale: 'success', Pratique: 'warning',
}

// Modal modifier coefficient
const dialogCoeff  = ref(false)
const affEnEdit    = ref<{ subject: Subject; speciality: any } | null>(null)
const nouveauCoeff = ref<number | null>(null)

const ouvrirCoeff = (aff: { subject: Subject; speciality: any }) => {
  affEnEdit.value   = aff
  nouveauCoeff.value = aff.speciality.coefficient
  dialogCoeff.value  = true
}

const enregistrerCoeff = () => {
  if (!affEnEdit.value || nouveauCoeff.value === null) return
  emit('update-coeff', { ...affEnEdit.value, newCoeff: nouveauCoeff.value })
  dialogCoeff.value = false
}

</script>

<template>
  <VCard elevation="0" border rounded="lg">
    <VCardText class="pa-5">
      <h3 class="text-subtitle-1 font-weight-bold mb-4">Affectations existantes</h3>

      <VSelect
        v-model="localFiltre"
        :items="optionsSpecialites.map(o => ({ title: o.title, value: `${o.grade_id}-${o.serie_id}` }))"
        placeholder="— Choisir une classe / série —"
        variant="outlined" density="compact" hide-details class="mb-4"
      />

      <VTable>
        <thead>
          <tr style="background: #f5f4ef;">
            <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis ps-4 py-3">Matière</th>
            <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis py-3">Type</th>
            <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis py-3">Coeff.</th>
            <th class="text-uppercase text-caption font-weight-bold text-medium-emphasis pe-4 py-3 text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aff in affichees" :key="aff.subject.id">
            <td class="ps-4 py-3"><span class="text-body-2 font-weight-semibold text-primary">{{ aff.subject.label }}</span></td>
            <td class="py-3">
              <VChip size="small" :color="typeColor[aff.subject.type]" variant="tonal">{{ aff.subject.type }}</VChip>
            </td>
            <td class="py-3"><span class="text-body-2 font-weight-bold">{{ aff.speciality.coefficient }}</span></td>
            <td class="pe-4 py-3 text-end">
              <VBtn size="small" variant="outlined" class="text-none" @click="ouvrirCoeff(aff)">Coeff.</VBtn>
            </td>
          </tr>
          <tr v-if="!affichees.length">
            <td colspan="4" class="text-center text-medium-emphasis py-6 text-body-2">Aucune affectation.</td>
          </tr>
        </tbody>
        <tfoot v-if="affichees.length">
          <tr style="background: #f5f4ef;">
            <td colspan="2" class="ps-4 py-3 text-caption font-weight-bold text-medium-emphasis text-uppercase">Total coefficients</td>
            <td colspan="2" class="pe-4 py-3 text-end">
              <span class="text-primary font-weight-bold">{{ totalCoeff }} / {{ totalCoeffGlobal }}</span>
            </td>
          </tr>
        </tfoot>
      </VTable>
    </VCardText>
  </VCard>

  <!-- Modal modifier coefficient -->
  <AppModal v-model="dialogCoeff" title="Modifier le coefficient" :max-width="440" @close="dialogCoeff = false">
    <p v-if="affEnEdit" class="text-body-2 text-medium-emphasis mb-4">
      {{ affEnEdit.subject.label }} — {{ affEnEdit.speciality.grade?.label }} Série {{ affEnEdit.speciality.serie?.label }}
    </p>
    <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Nouveau coefficient</div>
    <VTextField v-model.number="nouveauCoeff" type="number" variant="outlined" density="compact" hide-details />
    <template #actions>
      <VBtn variant="outlined" @click="dialogCoeff = false">Annuler</VBtn>
      <VBtn color="#1a3a6b" :loading="loading" @click="enregistrerCoeff">Enregistrer</VBtn>
    </template>
  </AppModal>
</template>
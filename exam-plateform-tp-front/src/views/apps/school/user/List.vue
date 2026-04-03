<script setup lang="ts">
import type { UserPayload } from '@/api/users'
import { useUsers } from '@/composables/useUsers'
import AppTable from '@/layouts/AppTable.vue'
import { useAuthStore } from '@/stores/auth'
import AppModal from '@/views/components/modal/AppModal.vue'

const authStore = useAuthStore()
const { users, loading, error, fetchAll, create, update, remove } = useUsers()

onMounted(() => fetchAll())

const schoolId = computed(() => {
  const value = Number(authStore.session?.user?.school_id)
  return Number.isFinite(value) && value > 0 ? value : null
})

const columns = [
  { key: 'utilisateur', label: 'Utilisateur' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Rôle' },
  { key: 'statut', label: 'Statut' },
  { key: 'actions', label: 'Actions', align: 'end' as const },
]

const recherche = ref('')

const usersEcole = computed(() =>
  users.value.filter(user => {
    if (!schoolId.value)
      return true

    return Number(user.school?.id) === schoolId.value
  }),
)

const usersFiltres = computed(() =>
  usersEcole.value.filter(user => {
    const q = recherche.value.toLowerCase().trim()
    if (!q)
      return true

    return user.name.toLowerCase().includes(q)
      || user.firstname.toLowerCase().includes(q)
      || user.email.toLowerCase().includes(q)
  }),
)

const dialog = ref(false)
const modeEdition = ref(false)
const idEnEdition = ref<number | null>(null)

const form = reactive({
  name: '',
  firstname: '',
  email: '',
  phone_number: '',
  is_active: true,
  password: '',
  password_confirmation: '',
})

const erreurs = reactive({
  name: '',
  firstname: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const resetForm = () => {
  Object.assign(form, {
    name: '',
    firstname: '',
    email: '',
    phone_number: '',
    is_active: true,
    password: '',
    password_confirmation: '',
  })
  Object.assign(erreurs, {
    name: '',
    firstname: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  idEnEdition.value = null
}

const ouvrirCreer = () => {
  modeEdition.value = false
  resetForm()
  dialog.value = true
}

const ouvrirModifier = (user: typeof users.value[number]) => {
  modeEdition.value = true
  idEnEdition.value = user.id
  Object.assign(form, {
    name: user.name,
    firstname: user.firstname,
    email: user.email,
    phone_number: user.phone_number ?? '',
    is_active: user.is_active,
    password: '',
    password_confirmation: '',
  })
  Object.assign(erreurs, {
    name: '',
    firstname: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  dialog.value = true
}

const validerForm = () => {
  let ok = true
  Object.assign(erreurs, {
    name: '',
    firstname: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  if (!form.name.trim()) {
    erreurs.name = 'Champ requis'
    ok = false
  }

  if (!form.firstname.trim()) {
    erreurs.firstname = 'Champ requis'
    ok = false
  }

  if (!form.email.trim()) {
    erreurs.email = 'Champ requis'
    ok = false
  }
  else if (!/\S+@\S+\.\S+/.test(form.email)) {
    erreurs.email = 'Email invalide'
    ok = false
  }

  if (!modeEdition.value) {
    if (!form.password || form.password.length < 8) {
      erreurs.password = 'Minimum 8 caractères'
      ok = false
    }

    if (form.password !== form.password_confirmation) {
      erreurs.password_confirmation = 'Ne correspondent pas'
      ok = false
    }
  }

  return ok
}

const enregistrer = async () => {
  if (!validerForm())
    return

  const payload: UserPayload = {
    name: form.name.trim(),
    firstname: form.firstname.trim(),
    email: form.email.trim(),
    phone_number: form.phone_number.trim() || null,
    is_active: form.is_active,
    role: 'Ecole',
    ...(form.password
      ? {
          password: form.password,
          password_confirmation: form.password_confirmation,
        }
      : {}),
  }

  if (modeEdition.value && idEnEdition.value !== null)
    await update(idEnEdition.value, payload)
  else
    await create(payload)

  if (!error.value) {
    dialog.value = false
    resetForm()
  }
}

const dialogSuppression = ref(false)
const idASupprimer = ref<number | null>(null)
const nomASupprimer = ref('')

const demanderSuppression = (user: typeof users.value[number]) => {
  idASupprimer.value = user.id
  nomASupprimer.value = `${user.firstname} ${user.name}`
  dialogSuppression.value = true
}

const confirmerSuppression = async () => {
  if (idASupprimer.value !== null)
    await remove(idASupprimer.value)

  dialogSuppression.value = false
}

const initiales = (firstname: string, name: string) =>
  `${(firstname || '?')[0]}${(name || '?')[0]}`.toUpperCase()

const couleurAvatar = (name: string) => {
  const palette = ['#1565c0', '#2e7d32', '#e65100', '#6a1b9a', '#00695c', '#c62828', '#0277bd']
  return palette[(name?.charCodeAt(0) || 0) % palette.length]
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <div class="d-flex align-center justify-space-between flex-wrap gap-3">
        <div>
          <h1 class="text-h5 font-weight-bold">Utilisateurs de l'école</h1>
          <p class="text-body-2 text-medium-emphasis mt-1 mb-0">Comptes et droits d'accès</p>
        </div>
        <VBtn color="#1a3a6b" prepend-icon="mdi-plus" @click="ouvrirCreer">
          + Créer un utilisateur
        </VBtn>
      </div>
    </VCol>

    <VCol v-if="error" cols="12">
      <VAlert type="error" variant="tonal" closable>{{ error }}</VAlert>
    </VCol>

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

    <VCol cols="12">
      <AppTable
        title="Liste des utilisateurs"
        :columns="columns"
        :items="usersFiltres"
        :count="usersFiltres.length"
        :loading="loading"
      >
        <template #cell-utilisateur="{ item }">
          <div class="d-flex align-center gap-3">
            <div
              class="rounded-circle d-flex align-center justify-center text-white text-caption font-weight-bold flex-shrink-0"
              :style="{ width: '36px', height: '36px', background: couleurAvatar(item.name) }"
            >
              {{ initiales(item.firstname, item.name) }}
            </div>
            <div>
              <div class="text-body-2 font-weight-semibold">{{ item.name }} {{ item.firstname }}</div>
              <div v-if="item.phone_number" class="text-caption text-medium-emphasis">{{ item.phone_number }}</div>
            </div>
          </div>
        </template>

        <template #cell-email="{ item }">
          <span class="text-body-2 text-medium-emphasis">{{ item.email }}</span>
        </template>

        <template #cell-role>
          <VChip size="small" color="warning" variant="tonal">
            École
          </VChip>
        </template>

        <template #cell-statut="{ item }">
          <VChip size="small" :color="item.is_active ? 'success' : 'error'" variant="tonal">
            <VIcon start icon="mdi-circle" size="8" />
            {{ item.is_active ? 'Actif' : 'Inactif' }}
          </VChip>
        </template>

        <template #cell-actions="{ item }">
          <div class="d-flex gap-2 justify-end">
            <VBtn size="small" variant="outlined" @click="ouvrirModifier(item)">Modifier</VBtn>
            <VBtn size="small" variant="outlined" color="error" @click="demanderSuppression(item)">Suppr.</VBtn>
          </div>
        </template>
      </AppTable>
    </VCol>
  </VRow>

  <AppModal
    v-model="dialog"
    :title="modeEdition ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'"
    :max-width="580"
    @close="dialog = false; resetForm()"
  >
    <VRow>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Prénom *</div>
        <VTextField
          v-model="form.firstname"
          placeholder="Prénom"
          variant="outlined"
          density="compact"
          hide-details="auto"
          :error-messages="erreurs.firstname"
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Nom *</div>
        <VTextField
          v-model="form.name"
          placeholder="NOM"
          variant="outlined"
          density="compact"
          hide-details="auto"
          :error-messages="erreurs.name"
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Email *</div>
        <VTextField
          v-model="form.email"
          placeholder="email@ecole.bj"
          type="email"
          variant="outlined"
          density="compact"
          hide-details="auto"
          :error-messages="erreurs.email"
        />
      </VCol>
      <VCol cols="12" sm="6">
        <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Téléphone</div>
        <VTextField
          v-model="form.phone_number"
          placeholder="+229 XX XX XX XX"
          variant="outlined"
          density="compact"
          hide-details="auto"
        />
      </VCol>
      <template v-if="!modeEdition">
        <VCol cols="12" sm="6">
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Mot de passe *</div>
          <VTextField
            v-model="form.password"
            placeholder="Min. 8 caractères"
            type="password"
            variant="outlined"
            density="compact"
            hide-details="auto"
            :error-messages="erreurs.password"
          />
        </VCol>
        <VCol cols="12" sm="6">
          <div class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2">Confirmation *</div>
          <VTextField
            v-model="form.password_confirmation"
            placeholder="Répéter le mot de passe"
            type="password"
            variant="outlined"
            density="compact"
            hide-details="auto"
            :error-messages="erreurs.password_confirmation"
          />
        </VCol>
      </template>
      <VCol cols="12" sm="6" class="d-flex align-center pt-6">
        <VSwitch
          v-model="form.is_active"
          label="Compte actif"
          color="#1a3a6b"
          hide-details
          density="compact"
        />
      </VCol>
      <VCol v-if="error" cols="12">
        <VAlert type="error" variant="tonal" density="compact">{{ error }}</VAlert>
      </VCol>
    </VRow>

    <template #actions>
      <VBtn variant="outlined" @click="dialog = false; resetForm()">Annuler</VBtn>
      <VBtn color="#1a3a6b" :loading="loading" @click="enregistrer">
        {{ modeEdition ? 'Enregistrer les modifications' : 'Créer l\'utilisateur' }}
      </VBtn>
    </template>
  </AppModal>

  <AppModal
    v-model="dialogSuppression"
    title="Supprimer cet utilisateur ?"
    :max-width="420"
    @close="dialogSuppression = false"
  >
    <p class="text-body-2 text-medium-emphasis">
      L'utilisateur <strong>{{ nomASupprimer }}</strong> sera supprimé définitivement.
    </p>
    <template #actions>
      <VBtn variant="outlined" @click="dialogSuppression = false">Annuler</VBtn>
      <VBtn color="error" :loading="loading" @click="confirmerSuppression">Supprimer</VBtn>
    </template>
  </AppModal>
</template>

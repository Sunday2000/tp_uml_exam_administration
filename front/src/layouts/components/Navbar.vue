<script lang="ts" setup>
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import { useAppConfig } from '@/composable/useAppConfig'
import navMenuItems from '@/menus/vertical'
import { useAuthStore } from '@/stores/auth'
import { useLocale, useTheme } from 'vuetify'


interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
}

const props = defineProps<{
  isDrawerOpen: boolean
}>()

const authStore = useAuthStore()

const emit = defineEmits<Emit>()
const { theme, navigationMenu, isNavbarFixed } = useAppConfig()

const themeVuetify = useTheme()

watch(theme, () => {
  themeVuetify.global.name.value = theme.value
}, { immediate: true })

const themeSwitcherIcon = computed(() => {
  return theme.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'
})

const themeSwitcher = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

const { current } = useLocale()

const changeLocale = (value: string) => {
  current.value = value.toLowerCase()
  localStorage.setItem('app-locale', value.toLowerCase())
  document.querySelector('html')?.setAttribute('lang', value)
}

const route = useRoute()

// Cherche dans le menu l'item dont le "to.name" correspond à la route active
const pageTitle = computed(() => {
  const found = navMenuItems.find(
    item => 'to' in item && item.to?.name === route.name
  )
  return found && 'name' in found ? found.name : 'Tableau de bord'
})

const emails = [
  {
    avatar: avatar1,
    emailSubject: 'Cupcake pie tart donut donut.',
    date: '30-07-2023',
  },
  {
    avatar: avatar2,
    emailSubject: 'Sesame snaps fruitcake roll pastry.',
    date: '05-06-2023',
  },
  {
    avatar: avatar3,
    emailSubject: 'Jelly beans croissant sugar plum biscuit.',
    date: '10-07-2023',
  },
  {
    avatar: avatar4,
    emailSubject: 'Icing cake dessert bears bonbon.',
    date: '29-07-2023',
  },
]

const logout = () => {
  authStore.logout()
}
</script>

<template>
  <VAppBar
    class="layout-navbar border-b"
    elevation="0"
    :absolute="!isNavbarFixed"
  >
    <div class="navbar-wrapper">
      <!-- Toggler mobile -->
      <VAppBarNavIcon
        v-show="$vuetify.display.mdAndDown"
        class="ms-n3"
        @click="emit('update:isDrawerOpen', !props.isDrawerOpen)"
      />

      <!-- ✅ TEXTE À GAUCHE : Titre + sous-titre -->
      <div class="d-flex align-center gap-2">
        <span class="text-subtitle-1 font-weight-bold text-high-emphasis">
          {{ pageTitle }}
        </span>
        <span class="text-body-2 text-medium-emphasis">
          Session BAC 2025–2026
        </span>
      </div>

      <VSpacer />

      <!-- ✅ INPUT SEARCH : largeur fixe, style bordure -->
      <!-- Input Search -->
<VTextField
  placeholder="Rechercher..."
  variant="outlined"
  density="compact"
  prepend-inner-icon="mdi-magnify"
  hide-details
  style="max-width: 220px; --v-field-height: 32px;" 
  class="me-3"
/>

<!-- Notification -->
<VBadge dot color="info" location="top" :offset-y="12">
  <VBtn
    icon
    class="me-3"
    variant="outlined"
    color="primary"
    size="small"
    style="width: 40px; height: 40px;"
  >
    <VIcon icon="mdi-bell-outline" size="18" />
  </VBtn>
</VBadge>

<!-- Déconnexion -->
<VBtn
  variant="outlined"
  color="primary"
  size="small"
  prepend-icon="mdi-logout"
  style="height: 40px;"
  @click="logout"
>
  Déconnexion
</VBtn>
    </div>
  </VAppBar>
</template>
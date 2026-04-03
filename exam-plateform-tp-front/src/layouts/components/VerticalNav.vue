<script lang="ts" setup>
import Logo from '@/components/Logo.vue'
import { useAppConfig } from '@/composable/useAppConfig'
import { appConfig } from '@appConfig'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import { useLocale } from 'vuetify'
import VerticalNavGroup from './VerticalNavGroup.vue'
import VerticalNavLink from './VerticalNavLink.vue'
import { isGroupActive } from './utils'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = authStore.session?.user;
const props = defineProps<{
  isDrawerOpen: boolean
}>()

defineEmits<Emit>()

const { t } = useLocale()
const menus = computed(() => {
  
  return authStore.getRoleMenus();
})
interface Emit {
  (e: 'update:isDrawerOpen', val: boolean): void
}

const { isVerticalMenuMini, isSemiDark, skins } = useAppConfig()
const OpenedGroup = ref<string[]>([])

const resolveNavLinkGroup = computed(() => {
  return (navItem: any) => (navItem.children ? VerticalNavGroup : VerticalNavLink)
})

OpenedGroup.value = isGroupActive(menus.value)

// remove group active when only link active
const handleGroupClose = () => {
  OpenedGroup.value = ['']
}
</script>

<template>
  <VNavigationDrawer
    touchless
    :rail="$vuetify.display.lgAndUp ? isVerticalMenuMini : false"
    :expand-on-hover="$vuetify.display.lgAndUp ? isVerticalMenuMini : false"
    :model-value="$vuetify.display.lgAndUp ? true : props.isDrawerOpen"
    :rail-width="skins === 'modern' ? 96 : 80"
    width="260"
    theme="dark"
    :permanent="$vuetify.display.lgAndUp"
    class="layout-vertical-nav"
    @update:model-value="(val) => $emit('update:isDrawerOpen', val)"
  >
    <div class="d-flex flex-column h-100 text-white" style="background-color: #042C53 !important;" 
>
      <div
        class="d-flex align-center justify-space-between overflow-hidden gap-4 pa-4 border-b"
        style="min-height: 64px;"
      >
        <div class="d-flex align-center text-primary gap-2 ps-2">
          <div class="" style="width: 35px; height: 35px; border-radius: 8px; background-color: #185FA5; padding: 5px;">
						<Logo />
					</div>

          <h6
            class="app-title text-h6 text-medium-emphasis font-weight-semibold"
            :class="$vuetify.display.lgAndUp && isVerticalMenuMini ? 'rail-mode-is-on' : ''"
          >
					<div>
  				<div style="color:#ffffff; font-weight:700; font-size:15px; line-height:1.2;">{{ appConfig.title.value }}</div>
					<div style="color:#94a3b8; font-size:10px; letter-spacing:1px; white-space:nowrap;">{{ appConfig.description.value }}</div></div>
            <!-- <span class="text-gradient">{{ appConfig.title.value }}</span> -->
          </h6>
        </div>

        <!-- toggle rail mode in medium and up screen -->
        <!-- <VBtn
          v-if="$vuetify.display.lgAndUp"
          icon
          variant="plain"
          size="x-small"
          :class="isVerticalMenuMini ? 'rail-mode-is-on' : ''"
          @click="isVerticalMenuMini = !isVerticalMenuMini"
        >
          <VIcon
            size="20"
            :icon="isVerticalMenuMini ? 'mdi-circle-outline' : 'mdi-radiobox-marked'"
          />
        </VBtn> -->

        <!-- close nav in small screen -->
        <!-- <VBtn
          v-else
          icon
          variant="text"
          size="x-small"
          @click="$emit('update:isDrawerOpen', false)"
        >
          <VIcon
            size="24"
            icon="mdi-close"
          />
        </VBtn> -->
      </div>

      <VList
        v-model:opened="OpenedGroup"
        nav
        density="compact"
        open-strategy="single"
				class="layout-vertical-nav-list"
  style="color: white !important; background: transparent !important;"
      >
        <template
          v-for="navItem in menus"
          :key="navItem.name"
        >
          <VListSubheader
            v-if="navItem.heading"
  class="text-uppercase"
  style="color: rgba(255,255,255,0.45) !important;"
          >
            {{ t(navItem.heading) }}
          </VListSubheader>

          <Component
            :is="resolveNavLinkGroup(navItem)"
            v-else
            :nav-item="navItem"
            @close-group="handleGroupClose"
          />
        </template>
      </VList>
<div
        class="d-flex align-center justify-space-between overflow-hidden gap-4 pa-4 border-t"
        style="min-height: 64px;"
      >
			<div class="d-flex align-center text-primary gap-2 ps-2">
          <div class="d-flex align-center justify-center" style="width: 30px; height: 30px; border-radius: 16px; background-color: #185FA5; padding: 5px;">
						A
					</div>

          <h6
            class="app-title text-h6 text-medium-emphasis font-weight-semibold"
            :class="$vuetify.display.lgAndUp && isVerticalMenuMini ? 'rail-mode-is-on' : ''"
          >
					<div>
  				<div style="color:#ffffff; font-weight:700; font-size:15px; line-height:1.2;">{{ user?.firstname+" "+user?.name}}</div>
					<div style="color:#94a3b8; font-size:10px; letter-spacing:1px; white-space:nowrap;">{{ user?.roles?.[0] }}</div></div>
            <!-- <span class="text-gradient">{{ appConfig.title.value }}</span> -->
          </h6>
        </div>
</div>
    </div>
  </VNavigationDrawer>
</template>

<style scoped>
:deep(.v-list-item--active) {
  background-color: #185fa5 !important;
  color: white !important;
}

:deep(.v-list-item--active .v-list-item-title) {
  color: white !important;
}

:deep(.v-list-item--active .v-icon) {
  color: white !important;
}

:deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

:deep(.v-list-item:hover .v-icon) {
  color: white !important;
}

:deep(.v-list-item) {
  color: rgba(255, 255, 255, 0.75) !important;
}

:deep(.v-list-item .v-icon) {
  color: rgba(255, 255, 255, 0.75) !important;
}
</style>
<script lang="ts" setup>
import { useAppConfig } from '@/composable/useAppConfig'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import { useTheme } from 'vuetify'

const { navigationMenu, theme, isBoxLayout, isVerticalMenuMini, isSemiDark, isRtl, skins, isNavbarFixed } = useAppConfig()

const isCustomizer = ref(false)
const currentSelectedColor = ref(localStorage.getItem('app-preset') || '#0D9394')

const presetList = [
  { name: 'success', value: '#0D9394' },
  { name: 'info', value: '#078dee' },
  { name: 'primary', value: '#7635dc' },
  { name: 'blue', value: '#2065D1' },
  { name: 'yellow', value: '#fda92d' },
  { name: 'error', value: '#FF3030' },
]

const vuetifyTheme = useTheme()

watch(currentSelectedColor, () => {
  vuetifyTheme.themes.value.light.colors.primary = currentSelectedColor.value
  vuetifyTheme.themes.value.dark.colors.primary = currentSelectedColor.value
  localStorage.setItem('app-preset', currentSelectedColor.value)
})
</script>

<template>
  <!-- toggler  -->
  <VBtn
    icon
    class="customizer-toggler rounded d-print-none me-n2"
    color="primary"
    elevation="8"
    @click="isCustomizer = !isCustomizer"
  >
    <VIcon
      size="24"
      icon="mdi-tune"
    />
    <VTooltip
      activator="parent"
      location="top"
    >
      Customizer
    </VTooltip>
  </VBtn>

  <!-- navigation drawer -->
  <VNavigationDrawer
    v-model="isCustomizer"
    location="end"
    temporary
    :scrim="false"
    max-width="260"
    elevation="2"
    touchless
    class="app-customizer"
  >
    <VCard
      title="Settings"
      flat
    >
      <template #append>
        <VBtn
          icon
          variant="text"
          size="x-small"
          @click="isCustomizer = !isCustomizer"
        >
          <VIcon
            size="22"
            icon="mdi-close"
          />
        </VBtn>
      </template>

      <VDivider />

      <PerfectScrollbar
        :options="{ wheelPropagation: false, suppressScrollX: true }"
        class="h-100"
      >
        <VCardText class="app-customizer-content">
          <!-- Theme Style -->
          <p class="mb-4">
            Skins
          </p>
          <VRadioGroup
            v-model="skins"
            inline
          >
            <div class="d-flex justify-space-between gap-4 w-100">
              <VLabel
                class="custom-label border rounded"
                :class="skins === 'classic' ? 'text-primary border-primary border-opacity-100' : ''"
              >
                <VIcon
                  icon="mdi-view-compact-outline"
                  class="custom-label-icon"
                />
                <VRadio value="classic" />
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Classic
                </VTooltip>
              </VLabel>
              <VLabel
                class="custom-label border rounded"
                :class="skins === 'modern' ? 'text-primary border-primary border-opacity-100' : ''"
              >
                <VIcon
                  icon="mdi-view-dashboard-outline"
                  class="custom-label-icon"
                />
                <VRadio value="modern" />
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Modern
                </VTooltip>
              </VLabel>
            </div>
          </VRadioGroup>

          <!-- Theme Mode -->
          <p class="mt-6 mb-4">
            Mode
          </p>
          <VRadioGroup
            v-model="theme"
            inline
          >
            <div class="d-flex justify-space-between gap-4 w-100">
              <VLabel
                class="custom-label border rounded"
                :class="theme === 'light' ? 'text-primary border-primary border-opacity-100' : ''"
              >
                <VIcon
                  icon="mdi-weather-sunny"
                  class="custom-label-icon"
                />
                <VRadio value="light" />
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Light
                </VTooltip>
              </VLabel>
              <VLabel
                class="custom-label border rounded"
                :class="theme === 'dark' ? 'text-primary border-primary border-opacity-100' : ''"
              >
                <VIcon
                  icon="mdi-weather-night"
                  class="custom-label-icon"
                />
                <VRadio value="dark" />
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Dark
                </VTooltip>
              </VLabel>
            </div>
          </VRadioGroup>

          <!-- Navigation Menu -->
          <p class="mt-6 mb-4">
            Navigation Menu
          </p>
          <VRadioGroup
            v-model="navigationMenu"
            inline
          >
            <div class="d-flex justify-space-between gap-4 w-100">
              <VLabel
                class="custom-label border rounded"
                :class="navigationMenu === 'vertical' ? 'text-primary border-primary border-opacity-100' : ''"
              >
                <VIcon
                  icon="mdi-dock-left"
                  class="custom-label-icon"
                />

                <VRadio value="vertical" />
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Vertical
                </VTooltip>
              </VLabel>

              <VLabel
                class="custom-label border rounded"
                :class="navigationMenu === 'horizontal' ? 'text-primary border-primary border-opacity-100' : ''"
              >
                <VIcon
                  icon="mdi-dock-top"
                  class="custom-label-icon"
                />

                <VRadio value="horizontal" />

                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Horizontal
                </VTooltip>
              </VLabel>
            </div>
          </VRadioGroup>

          <!-- Box Layout -->
          <p class="mt-6 mb-4">
            Main content width
          </p>

          <VLabel
            class="custom-label border rounded w-100"
            :class="!isBoxLayout ? 'text-primary border-primary border-opacity-100' : ''"
          >
            <VIcon
              :icon="isBoxLayout ? 'mdi-application-brackets-outline' : 'mdi-application-array-outline'"
              class="custom-label-icon"
            />

            <VSwitch v-model="isBoxLayout" />
            <VTooltip
              activator="parent"
              location="top"
            >
              {{ isBoxLayout ? 'Full Layout' : 'Box Layout' }}
            </VTooltip>
          </VLabel>

          <!-- Vertical Menu Collapse and semi dark -->
          <p
            v-if="navigationMenu === 'vertical'"
            class="mt-6 mb-4"
          >
            Vertical Menu Type
          </p>

          <div class="d-flex gap-4">
            <!-- expand and collapse -->
            <VLabel
              v-if="navigationMenu === 'vertical'"
              class="custom-label border rounded w-100"
              :class="isVerticalMenuMini ? 'text-primary border-primary border-opacity-100' : ''"
            >
              <VIcon
                :icon="isVerticalMenuMini ? 'mdi-unfold-more-vertical' : 'mdi-unfold-less-vertical'"
                class="custom-label-icon"
              />
              <VSwitch v-model="isVerticalMenuMini" />

              <VTooltip
                activator="parent"
                location="top"
              >
                {{ isVerticalMenuMini ? 'Expand' : 'Collapse' }}
              </VTooltip>
            </VLabel>

            <!-- semi-dark -->
            <VLabel
              v-if="navigationMenu === 'vertical'"
              class="custom-label border rounded w-100"
              :class="isSemiDark ? 'text-primary border-primary border-opacity-100' : ''"
            >
              <VIcon
                icon="mdi-dock-left"
                class="custom-label-icon"
              />
              <VSwitch v-model="isSemiDark" />

              <VTooltip
                activator="parent"
                location="top"
              >
                {{ isSemiDark ? 'Light' : 'Semi Dark' }}
              </VTooltip>
            </VLabel>
          </div>

          <div class="d-flex gap-4 mt-4">
            <p class="w-50 my-3">
              RTL
            </p>
            <p class="my-3">
              Navbar Fixed
            </p>
          </div>

          <div class="d-flex gap-4">
            <VLabel
              class="custom-label border rounded w-100"
              :class="isRtl ? 'text-primary border-primary border-opacity-100' : ''"
            >
              <VIcon
                :icon="isRtl ? 'mdi-dock-left' : 'mdi-dock-right'"
                class="custom-label-icon"
              />

              <VSwitch v-model="isRtl" />

              <VTooltip
                activator="parent"
                location="top"
              >
                {{ isRtl ? 'LTR' : 'RTL' }}
              </VTooltip>
            </VLabel>

            <VLabel
              class="custom-label border rounded w-100"
              :class="!isNavbarFixed ? 'text-primary border-primary border-opacity-100' : ''"
            >
              <VIcon
                icon=" mdi-dock-top"
                class="custom-label-icon"
              />

              <VSwitch v-model="isNavbarFixed" />

              <VTooltip
                activator="parent"
                location="top"
              >
                {{ isNavbarFixed ? 'Fixed' : 'Absolute' }}
              </VTooltip>
            </VLabel>
          </div>

          <p class="mt-6 mb-4">
            Preset
          </p>

          <VRadioGroup
            v-model="currentSelectedColor"
            inline
            class="preset-toggler pb-4"
          >
            <VLabel
              v-for="preset in presetList"
              :key="preset.name"
              class="custom-label rounded mx-3 my-2"
              :class="currentSelectedColor === preset.value ? 'active' : ''"
              :style="`background-color:${preset.value}; opacity: 1; width: 40px; height: 40px;`"
            >
              <VRadio :value="preset.value" />

              <VIcon
                v-if="currentSelectedColor === preset.value"
                icon="mdi-check"
                class="active-icon"
              />
            </VLabel>
          </VRadioGroup>
        </VCardText>
      </PerfectScrollbar>
    </VCard>
  </VNavigationDrawer>
</template>

<style lang="scss">
.customizer-toggler {
  position: fixed !important;
  z-index: 901;
  inset-block-end: 50%;
  inset-inline-end: 0;
}

.app-customizer {
  .v-navigation-drawer__content {
    overflow-y: hidden;
  }

  .app-customizer-content {
    block-size: calc(100vh - 82px);
  }

  .preset-toggler {
    .v-selection-control-group--inline {
      justify-content: space-between;
    }
  }
}
</style>

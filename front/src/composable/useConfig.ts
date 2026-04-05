import type { Ref } from 'vue'

declare type availableLocale = 'en' | 'fr' | 'ar'

export interface AppConfig {
  title: Ref<string>
  description: Ref<string>
  theme: Ref<'light' | 'dark'>
  navigationMenu: Ref<'horizontal' | 'vertical'>
  isBoxLayout: Ref<boolean>
  isVerticalMenuMini: Ref<boolean>
  defaultLocale: Ref<availableLocale>
  isRtl: Ref<boolean>
  isSemiDark: Ref<boolean>
  skins: Ref<'classic' | 'modern'>
  isNavbarFixed: Ref<boolean>
}

export const config = (c: AppConfig): AppConfig => ({
  title: c.title,
  description: c.description,

  // @ts-expect-error local
  theme: localStorage.getItem('app-theme') ? ref(localStorage.getItem('app-theme')) : c.theme, // dark Or light
  // @ts-expect-error local
  navigationMenu: localStorage.getItem('app-menu') ? ref(localStorage.getItem('app-menu')) : c.navigationMenu, // horizontal or vertical
  isBoxLayout: c.isBoxLayout,

  // @ts-expect-error local
  isVerticalMenuMini: localStorage.getItem('app-menu-mini') ? ref(JSON.parse(localStorage.getItem('app-menu-mini'))) : c.isVerticalMenuMini,
  defaultLocale: c.defaultLocale, // en | fr | ar
  isRtl: c.isRtl,

  // @ts-expect-error local
  isSemiDark: localStorage.getItem('app-semi-dark') ? ref(JSON.parse(localStorage.getItem('app-semi-dark'))) : c.isSemiDark,

  // @ts-expect-error local
  skins: localStorage.getItem('app-skins') ? ref(localStorage.getItem('app-skins')) : c.skins, // classic | modern
  // @ts-expect-error local
  isNavbarFixed: localStorage.getItem('app-navbar-fixed') ? ref(JSON.parse(localStorage.getItem('app-navbar-fixed'))) : c.isNavbarFixed,
})

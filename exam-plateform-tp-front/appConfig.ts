import { config } from '@/composable/useConfig'

// default settings
export const appConfig = config({
  title: ref('ExamPlatform'),
  description: ref('GESTION D\'EXAMENS'),
  theme: ref('light'),
  navigationMenu: ref('vertical'), // horizontal or vertical
  isBoxLayout: ref(true),
  isVerticalMenuMini: ref(false),
  defaultLocale: ref('en'), // en | fr | ar
  isRtl: ref(false),
  isSemiDark: ref(false),
  skins: ref('modern'), // classic | modern
  isNavbarFixed: ref(true),
})

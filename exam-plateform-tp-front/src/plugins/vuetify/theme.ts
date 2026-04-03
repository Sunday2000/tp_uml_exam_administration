import { appConfig } from '@appConfig'

export default {
  defaultTheme: appConfig.theme.value,
  themes: {
    light: {
  colors: {
    'primary': '#042C53',        // ← bleu marine sidebar
    'on-primary': '#ffffff',
    'secondary': '#2563eb',      // ← bleu accent boutons/badges
    'on-secondary': '#ffffff',
    'info': '#3b82f6',
    'success': '#22c55e',
    'on-success': '#fff',
    'warning': '#f59e0b',
    'on-warning': '#fff',
    'error': '#ef4444',
    'background': '#f1f5f9',     // ← fond page gris très clair
    'on-background': '#1e293b',
    'surface': '#ffffff',        // ← fond des cards blanc
    'on-surface': '#1e293b',
  },
  variables: {
    'border-color': '#cbd5e1',
    'border-opacity': '0.3',
    'table-header-color': '#f8fafc',
    'scrollbar-thumb': '#cbd5e1',
    'shadow-key-umbra-opacity': 'rgba(0,0,0,0.08)',
    'shadow-key-penumbra-opacity': 'rgba(0,0,0,0.05)',
    'shadow-key-ambient-opacity': 'rgba(0,0,0,0.04)',
  },
},
    dark: {
      colors: {
        'primary': localStorage.getItem('app-preset') || '#0D9394',
        'on-primary': '#fff',
        'secondary': '#A9B2BC',
        'on-secondary': '#fff',
        'info': '#00B8D9',
        'success': '#36B37E',
        'warning': '#FFAB00',
        'on-warning': '#fff',
        'error': '#FF5630',
        'background': '#151521',
        'surface': '#1e1e2d',
      },
      variables: {
        'border-color': '#eaeaff',
        'border-opacity': '0.12',
        'table-header-color': '#2F3944',
        'scrollbar-thumb': '#4a5062',

        // Shadows
        'shadow-key-umbra-opacity': 'rgba(0, 0, 0, 0.2)',
        'shadow-key-penumbra-opacity': 'rgba(0, 0, 0, 0.14)',
        'shadow-key-ambient-opacity': 'rgba(0, 0, 0, 0.12)',
      },
    },
  },
}

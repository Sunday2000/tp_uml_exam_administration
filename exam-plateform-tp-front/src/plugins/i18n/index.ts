import { appConfig } from '@appConfig'
import { createI18n } from 'vue-i18n'
import ar from './messages/ar'
import en from './messages/en'
import fr from './messages/fr'

const messages = {
  en,
  fr,
  ar,
}

export default createI18n({
  legacy: false,
  locale: localStorage.getItem('app-locale') || appConfig.defaultLocale.value,
  fallbackLocale: 'en',
  messages,
})

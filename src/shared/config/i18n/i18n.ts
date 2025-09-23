'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../../../../public/locales/en/translation.json'
import ru from '../../../../public/locales/ru/translation.json'

const lng =
  typeof window === 'undefined'
    ? 'English' // SSR fallback (middleware 200% выставит куку)
    : document.cookie
        .split('; ')
        .find(row => row.startsWith('i18n='))
        ?.split('=')[1] || 'English'

i18n.use(initReactI18next).init({
  resources: {
    English: { translation: en },
    Russian: { translation: ru },
  },
  lng,
  fallbackLng: 'Russian',
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false, // не экранировать HTML
  },
})

export default i18n

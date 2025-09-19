'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../../../../public/locales/en/translation.json'
import ru from '../../../../public/locales/ru/translation.json'
import { setCookie } from '@/shared/lib/utils'

const savedLng = typeof window !== 'undefined' ? localStorage.getItem('lng') : undefined

// export function initI18n(currentLng: string){
//   i18n.use(initReactI18next).init({
//   resources: {
//     en: { translation: en }, //использовать стандартные ключи
//     ru: { translation: ru },
//   },
//   lng: currentLng,
//   fallbackLng: 'en',
//   defaultNS: 'translation',
//   interpolation: {
//     escapeValue: false,
//   },
// })
// }

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

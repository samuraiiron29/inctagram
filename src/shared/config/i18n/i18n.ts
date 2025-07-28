'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'


import en from '../../../../public/locales/en/translation.json'
import ru from '../../../../public/locales/ru/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      English: { translation: en },
      Russian: { translation: ru },
    },
    lng: 'English',
    fallbackLng: 'Russian',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,   // не экранировать HTML
    },
  })

export default i18n

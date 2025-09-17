'use client'
import { useEffect } from 'react'
import i18n from './i18n'

//Для обертки приложения, чтобы не было hudration error

export function LanguageProvider({ lng, children }: { lng: string, children: React.ReactNode }) {
  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng)
    }
  }, [lng])
  return <>{children}</>
}
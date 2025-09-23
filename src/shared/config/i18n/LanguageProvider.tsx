'use client'
import { useEffect, useState } from 'react'
import i18n from './i18n'

export function LanguageProvider({ lng, children }: { lng: string; children: React.ReactNode }) {
  useEffect(() => {
    console.log('lng', lng)
    console.log('i18n.language', i18n.language)
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng)
    }
  }, [lng])
  return <>{children}</>
}

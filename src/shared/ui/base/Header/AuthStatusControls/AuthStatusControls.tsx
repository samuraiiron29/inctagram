'use client'
import { NotificationBell } from '@/shared/ui/base/Notification/NotificationBell/NotificationBell'
import { Select } from '@/shared/ui/base/Select/Select'
import { Button } from '@/shared/ui/base/Button/Button'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export type Props = {
  isLoggedIn: boolean
}

export const AuthStatusControls = ({ isLoggedIn }: Props) => {
  const { i18n, t } = useTranslation()

  const handleLanguageChange = (value: string) => {
    return i18n.changeLanguage(value)
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-[45px]">
          <NotificationBell />
          <Select isLanguage value={i18n.language} onChange={handleLanguageChange} />
        </div>
      ) : (
        <div className="flex items-center gap-[36px]">
          <Select isLanguage value={i18n.language} onChange={handleLanguageChange} />
          <div className="flex gap-[24px]">
            <Button asChild variant={'textButton'}>
              <Link href="/auth/sign-in">{t('auth.signIn')}</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">{t('auth.signUp')}</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

'use client'
import { NotificationBell } from '@/shared/ui/base/Notification/NotificationBell/NotificationBell'
import { Select } from '@/shared/ui/base/Select/Select'
import { Button } from '@/shared/ui/base/Button/Button'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
<<<<<<< HEAD
import { PATH } from '@/shared/lib/path'
=======
import { setCookie } from '@/shared/lib/utils'
>>>>>>> 6e632e75855be89c5d525955199961be576af8e5

export type Props = {
  isLoggedIn: boolean
}

export const AuthStatusControls = ({ isLoggedIn }: Props) => {
  const { i18n, t } = useTranslation()
  const handleLanguageChange = async (value: string) => {
    try {
      await i18n.changeLanguage(value)
      setCookie('i18n', value, 7)
    } catch (error) {
      console.log('ошибка перевода', error)
    }
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
              <Link href={PATH.LOGIN}>{t('auth.signIn')}</Link>
            </Button>
            <Button asChild>
              <Link href={PATH.SIGNUP}>{t('auth.signUp')}</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

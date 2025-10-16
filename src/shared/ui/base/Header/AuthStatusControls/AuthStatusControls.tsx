'use client'
import { NotificationBell } from '@/shared/ui/base/Notification/NotificationBell/NotificationBell'
import { Select } from '@/shared/ui/base/Select/Select'
import { Button } from '@/shared/ui/base/Button/Button'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { PATH } from '@/shared/lib/path'
import { setCookie } from '@/shared/lib/utils'
import { useAppSelector } from '@/shared/lib/hooks'
import { selectIsLoggedIn } from '@/store/slices/authSlice'

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

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

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
          <div className="flex gap-[24px] hidden sm:block">
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

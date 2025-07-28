import { NotificationBell } from '@/shared/ui/base/Notification/NotificationBell/NotificationBell'
import { Select } from '@/shared/ui/base/Select/Select'
import { Button } from '@/shared/ui/base/Button/Button'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { headers } from 'next/headers'

export type Props = {
  isLoggedIn: boolean
}

export const AuthStatusControls = ({ isLoggedIn }: Props) => {
  const { i18n, t } = useTranslation()

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
  }

  console.log('Current language:', i18n.language)


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
              <Link href="/auth/sign-in">{t('header.buttons.login')}</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">{t('header.buttons.sign')}</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

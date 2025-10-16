'use client'
import { PATH } from '@/shared/lib/path'
import { AuthStatusControls } from '@/shared/ui/base/Header/AuthStatusControls/AuthStatusControls'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export const Header = () => {
  const { t } = useTranslation()

  return (
    <header className={'relative z-100 border-b border-dark-300 box-border col-span-3'}>
      <div className={'mx-auto flex justify-between items-center max-w-[1280px] w-full h-[60px] min-w-[200px] px-[15px] md:px-[60px]'}>
        <Link href={PATH.HOME} className={'text-large accent-light-100'}>
          {t('header.mainLogo')}
        </Link>
        <AuthStatusControls />
      </div>
    </header>
  )
}

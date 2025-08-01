import { AuthStatusControls } from '@/shared/ui/base/Header/AuthStatusControls/AuthStatusControls'
import Link from 'next/link'
import { useMeQuery } from '@/shared/api/authApi'
import { useTranslation } from 'react-i18next'

type Props = {
  isLoggedIn?: boolean
}

export const Header = ({ isLoggedIn = false }: Props) => {

  const { t } = useTranslation()
  return (
    <header className={'relative z-100 border-b border-dark-300 box-border'}>
      <div className={'mx-auto flex justify-between items-center max-w-[1280px] w-full h-[60px] px-[60px]'}>
        <Link href={'/'} className={'text-large accent-light-100'}>
          {t('header.mainLogo')}
        </Link>
        <AuthStatusControls isLoggedIn={isLoggedIn} />
      </div>
    </header>
  )
}

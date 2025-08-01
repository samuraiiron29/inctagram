import { AuthStatusControls } from '@/shared/ui/base/Header/AuthStatusControls/AuthStatusControls'
import Link from 'next/link'
import { useMeQuery } from '@/shared/api/authApi'

type Props = {
  isLoggedIn?: boolean
}

export const Header = ({ isLoggedIn = false }: Props) => {

  return (
    <header className={'relative z-100 border-b border-dark-300 box-border'}>
      <div className={'mx-auto flex justify-between items-center max-w-[1280px] w-full h-[60px] px-[60px]'}>
        <Link href={'/'} className={'text-large accent-light-100'}>
          Inctagram
        </Link>
        <AuthStatusControls isLoggedIn={isLoggedIn} />
      </div>
    </header>
  )
}

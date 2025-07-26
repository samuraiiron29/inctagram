import { AuthStatusControls } from '@/shared/ui/base/Header/AuthStatusControls/AuthStatusControls'
import Link from 'next/link'

type Props = {
  isLoggedIn?: boolean
}

export const Header = ({ isLoggedIn = false }: Props) => {
  return (
    <div
      className={'mx-auto flex justify-between items-center max-w-[1280px] w-full h-[60px] px-[60px] border-b border-dark-300 box-border'}
    >
      <Link href={'/'} className={'text-large accent-light-100'}>
        Inctagram
      </Link>
      <AuthStatusControls isLoggedIn={isLoggedIn} />
    </div>
  )
}

import React from 'react'
import { AuthStatusControls } from '@/shared/ui/base/Header/AuthStatusControls/AuthStatusControls'

type Props = {
  isLoggedIn?: boolean
}

export const Header = ({ isLoggedIn = false }: Props) => {
  return (
    <div className={'mx-auto flex justify-between items-center max-w-[1280px] w-full h-[60px] px-[60px]'}>
      <span className={'text-large accent-light-100'}>Inctagram</span>
      <AuthStatusControls isLoggedIn={isLoggedIn} />
    </div>
  )
}

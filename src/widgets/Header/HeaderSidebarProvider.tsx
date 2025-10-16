'use client'
import { Header } from '@/shared/ui/base/Header/Header'
import Sidebar from '@/features/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/store/services/session.selectors'
import { deleteCookie } from '@/shared/lib/utils'
import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

type Props = {
  children: React.ReactNode
}

const HeaderSidebarProvider = ({ children }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isDesktop = useMediaQuery({ minWidth: 768 })
  useEffect(() => {
    if (!isLoggedIn) {
      deleteCookie()
    }
  }, [isLoggedIn])
  // if (!isLoggedIn) deleteCookie()
  return (
    <>
      <Header />
      {isLoggedIn && <Sidebar />}
      <div className="flex justify-center items-center pl-[244px] pr-[60px]">{children}</div>
    </>
  )
}

export default HeaderSidebarProvider

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
      <Header isLoggedIn={isLoggedIn} />
      {/* DONT WORK!!! */}
      {/* {status === 'loading' && <LinearProgress />} */}

      {isLoggedIn && isDesktop ? (
        <>
          <Sidebar />
        </>
      ) : (
        isLoggedIn && <Sidebar mobileMenu={true} />
      )}
      <div className={`${isLoggedIn && isDesktop ? 'col-start-2' : ''} flex justify-center p-[30px]`}>{children}</div>
    </>
  )
}
export default HeaderSidebarProvider

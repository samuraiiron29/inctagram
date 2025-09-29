'use client'
import { Header } from '@/shared/ui/base/Header/Header'
import Sidebar from '@/features/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/store/services/session.selectors'
import { deleteCookie } from '@/shared/lib/utils'

type Props = {
  children: React.ReactNode
}

const HeaderSidebarProvider = ({ children }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  if (!isLoggedIn) deleteCookie()
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {/* DONT WORK!!! */}
      {/* {status === 'loading' && <LinearProgress />} */}

      {isLoggedIn && <Sidebar />}
      <div className="flex justify-center items-center pl-[244px] pr-[244px]">{children}</div>
    </>
  )
}
export default HeaderSidebarProvider

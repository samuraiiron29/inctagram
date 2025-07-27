'use client'

import { selectAppStatus, selectIsLoggedIn } from '@/store/slices/appSlice'
import { useAppSelector } from '@/shared/lib/hooks/appHooks'
import { Header } from '@/shared/ui/base/Header/Header'
import Sidebar from '@/shared/ui/base/Sidebar/Sidebar'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'

type Props = {
  children: React.ReactNode
}

const HeaderSidebarProvider = ({ children }: Props) => {
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {status === 'loading' && <LinearProgress />}
      {isLoggedIn && <Sidebar />}
      <div className={'pl-[244px] pr-[244px]'}>{children}</div>
    </>
  )
}

export default HeaderSidebarProvider

'use client'
import { selectAppStatus, selectIsLoggedIn } from '@/store/slices/appSlice'
import { Header } from '@/shared/ui/base/Header/Header'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { useAppSelector } from '@/shared/lib/hooks'
import Sidebar from '@/features/Sidebar/Sidebar'

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
      <div className="flex justify-center items-center pl-[244px] pr-[244px]">{children}</div>
    </>
  )
}

export default HeaderSidebarProvider

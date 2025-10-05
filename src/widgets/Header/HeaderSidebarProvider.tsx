'use client'
import { Header } from '@/shared/ui/base/Header/Header'
import Sidebar from '@/features/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/store/slices/authSlice'

type Props = {
  children: React.ReactNode
}

const HeaderSidebarProvider = ({ children }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn && <Sidebar />}
      <div className="flex justify-center items-center pl-[244px] pr-[244px]">{children}</div>
    </>
  )
}

export default HeaderSidebarProvider

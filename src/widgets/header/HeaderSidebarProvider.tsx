'use client'
import { selectAppStatus   } from '@/store/slices/appSlice'
import { Header } from '@/shared/ui/base/Header/Header'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { useAppSelector } from '@/shared/lib/hooks'
import Sidebar from '@/features/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/store/services/session.selectors'
type Props = {
  children: React.ReactNode
}

const HeaderSidebarProvider = ({ children }: Props) => {
  //  const pending = useIsFetching()
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
//   useEffect(() => {
//   if (pending > 0  || status === 'loading')
// },[])

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

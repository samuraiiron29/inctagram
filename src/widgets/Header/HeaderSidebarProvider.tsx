'use client'
import { selectAppStatus   } from '@/store/slices/appSlice'
import { Header } from '@/shared/ui/base/Header/Header'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { useAppSelector } from '@/shared/lib/hooks'
import Sidebar from '@/features/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/store/services/session.selectors'
import { baseApi } from '@/store/services/baseApi'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useMeQuery } from '@/shared/api'
import { deleteCookie, getCookie } from '@/shared/lib/utils'

type Props = {
  children: React.ReactNode
}

const HeaderSidebarProvider = ({ children }: Props) => {
  // const router = useRouter()
  // const searchParams = useSearchParams()
  //  const pending = useIsFetching()
  // const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  // const isGit = searchParams.get('isGitHub')
  // debugger
  // console.log('isGit', isGit)
  // console.log('', searchParams)
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     deleteCookie()
  //   }
  // }, [])
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

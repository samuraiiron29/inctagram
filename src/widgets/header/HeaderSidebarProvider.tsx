'use client'

import { selectAppDev, selectAppStatus, selectIsLoggedIn, setAppDev } from '@/store/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/appHooks'
import { Header } from '@/shared/ui/base/Header/Header'
import Sidebar from '@/shared/ui/base/Sidebar/Sidebar'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import { Button } from '@/shared/ui/base/Button/Button'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const HeaderSidebarProvider = ({children}: Props) => {
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dev = useAppSelector(selectAppDev)

  const dispatch = useAppDispatch()
  const router = useRouter()

  const changeDev = () => {
    dispatch(setAppDev(!dev))
  }

  // useEffect(() => {
  //   if (dev) {
  //     router.push('/dev')
  //   } else if (!dev) {
  //     router.push('/')
  //   }
  // }, [dev, router])

  return (
    <>
      {dev ? (
        <div>{children}</div>
      ) : (
        <>
          <Header isLoggedIn={isLoggedIn} />
          {status === 'loading' && <LinearProgress />}
          {isLoggedIn && <Sidebar />}
          <div className="flex justify-center items-center pl-[244px] pr-[244px]">{children}</div>
        </>
      )}
      <div className="flex justify-center items-center mb-4">
        <Button variant="primary" onClick={changeDev}>
          {dev ? 'Page Home' : 'Dev Mode'}
        </Button>
      </div>
    </>
  )
}

export default HeaderSidebarProvider
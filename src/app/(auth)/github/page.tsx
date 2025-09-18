'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PATH } from '@/shared/lib/path/path'
import { setCookie } from '@/shared/lib/utils/cookieUtils'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    debugger
    if (accessToken) {
      setCookie('accessToken', accessToken, 7)
      setCookie('isGitHub', 'true', 7)
      // router.replace('/')
      window.location.replace('/')
    } else router.push(PATH.LOGIN)
  }, [])
  return <div className={'flex justify-center items-center'}>...Load</div>
}


// 'use client'
// import { useEffect } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { PATH } from '@/shared/lib/path/path'
// import { setCookie } from '@/shared/lib/utils/cookieUtils'

// export default function Page() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   // const dispatch = useAppDispatch()
//   // const isLoggedIn = useSelector(selectIsLoggedIn)
//   useEffect(() => {
//     const accessToken = searchParams.get('accessToken')
//     // const email = searchParams.get('email')
//     if (accessToken && email) {
//       setCookie('accessToken', accessToken, 7)
//       setCookie('isGitHub', 'true', 7)
//       router.push('/')
//       // dispatch(setIsLoggedIn(true))
//     } else {
//       router.push(PATH.LOGIN)
//     }
//   }, [])
//   // [(searchParams, router)]
//   return <div className={'flex justify-center items-center'}>...Load</div>
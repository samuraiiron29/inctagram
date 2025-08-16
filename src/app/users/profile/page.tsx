import { Suspense } from 'react'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'
import RedirectServer from '@/app/users/profile/redirect-server'

export const dynamic = 'force-dynamic' // чтобы Next не SSG-шил

export default function ProfileIndex() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <RedirectServer />
    </Suspense>
  )
}

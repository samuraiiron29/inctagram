'use client'

import { notFound, useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@radix-ui/themes'

export default function DevKanPage() {
  const { kan } = useParams()
  const [Component, setComponent] = useState<null | React.FC>(null)

  function withButton(Component: React.FC) {
    return function Wrapped() {
      const router = useRouter()

      return (
        <>
          <Button onClick={() => router.back()}>Назад</Button>
          <Component />
        </>
      )
    }
  }

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      notFound()
    }
  }, [])

  useEffect(() => {
    if (!kan || typeof kan !== 'string') return

    // Загружаем динамически компоненту из src/dev/kan-XX/page.tsx
    import(`@/dev/${kan}/page`)
      .then(mod => setComponent(() => withButton(mod.default)))
      .catch(() => {
        setComponent(() => () => <div>Страница {kan} не найдена</div>)
      })
  }, [kan])

  if (!Component) return <div>Загрузка...</div>

  return <Component />
}

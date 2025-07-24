'use client'

import { JSX, useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

export default function DevPage() {
  const [DevPanel, setDevPanel] = useState<null | (() => JSX.Element)>(null)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      notFound() // Не пускаем в продакшн
    } else {
      import('../../dev/page').then(mod => {
        setDevPanel(() => mod.default || <div>fsdfsfs</div>)
      })
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return DevPanel && <DevPanel />
}

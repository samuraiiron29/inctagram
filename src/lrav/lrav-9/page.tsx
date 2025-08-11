'use client'
import Checkbox from '@/shared/ui/base/CheckBox/CheckBox'
import { useState } from 'react'

export default function Page() {
  const [agree, setAgree] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Checkbox checked={agree} onChange={setAgree} label="Я согласен с условиями" />
    </div>
  )
}

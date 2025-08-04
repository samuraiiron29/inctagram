import { TextArea } from '@/shared/ui/base/TextArea/TextArea'
import { useState } from 'react'

export default function Page() {
  const [text, setText] = useState('')
  return (
    <TextArea
      label="Коментарий"
      placeholder="Напишите что-то..."
      value={text}
      onChange={e => setText(e.target.value)}
      error=""
      size="large"
      disabled
    />
  )
}

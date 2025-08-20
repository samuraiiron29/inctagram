import { useState } from 'react'
import { useUpdatePostDescriptionMutation } from '@/shared/api'

export const useEditPostDescription = (initialText: string, postId: number, onCloseEdit: () => void) => {
  const [text, setText] = useState(initialText)
  const [updatePost, { isLoading }] = useUpdatePostDescriptionMutation()

  const handleChange = (value: string) => {
    if (value.length <= 500) {
      setText(value)
    }
  }

  const saveDescription = () => {
    updatePost({ postId, text })
    onCloseEdit()
  }

  return { text, handleChange, saveDescription, isLoading }
}

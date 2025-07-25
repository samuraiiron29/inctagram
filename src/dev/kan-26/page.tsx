'use client'
import { Alert } from '@/shared/ui/base/Alert/Alert'
import { Button as RadixButton, Flex } from '@radix-ui/themes'
import { useState } from 'react'

export default function Page() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  return (
    <Flex p="3" direction="column" gap="5" width="20%">
      <RadixButton onClick={() => setShowSuccess(true)} color="green" children={'call success'} />
      <RadixButton onClick={() => setShowError(true)} color="red" children={'call error'} />
      {showSuccess && <Alert message="well good" variant="success" />}
      {showError && <Alert message="well bad" variant="error" />}
    </Flex>
  )
}

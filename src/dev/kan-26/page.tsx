'use client'
import { Alert } from '@/shared/ui/base/Alert/Alert'
import { Button as RadixButton, Flex } from '@radix-ui/themes'
import { useState } from 'react'

export default function Page() {
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)

  return (
    <Flex p="3" direction="column" gap="5" width="20%">
      <RadixButton onClick={() => setOpenSuccess(true)} color="green" children={'call success'} />
      <RadixButton onClick={() => setOpenError(true)} color="red" children={'call error'} />
      <Alert open={openSuccess} onOpenChange={setOpenSuccess} message="well good" variant="success" />
      <Alert open={openError} onOpenChange={setOpenError} message="well bad" variant="error" />
    </Flex>
  )
}

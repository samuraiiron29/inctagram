'use client'

import { Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { notFound } from 'next/navigation'

export default function DevPanelPage() {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      notFound()
    }
  }, [])

  const redirectHandler = (kan: string) => {
    router.push(`/dev/${kan}`)
  }

  return (
    <Flex gap="3" p="5">
      <Button onClick={() => redirectHandler('kan-15')}>kan-15 tabs</Button>
      <Button onClick={() => redirectHandler('kan-20')}>kan-20 pagination</Button>
      <Button onClick={() => redirectHandler('kan-23')}>kan-23 typography</Button>

      <Button onClick={() => redirectHandler('kan-10')}>kan-10 RadioGroup</Button>
      <Button onClick={() => redirectHandler('kan-13')}>kan-13 Button</Button>
      <Button onClick={() => redirectHandler('kan-9')}>kan-9 Check-box</Button>

      <Button onClick={() => redirectHandler('kan-26')}>kan-26 Alerts</Button>
      <Button onClick={() => redirectHandler('kan-17')}>kan-17 Header</Button>
      <Button onClick={() => redirectHandler('kan-18')}>kan-18 Sidebars</Button>

      <Button onClick={() => redirectHandler('kan-12')}>kan-12 Input</Button>
      <Button onClick={() => redirectHandler('kan-16')}>kan-16 Cards</Button>
      <Button onClick={() => redirectHandler('kan-22')}>kan-22 Scroll</Button>

      <Button onClick={() => redirectHandler('kan-14')}>kan-14 Text-area</Button>
      <Button onClick={() => redirectHandler('kan-19')}>kan-19 Date Picker</Button>
      <Button onClick={() => redirectHandler('kan-21')}>kan-21 Recaptcha</Button>
    </Flex>
  )
}

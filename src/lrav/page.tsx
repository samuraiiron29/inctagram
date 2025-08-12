'use client'

import { Button, Flex, Grid } from '@radix-ui/themes'
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

  const redirectHandler = (lrav: string) => router.push(`/lrav/${lrav}`)

  return (
    <Grid gap="3" p="5" columns={'5'}>
      <Button onClick={() => redirectHandler('lrav-9')}>lrav-9 Check-box</Button>
      <Button onClick={() => redirectHandler('lrav-10')}>lrav-10 RadioGroup</Button>
      <Button onClick={() => redirectHandler('lrav-12')}>lrav-12 Input</Button>
      <Button onClick={() => redirectHandler('lrav-13')}>lrav-13 Button</Button>
      <Button onClick={() => redirectHandler('lrav-14')}>lrav-14 Text-area</Button>
      <Button onClick={() => redirectHandler('lrav-15')}>lrav-15 tabs</Button>
      <Button onClick={() => redirectHandler('lrav-16')}>lrav-16 Cards</Button>
      <Button onClick={() => redirectHandler('lrav-17')}>lrav-17 Header</Button>
      <Button onClick={() => redirectHandler('lrav-18')}>lrav-18 Sidebars</Button>
      <Button onClick={() => redirectHandler('lrav-19')}>lrav-19 Date Picker</Button>
      <Button onClick={() => redirectHandler('lrav-20')}>lrav-20 pagination</Button>
      <Button onClick={() => redirectHandler('lrav-21')}>lrav-21 Recaptcha</Button>
      <Button onClick={() => redirectHandler('lrav-22')}>lrav-22 Scroll</Button>
      <Button onClick={() => redirectHandler('lrav-23')}>lrav-23 typography</Button>
      <Button onClick={() => redirectHandler('lrav-26')}>lrav-26 Alerts</Button>
      <Button onClick={() => redirectHandler('lrav-50')}>lrav-50 Image creator</Button>
    </Grid>
  )
}

'use client'
import { Flex, Theme } from '@radix-ui/themes'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Theme>
      {/* <ThemePanel /> */}
      {/* <Flex height={'100vh'} className="bg-dark-700" style={{ backgroundColor: 'var(--dark-700)' }}> */}
      {children}
      {/* </Flex> */}
    </Theme>
  )
}

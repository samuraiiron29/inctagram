'use client'

import { Flex, Theme, ThemePanel } from '@radix-ui/themes'
import { ReactNode } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Theme>
      {/* <ThemePanel /> */}
      <Flex className="bg-[var(--dark-700)]" height={'100vh'}>
        {children}
      </Flex>
    </Theme>
  )
}

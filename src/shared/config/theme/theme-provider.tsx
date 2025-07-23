'use client'
import { Flex, Theme } from '@radix-ui/themes'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Theme>
      {/* <ThemePanel /> */}
      {children}
    </Theme>
  )
}

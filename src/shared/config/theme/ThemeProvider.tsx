"use client"

import "@radix-ui/themes/styles.css"
import { Theme, ThemePanel } from "@radix-ui/themes"
import { ReactNode } from "react"

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Theme accentColor="gray" appearance='dark' grayColor='slate'>
      {children}
      <ThemePanel />
    </Theme>
  )
}

export default ThemeProvider;

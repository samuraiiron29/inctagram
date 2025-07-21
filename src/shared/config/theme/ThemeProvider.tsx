"use client"

import "@radix-ui/themes/styles.css"
import { Theme, ThemePanel } from "@radix-ui/themes"
import { ReactNode } from "react"

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Theme>
      {children}
      <ThemePanel />
    </Theme>
  )
}

export default ThemeProvider

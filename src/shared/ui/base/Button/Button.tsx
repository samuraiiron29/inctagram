'use client'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

export type Props<T extends ElementType = 'button'> = {
  asChild?: T
  variant?: 'primary' | 'secondary' | 'outlined' | 'link' | 'disabled'
  title: string
  fullWidth?: boolean
  width?: string
} & ComponentPropsWithoutRef<T>

export const Button = () => {
  return <div>123</div>
}

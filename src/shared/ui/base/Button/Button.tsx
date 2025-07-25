'use client'
import { cloneElement, isValidElement } from 'react'
import clsx from 'clsx'
 
export type VariantButton = 'primary' | 'secondary' | 'outlined' | 'textButton' | 'variant21'
export type Props = {
  asChild?: boolean
  variant?: VariantButton
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>
 
const baseStyle = `text-h3 rounded-[2px] py-1.5 px-6 gap-2.5`
const variantStyle: Record<VariantButton, string> = {
  primary: `bg-accent-500 active:bg-accent-700 hover:bg-accent-100 focus:border-2 disabled:bg-accent-900`,
  secondary: `bg-dark-300 active:bg-[#212121] hover:bg-dark-100 focus:border-2 focus:border-accent-300 disabled:bg-dark-500`,
  outlined: `border border-accent-500 text-accent-500  active:bg-accent-700 active:text-accent-700 hover:bg-accent-100 hover:text-accent-100 focus:border-2 focus:border-accent-700 disabled:bg-accent-900`,
  textButton: `text-accent-500 active:text-accent-700 hover:text-accent-100 focus:border-2 focus:border-accent-700 disabled:bg-accent-900`,
  variant21: `bg-dark-300`,
}

export const Button = ({ asChild = false, variant = 'primary', children, ...props }: Props) => {
  const className = clsx(baseStyle, variantStyle[variant])

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className,
      ...props,
    })
  }

  return <button className={className} {...props} children={children} />
}


 
// export type Props<T extends ElementType = 'button'> = {
//   asChild?: T
//   variant?: VariantButton
//   children?: React.ReactNode
// } & ComponentPropsWithoutRef<T>
// & ButtonHTMLAttributes<HTMLButtonElement>
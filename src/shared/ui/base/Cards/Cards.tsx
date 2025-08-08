'use client'
import { FormEvent, ReactNode } from 'react'

type PropsType = {
  children: ReactNode
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

export const Cards = ({ children, onSubmit }: PropsType) => {
  return (
    <form onSubmit={onSubmit} className="bg-[#171717] rounded-xs border border-[#333] p-[24px] m-[auto]">
      {children}
    </form>
  )
}

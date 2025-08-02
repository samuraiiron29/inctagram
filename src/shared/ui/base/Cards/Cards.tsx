import { ReactNode } from "react"

type PropsType = {
  children: ReactNode
  onSubmitHandler: () => void
}

export const Cards = ({children, onSubmitHandler}: PropsType) => {
  return (
      <form onSubmit={onSubmitHandler} className='bg-[#171717] rounded-xs border border-[#333] p-[24px] m-[auto]'>
        {children}
      </form>
  )
}

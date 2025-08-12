import React, { ReactNode } from 'react'

type PropsType = {
  children: ReactNode
  direction?: 'vertical' | 'horizontal' | 'both'
  className?: string
  alwaysShowScrollbar?: boolean
}

export const Scroll = ({ children, direction = 'vertical', className = '', alwaysShowScrollbar = true }: PropsType) => {
  const overflowClasses =
    direction === 'vertical'
      ? 'overflow-y-scroll overflow-x-hidden'
      : direction === 'horizontal'
        ? 'overflow-x-scroll overflow-y-hidden'
        : 'overflow-auto'

  const scrollbarGutter = alwaysShowScrollbar ? 'scrollbar-gutter-stable' : ''

  return <div className={`${overflowClasses} ${scrollbarGutter} ${className} scrollbar`}>{children}</div>
}

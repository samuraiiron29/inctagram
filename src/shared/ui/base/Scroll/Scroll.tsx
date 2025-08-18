import React, { ReactNode, useEffect, useRef, useState } from 'react'

type PropsType = {
  children: ReactNode
  direction?: 'vertical' | 'horizontal' | 'both'
  className?: string
  alwaysShowScrollbar?: boolean
}

export const Scroll = ({
  children,
  direction = 'vertical',
  className = '',
  alwaysShowScrollbar = true,
}: PropsType) => {
  const [scrolling, setScrolling] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let timeout: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      setScrolling(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setScrolling(false)
      }, 1000)
    }

    el.addEventListener('scroll', handleScroll)
    return () => {
      el.removeEventListener('scroll', handleScroll)
      clearTimeout(timeout)
    }
  }, [])

  const overflowClasses =
    direction === 'vertical'
      ? 'overflow-y-scroll overflow-x-hidden'
      : direction === 'horizontal'
      ? 'overflow-x-scroll overflow-y-hidden'
      : 'overflow-auto'

  const scrollbarGutter = alwaysShowScrollbar ? 'scrollbar-gutter-stable' : ''

  return (
    <div
      ref={scrollRef}
      className={`${overflowClasses} ${scrollbarGutter} ${className} ${
        scrolling ? 'scrollbar-visible' : 'scrollbar-hidden'
      }`}
    >
      {children}
    </div>
  )
}

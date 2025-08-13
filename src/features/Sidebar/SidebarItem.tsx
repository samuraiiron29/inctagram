'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { clsx } from 'clsx'
import { log } from 'node:util'
import { useAppDispatch } from '@/shared/lib/hooks'
import { setOpenCreate } from '@/store/slices/appSlice'

type Props = {
  item: {
    action?: string
    iconDefault: string
    iconHover: string
    iconActive: string
    href?: string
    label: string
    alt: string
    disabled?: boolean
    onClick?: () => void
  }
}
export const SidebarItem = ({ item }: Props) => {
  const pathname = usePathname()
  const isActive = pathname === item.href
  const [isHovered, setIsHovered] = useState(false)

  const dispatch = useAppDispatch()

  const getIcon = () => {
    if (item.disabled) return item.iconDefault
    if (isHovered) return item.iconHover
    if (isActive) return item.iconActive
    return item.iconDefault
  }

  return (
    <li
      onMouseEnter={() => !item.disabled && setIsHovered(true)}
      onMouseLeave={() => !item.disabled && setIsHovered(false)}
      className={clsx('group flex', item.disabled ? 'pointer-events-none opacity-50' : 'hover:text-accent-100')}
    >
      {item.href ? (
        <Link
          tabIndex={item.disabled ? -1 : 0}
          aria-disabled={item.disabled}
          onClick={item.onClick}
          href={item.href}
          className={clsx(
            'inline-flex gap-[12px] pr-[3px]',
            !item.disabled &&
              'border-2 border-transparent focus-visible:outline-none focus-visible:border-accent-100 focus-visible:rounded-[4px] focus-visible:border-2'
          )}
        >
          <Image src={getIcon()} alt={item.alt} width={24} height={24} />
          <span className={clsx(isActive && 'text-accent-500', !item.disabled && 'group-hover:text-accent-100', 'text-medium_text14')}>
            {item.label}
          </span>
        </Link>
      ) : item.action === 'create' ? (
        <button onClick={() => dispatch(setOpenCreate(true))} className={'inline-flex gap-[12px] pr-[3px]'}>
          <Image src={getIcon()} alt={item.alt} width={24} height={24} />
          create
        </button>
      ) : null}
    </li>
  )
}

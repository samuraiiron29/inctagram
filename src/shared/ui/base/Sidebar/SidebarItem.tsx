import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { clsx } from 'clsx'

type Props = {
  iconDefault: string
  iconHover: string
  iconActive: string
  href: string
  label: string
  alt: string
  disabled?: boolean
  onClick?: () => void
}
export const SidebarItem = ({ href, label, alt, iconDefault, onClick, iconActive, iconHover, disabled = false }: Props) => {
  const pathname = usePathname()
  const isActive = pathname === href
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    if (disabled) return iconDefault
    if (isHovered) return iconHover
    if (isActive) return iconActive
    return iconDefault
  }

  return (
    <li
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      className={clsx('group flex', disabled ? 'pointer-events-none opacity-50' : 'hover:text-accent-100')}
    >
      <Link
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={onClick}
        href={href}
        className={clsx(
          'inline-flex gap-[12px] pr-[3px]',
          !disabled &&
            'border-2 border-transparent focus-visible:outline-none focus-visible:border-accent-100 focus-visible:rounded-[4px] focus-visible:border-2'
        )}
      >
        <Image src={getIcon()} alt={alt} width={24} height={24} />
        <span className={clsx(isActive && 'text-accent-500', !disabled && 'group-hover:text-accent-100', 'text-medium_text14')}>
          {label}
        </span>
      </Link>
    </li>
  )
}

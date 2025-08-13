'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { PATH } from '@/shared/lib/path'

import { SidebarItem } from './SidebarItem'
import { Logout } from '@/features/auth/logout'
import { Button } from '@/shared/ui/base/Button'

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()

  const sidebarItemsPrimary = [
    {
      href: PATH.FEED,
      iconDefault: '/sidebarIcons/default/home.svg',
      iconHover: '/sidebarIcons/hover/home.svg',
      iconActive: '/sidebarIcons/active/home.svg',
      // label: 'Feed',
      label: t('sidebar.feed'),
      alt: t('sidebar.feed'),
    },
    {
      action: 'create',
      iconDefault: '/sidebarIcons/default/plus-square.svg',
      iconHover: '/sidebarIcons/hover/plus-square.svg',
      iconActive: '/sidebarIcons/active/plus-square.svg',
      label: t('sidebar.create'),
      alt: t('sidebar.create'),
    },
    {
      href: PATH.USERS.PROFILE,
      iconDefault: '/sidebarIcons/default/person.svg',
      iconHover: '/sidebarIcons/hover/person.svg',
      iconActive: '/sidebarIcons/active/person.svg',
      label: t('sidebar.myProfile'),
      alt: t('sidebar.myProfile'),
    },
    {
      href: PATH.MESSENGER,
      iconDefault: '/sidebarIcons/default/message-circle.svg',
      iconHover: '/sidebarIcons/hover/message-circle.svg',
      iconActive: '/sidebarIcons/active/message-circle.svg',
      label: t('sidebar.messenger'),
      alt: t('sidebar.messenger'),
    },
    {
      href: PATH.SEARCH,
      iconDefault: '/sidebarIcons/default/search.svg',
      iconHover: '/sidebarIcons/hover/search.svg',
      iconActive: '/sidebarIcons/active/search.svg',
      label: t('sidebar.search'),
      alt: t('sidebar.search'),
    },
  ]

  const sidebarItemsSecondary = [
    {
      href: PATH.STATISTICS,
      iconDefault: '/sidebarIcons/default/statistics.svg',
      iconHover: '/sidebarIcons/hover/statistics.svg',
      iconActive: '/sidebarIcons/active/statistics.svg',
      label: t('sidebar.statistics'),
      alt: t('sidebar.statistics'),
    },
    {
      href: PATH.FAVORITES,
      iconDefault: '/sidebarIcons/default/bookmark.svg',
      iconHover: '/sidebarIcons/hover/bookmark.svg',
      iconActive: '/sidebarIcons/active/bookmark.svg',
      label: t('sidebar.favorites'),
      alt: t('sidebar.favorites'),
    },
  ]

  return (
    <aside
      className={'fixed top-[60px] left-0 z-50 h-[100vh] pt-[72px] w-[220px] pb-[50px] pl-[60px] border-r border-dark-300'}
      aria-label="Main sidebar navigation"
    >
      <ul className="flex flex-col gap-[20px] justify-start">
        {sidebarItemsPrimary.map(item => (
          <SidebarItem key={`${item.href},${item.iconDefault}`} item={item} />
        ))}
        <div className={'flex flex-col gap-[20px] mt-[38px]'}>
          {sidebarItemsSecondary.map(item => (
            <SidebarItem key={`${item.href},${item.iconDefault}`} item={item} />
          ))}
        </div>
      </ul>
      <Button onClick={() => setShowModal(true)} className={'flex items-center justify-center gap-[15px] mt-[180px] cursor-pointer'}>
        <Image src={'/sidebarIcons/default/log-out.svg'} alt={''} width={'18'} height={'20'} />
        <span className={'text-medium_text14'}>{t('auth.logout')}</span>
      </Button>
      {showModal && <Logout showModal={showModal} setShowModal={setShowModal} />}
    </aside>
  )
}

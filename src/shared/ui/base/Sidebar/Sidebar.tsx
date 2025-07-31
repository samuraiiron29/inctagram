'use client'

import { SidebarItem } from '@/shared/ui/base/Sidebar/SidebarItem'
import { useState } from 'react'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useAppSelector } from '@/shared/lib/hooks/appHooks'
import { selectAppEmail } from '@/store/slices/appSlice'
import { Button } from '@/shared/ui/base/Button/Button'
import { useLogoutMutation } from '@/shared/api/authApi'
import { PATH } from '@/shared/lib/path/path'
import Image from 'next/image'

type Props = {}

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false)
  const email = useAppSelector(selectAppEmail)

  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      window.location.replace(PATH.AUTH.LOGIN)
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setShowModal(false)
    }
  }

  return (
    <aside
      className={'fixed top-[60px] left-0 z-50 h-[100vh] pt-[72px] w-[220px] pb-[50px] pl-[60px] border-r border-dark-300'}
      aria-label="Main sidebar navigation"
    >
      <ul className="flex flex-col gap-[20px] justify-start">
        <SidebarItem
          href="/feed"
          iconDefault={'/sidebarIcons/default/home.svg'}
          iconHover={'/sidebarIcons/hover/home.svg'}
          iconActive={'/sidebarIcons/active/home.svg'}
          label="Feed"
          alt={'Feed'}
        />
        <SidebarItem
          href="/posts"
          iconDefault={'/sidebarIcons/default/plus-square.svg'}
          iconHover={'/sidebarIcons/hover/plus-square.svg'}
          iconActive={'/sidebarIcons/active/plus-square.svg'}
          label="Create"
          alt={'Create'}
        />
        <SidebarItem
          href="/profile"
          iconDefault={'/sidebarIcons/default/person.svg'}
          iconHover={'/sidebarIcons/hover/person.svg'}
          iconActive={'/sidebarIcons/active/person.svg'}
          label="My Profile"
          alt={'My Profile'}
        />
        <SidebarItem
          href="/messenger"
          iconDefault={'/sidebarIcons/default/message-circle.svg'}
          iconHover={'/sidebarIcons/hover/message-circle.svg'}
          iconActive={'/sidebarIcons/active/message-circle.svg'}
          label="Messenger"
          alt={'Messenger'}
        />
        <SidebarItem
          href="/search"
          iconDefault={'/sidebarIcons/default/search.svg'}
          iconHover={'/sidebarIcons/hover/search.svg'}
          iconActive={'/sidebarIcons/active/search.svg'}
          label="Search"
          alt={'Search'}
        />
        <div className={'mt-[38px]'}>
          <SidebarItem
            href="/statistics"
            iconDefault={'/sidebarIcons/default/statistics.svg'}
            iconHover={'/sidebarIcons/hover/statistics.svg'}
            iconActive={'/sidebarIcons/active/statistics.svg'}
            label="Statistics"
            alt={'Statistics'}
          />
        </div>
        <SidebarItem
          href="/favorites"
          iconDefault={'/sidebarIcons/default/bookmark.svg'}
          iconHover={'/sidebarIcons/hover/bookmark.svg'}
          iconActive={'/sidebarIcons/active/bookmark.svg'}
          label="Favorites"
          alt={'Favorites'}
        />
        {/*<div className={'mt-[180px]'}>*/}
        {/*  <SidebarItem*/}
        {/*    href=""*/}
        {/*    iconDefault={'/sidebarIcons/default/log-out.svg'}*/}
        {/*    iconHover={'/sidebarIcons/hover/log-out.svg'}*/}
        {/*    iconActive={'/sidebarIcons/active/log-out.svg'}*/}
        {/*    label="Log out"*/}
        {/*    alt={'Log out'}*/}
        {/*    onClick={() => setShowModal(true)}*/}
        {/*  />*/}
        {/*</div>*/}
      </ul>
      <button onClick={() => setShowModal(true)} className={'flex items-center justify-center gap-[15px] mt-[180px]'}>
        <Image src={'/sidebarIcons/default/log-out.svg'} alt={''} width={'18'} height={'20'} />
        Log Out
      </button>
      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)} modalTitle={'Log Out'}>
          <p className={'text-amber-50'}>Are you sure you want to log out {email}?</p>
          <div className={''}>
            <div className={'flex gap-[15px] mt-[18px]'}>
              <Button variant={'outlined'} onClick={logoutHandler}>Yes</Button>
              <Button variant={'primary'}  onClick={() => setShowModal(false)}>No</Button>
            </div>
          </div>
        </Modal>
      )}
    </aside>
  )
}

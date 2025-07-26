'use client'

import { SidebarItem } from '@/shared/ui/base/Sidebar/SidebarItem'

type Props = {}

export default function Sidebar() {
  return (
    <aside
      className={
        'h-screen w-[220px] relative before:content-[""] ' +
        'before:absolute before:top-0 before:right-0 before:w-[1px] before:h-full ' +
        'before:bg-[var(--color-dark-300)] '
      }
      aria-label="Main sidebar navigation"
    >
      <ul className="flex flex-col gap-[20px] justify-start pl-[60px]">
        <div className={'mt-[72px]'}>
          <SidebarItem
            href="/feed"
            iconDefault={'/sidebarIcons/default/home.svg'}
            iconHover={'/sidebarIcons/hover/home.svg'}
            iconActive={'/sidebarIcons/active/home.svg'}
            label="Feed"
            alt={'Feed'}
          />
        </div>
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
          label="messenger"
          alt={'messenger'}
        />
        <SidebarItem
          href="/search"
          iconDefault={'/sidebarIcons/default/search.svg'}
          iconHover={'/sidebarIcons/hover/search.svg'}
          iconActive={'/sidebarIcons/active/search.svg'}
          label="Search"
          alt={'Search'}
          disabled
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
          label="favorites"
          alt={'favorites'}
        />
        <div className={'mt-[180px]'}>
          <SidebarItem
            href="/sign-in"
            iconDefault={'/sidebarIcons/default/log-out.svg'}
            iconHover={'/sidebarIcons/hover/log-out.svg'}
            iconActive={'/sidebarIcons/active/log-out.svg'}
            label="Log out"
            alt={'Log out'}
          />
        </div>
      </ul>
    </aside>
  )
}

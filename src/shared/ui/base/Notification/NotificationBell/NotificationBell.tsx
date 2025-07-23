import Image from 'next/image'
import React from 'react'

type Props = {
  notificationsCount?: number
}
export const NotificationBell = ({ notificationsCount = 1 }: Props) => {
  return (
    <div className="relative w-[24px] h-[24px] cursor-pointer">
      <Image src="/Bell.svg" alt="notifications" width={18} height={20} className="absolute bottom-0 left-0" />
      {notificationsCount > 0 && (
        <span className="absolute top-0 right-0 w-[13px] h-[13px] rounded-full bg-danger-500 accent-light-100 text-[10px] font-medium flex items-center justify-center">
          {notificationsCount > 9 ? '9+' : notificationsCount}
        </span>
      )}
    </div>
  )
}

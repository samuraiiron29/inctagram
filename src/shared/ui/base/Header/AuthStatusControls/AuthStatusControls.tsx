import { NotificationBell } from '@/shared/ui/base/Notification/NotificationBell/NotificationBell'
import { Select } from '@/shared/ui/base/Select/Select'
import React from 'react'

export type Props = {
  isLoggedIn: boolean
}

export const AuthStatusControls = ({ isLoggedIn }: Props) => {
  {
    /*todo заглушка на колбэке, написать потом колбэк в зависимости от нашей дальнешей логики работы приложения,
          т.е. сохранение например языка в локал сторадж, задиспатчить что-нибудь и тд*/
  }

  const handleLanguageChange = (value: string) => {
    console.log('Выбран язык:', value)
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-[45px]">
          <NotificationBell />
          <Select isLanguage value="English" onChange={handleLanguageChange} />
        </div>
      ) : (
        <div className="flex items-center gap-[36px]">
          <Select isLanguage value="English" onChange={handleLanguageChange} />
          <div className="flex gap-[24px]">
            {/* todo вставить кнопки как ребята доделают */}
            <button>Log In</button>
            <button>Sign Up</button>
          </div>
        </div>
      )}
    </>
  )
}

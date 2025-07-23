import { Select } from '@/shared/ui/base/Select/Select'

type Props = {
  isLoggedIn?: boolean
}

export const Header = ({ isLoggedIn = true }: Props) => {
  return (
    <div className={'mx-auto flex justify-between items-center max-w-[1280px] w-full h-[60px] px-[60px]'}>
      <span className={'text-large accent-light-100'}>Inctagram</span>
      <AuthStatusControls isLoggedIn={isLoggedIn} />
    </div>
  )
}

type AuthStatusControlsProps = {
  isLoggedIn: boolean
}

const AuthStatusControls = ({ isLoggedIn }: AuthStatusControlsProps) => {
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
          <div>🔔 Notifications</div>
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

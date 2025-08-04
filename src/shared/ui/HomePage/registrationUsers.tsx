'use client'

type Props = {
  count: string
}

export const RegistrationUsers = ({count}: Props) => {
  const totalCount = count.toString().padStart(6, '0')

  return (
    <div className={'flex items-center justify-between h-[72px] mb-[36px] py-0 px-[24px] border border-dark-100 bg-dark-500'}>
      <h1 className={'text-h2'}>Registered users:</h1>
      <div className={'flex items-center space-x-1 bg-black p-[12px] rounded border border-dark-100'}>
        {totalCount?.split('').flatMap((digit, index, array) => [
          <span key={`digit-${index}`} className={'text-h2 px-[5px]'}>{digit}</span>,
          index < array.length - 1 && (
            <span key={`separator-${index}`} className={'w-[1px] h-[30px] bg-dark-100'} />
          ),
        ])}
      </div>
    </div>
  )
}
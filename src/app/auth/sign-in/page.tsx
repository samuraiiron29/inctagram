'use client'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Input } from '@/shared/ui/base/Input/Input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <>
      <Cards onSubmitHandler={() => {}}>
        <div>Sign In</div>
        <div className={'flex flex-row justify-around'}>
          <div>
            <Link href="/">
              <Image src={'/google.svg'} alt="google" width={36} height={36} />
            </Link>
          </div>
          <div>
            <Link href="/">
              <Image src={'/git_logo.svg'} alt="google" width={36} height={36} />
            </Link>
          </div>
        </div>
        <span>Email</span>
        <Input type="email" name={'email'} />
        <span>Password</span>
        <Input type="password" name={'password'} />
      </Cards>
    </>
  )
}

export default Page
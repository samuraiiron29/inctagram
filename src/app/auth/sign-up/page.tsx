'use client'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Button, Text } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { useForm, Controller } from 'react-hook-form'
import type { Error, ZodInputs } from '@/shared/lib/types'
import Checkbox from '@/shared/ui/base/CheckBox/CheckBox'
import { useSignInMutation } from '@/shared/api'

import { registrationSchema } from '@/shared/lib/schemas'

const Page = () => {
  const handleGitHubLogin = () => {
    const redirectUrl = 'http://localhost:3000/auth/github'
    const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`
    window.location.href = loginUrl
  }
  const [singIn] = useSignInMutation()
  const fieldClassName = 'flex-col gap-3'
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<ZodInputs>({
    resolver: zodResolver(registrationSchema),
    mode: 'all',
    defaultValues: {
      firstName: 'Qwerty',
      email: 'aaaa@mail.com',
      password: 'Qwerty12345!@#',
      confirmPassword: 'Qwerty12345!@#',
      rememberMe: false,
    },
    shouldFocusError: true,
  })

  const onSubmit = async (data: ZodInputs) => {
    try {
      await singIn({ userName: data.firstName, email: data.email, password: data.password }).unwrap()
      reset({
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
      })
    } catch (error) {
      const er = error as Error
      // console.log(er)
      // throw error
      if (er.status === 400 && er.data.messages.length > 0) {
        const message = er.data.messages[0].message
        // debugger
        if (message.includes('email')) {
          // debugger
          setError('email', { type: 'server', message: er.data.messages[0].message })
        } else if (message.includes('userName')) {
          setError('firstName', { message: er.data.messages[0].message })
        } else {
          console.log('unknown error')
          setError('root', { message: 'unknown error' })
        }
      } else {
        console.log('servers error', error)
      }
    }
  }
  return (

    <div className={'flex flex-col items-center my-[20px] '}>
      <div>Sign Up</div>
      <div className={'flex flex-col items-center bg-accent-100 rounded py-[16px]'}>
        <p>Sign Up using GitHub</p>
        <Image
          onClick={handleGitHubLogin}
          src="/oauthIcons/github.svg"
          alt="GitHub auth"
          width={36}
          height={36}
          className="cursor-pointer"
        />
      </div>
    </div>

    // <div className={'flex flex-col items-center my-[20px] '}>
    //   <div>Sign Up</div>
    //   <div className={'flex flex-col items-center bg-accent-100 rounded py-[16px]'}>
    //     <p>Sign Up using GitHub</p>
    //     <Image
    //       onClick={handleGitHubLogin}
    //       src="/oauthIcons/github.svg"
    //       alt="GitHub auth"
    //       width={24}
    //       height={24}
    //       className="cursor-pointer"
    //     />
    //   </div>
    // </div>
    <Registration />

  )
}

export default Page

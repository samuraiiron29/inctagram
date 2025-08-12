'use client'
<<<<<<< HEAD
import { useLoginMutation } from '@/shared/api'
import { useAppDispatch } from '@/shared/lib/hooks'
import { PATH } from '@/shared/lib/path'
import { loginSchema } from '@/shared/lib/schemas'
import { loginType } from '@/shared/lib/types/zodLoginTypes'
import { setCookie } from '@/shared/lib/utils/cookieUtils'
import { Button } from '@/shared/ui/base/Button/Button'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Input } from '@/shared/ui/base/Input/Input'
import { setIsLoggedIn } from '@/store/slices/appSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
=======
import { useSignInMutation } from '@/shared/api'
import { PATH } from '@/shared/lib/path'
import type { Error } from '@/shared/lib/types'
import { Flex, Button, Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
>>>>>>> 202b5f44cd380c8f61f6358bf2410bbc132446cb

import { Form } from 'radix-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
export type SignInArgs = {
  email: string
  password: string
}
function Page() {
<<<<<<< HEAD

  const [login] = useLoginMutation()

  const dispatch = useAppDispatch()

  const handleGitHubLogin = () => {
      // const GITHUB_REDIRECT_URL = 'http://localhost:3000/auth/github'
      const redirect_url = process.env.NODE_ENV === 'development' ? PATH.AUTH.GITHUB_REDIRECT_URL_DEV : PATH.AUTH.GITHUB_REDIRECT_URL_PROD
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirect_url}`
    }
    const handleGoogleLogin = () => {
      const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
      // const GOOGLE_REDIRECT_URL = 'http://localhost:3000/auth/google'
      const redirect_url = process.env.NODE_ENV === 'development' ? PATH.AUTH.GOOGLE_REDIRECT_URL_DEV : PATH.AUTH.GOOGLE_REDIRECT_URL_PROD
      const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&response_type=code&redirect_uri=${redirect_url}&client_id=${CLIENT_ID}`
      window.location.assign(url)
    }

  const methods = useForm<loginType>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: "" },
    })

  // const onSubmitHandler = async (data: loginType) => {
  //     try {
  //       await login({userName: '', email: data.email, password: data.password }).unwrap()
  //       methods.reset({
  //         email: '',
  //         password: '',
  //       })
  //     } catch (error) {
  //       const er = error as Error
  //       if (er.status === 400 && er.data.messages.length > 0) {
  //         const message = er.data.messages[0].message
  
  //         if (message.includes('email')) {
  //           methods.setError('email', { type: 'server', message: er.data.messages[0].message })
  //         }
  //         else {
  //           methods.setError('root', { message: 'unknown error' })
  //         }
  //       } else {
  //       }
  //     }
  //   }

    const onSubmitHandler = (data: loginType) => {
    login(data).then((res) => {
      if (res.data) {
        dispatch(setIsLoggedIn(true))
        methods.reset()
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <Cards onSubmit={methods.handleSubmit(onSubmitHandler)}>
        <div>Sign In</div>
        <div className={'flex flex-row justify-around'}>
          <div className={'flex items-center gap-16 mt-[13px] mb-[24px]'}>
            <Image onClick={handleGitHubLogin} src="/git_logo.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" />
            <Image src="/google.svg" alt="Google auth" width={36} height={36} className="cursor-pointer" onClick={handleGoogleLogin} />
          </div>
        </div>
        <span>Email</span>
        <Input name='email' label='email' type="email" />
        <span>Password</span>
        <Input name='password' label='password' type="password" />
        <Button type="submit" width='100%' >
          Sign In
        </Button>
      </Cards>
    </FormProvider>
=======
  const handleGitHubLogin = () => {
    const redirectUrl = 'http://localhost:3000/auth/github'
    const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`
    window.location.href = loginUrl
  }
  const router = useRouter()
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
  } = useForm<SignInArgs>({
    mode: 'all',
    defaultValues: {
      email: 'aaaa@mail.com',
      password: 'Qwerty12345!@#',
    },
    shouldFocusError: true,
  })

  const onSubmit = async (data: SignInArgs) => {
    try {
      await singIn({ email: data.email, password: data.password }).unwrap()
      router.push(PATH.HOME)
      reset({
        email: '',
        password: '',
      })
    } catch (error) {
      const er = error as Error<string>

      if (er.status === 400) {
        const message = er.data.messages
        if (message.includes('email')) {
          setError('password', { type: 'server', message })
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
    <div>
      {/* <div className={'flex flex-col items-center my-[20px] '}>
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
      />

        </div>
</div> */}

      <Flex direction={'column'} align={'center'} className="bg-dark-100 p-5 m-5 rounded-3xl">
        <span>Sign Up</span>
        <Flex gap={'2'}>
          <Button children={'Gmail'} />
          <Button children={'GitHub'} />
        </Flex>
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <Form.Field name="email">
            <Flex className={fieldClassName}>
              <Form.Label children={<span>Email</span>} />
              <Form.Control asChild children={<input type="email" autoComplete="email" {...register('email')} />} />
            </Flex>
            {errors.email && (
              <Text color="red" size="1">
                {errors.email?.message}
              </Text>
            )}
          </Form.Field>

          <Form.Field name="password">
            <Flex className={fieldClassName}>
              <Form.Label children={<span>Password</span>} />
              <Form.Control asChild children={<input type="text" autoComplete="password" {...register('password')} />} />
              {errors.password && (
                <Text color="red" size="1">
                  {errors.password?.message}
                </Text>
              )}
            </Flex>
          </Form.Field>

          <Form.Submit asChild children={<Button type="submit" variant="classic" disabled={!isValid} children={'Sign Up'} />} />
        </Form.Root>
      </Flex>
    </div>
>>>>>>> 202b5f44cd380c8f61f6358bf2410bbc132446cb
  )
}

export default Page

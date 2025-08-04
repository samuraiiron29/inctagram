'use client'
import { useSignInMutation } from '@/shared/api'
import { PATH } from '@/shared/lib/path'
import type { Error } from '@/shared/lib/types'
import { Flex, Button, Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

import { Form } from 'radix-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
export type SignInArgs = {
  email: string
  password: string
}
function Page() {
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

        <span>Do you have an account?</span>
        <Flex className="text-accent-500">Sing In</Flex>
      </Flex>
    </div>
  )
}

export default Page

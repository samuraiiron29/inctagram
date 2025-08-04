'use client'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Button, Text } from '@radix-ui/themes'
import { Form } from 'radix-ui'
import { useForm, Controller } from 'react-hook-form'
import type { Error, ZodInputs } from '@/shared/lib/types'
import Checkbox from '@/shared/ui/base/CheckBox/CheckBox'
import { useSignUpMutation } from '@/shared/api'

import { registrationSchema } from '@/shared/lib/schemas'

const Page = () => {
  const handleGitHubLogin = () => {
    const redirectUrl = 'http://localhost:3000/auth/github'
    const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`
    window.location.href = loginUrl
  }
  const [singUp] = useSignUpMutation()
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
      await singUp({ userName: data.firstName, email: data.email, password: data.password }).unwrap()
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
    <div>
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

      <Flex direction={'column'} align={'center'} className="bg-dark-100 p-5 m-5 rounded-3xl">
        <span>Sign Up</span>
        <Flex gap={'2'}>
          <Button children={'Gmail'} />
          <Button children={'GitHub'} />
        </Flex>
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <Form.Field name="firstName">
            <Flex className={fieldClassName}>
              <Form.Label children={<span>Username</span>} />
              <Form.Control
                asChild
                children={<input type="text" autoComplete="firstName" {...register('firstName')} />}
                placeholder="Hello"
              />
              {errors.firstName && (
                <Text color="red" size="1">
                  {errors.firstName?.message}
                </Text>
              )}
            </Flex>
          </Form.Field>

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

          <Form.Field name="confirmPassword">
            <Flex className={fieldClassName}>
              {/* <h1>Qwerty1234!2</h1> */}
              <Form.Label children={<span>confirmPassword</span>} />
              <Form.Control asChild children={<input type="text" autoComplete="confirmPassword" {...register('confirmPassword')} />} />
              {errors.confirmPassword && (
                <Text color="red" size="1">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </Flex>
          </Form.Field>

          <Flex>
            <Controller
              {...register('rememberMe')}
              name="rememberMe"
              control={control}
              render={({ field }) => {
                return <Checkbox checked={field.value} onChange={checked => field.onChange(checked)} />
              }}
            />
            <Text>
              <span>I agree to the </span>
              <Button variant="ghost">
                <span>Terms of Service</span>
              </Button>
              <span>and</span>
              <Button variant="ghost">
                <span>Privacy Policy</span>
              </Button>
            </Text>
          </Flex>
          <Form.Submit asChild children={<Button type="submit" variant="classic" disabled={!isValid} children={'Sign Up'} />} />
        </Form.Root>

        <span>Do you have an account?</span>
        <Flex className="text-accent-500">Sing In</Flex>
      </Flex>
    </div>
  )
}

export default Page

'use client'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import type { Error, ZodInputs } from '@/shared/lib/types'
import Checkbox from '@/shared/ui/base/CheckBox/CheckBox'
import { useSignUpMutation } from '@/shared/api'

import { registrationSchema } from '@/shared/lib/schemas'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Input } from '@/shared/ui/base/Input/Input'
import { Button } from '@/shared/ui/base/Button/Button'
import { useState } from 'react'
import { Modal } from '@/shared/ui/Modal/Modal'

const Page = () => {
  const handleGitHubLogin = () => {
    const redirectUrl = 'http://localhost:3000/auth/github'
    const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`
    window.location.href = loginUrl
  }
  const [singUp] = useSignUpMutation()
  const methods = useForm<ZodInputs>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  })

  const [isModal, setIsModal] = useState(false)
  const [email, setEmail] = useState('')

  const onSubmit = async (data: ZodInputs) => {
    try {
      debugger
      await singUp({ userName: data.firstName, email: data.email, password: data.password }).unwrap()
      methods.reset({
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
      })
      setEmail(data.email)
      setIsModal(true)
    } catch (error) {
      const er = error as Error
      if (er.status === 400 && er.data.messages.length > 0) {
        const message = er.data.messages[0].message

        if (message.includes('email')) {
          methods.setError('email', { type: 'server', message: er.data.messages[0].message })
        } else if (message.includes('userName')) {
          methods.setError('firstName', { message: er.data.messages[0].message })
        } else {
          console.log('unknown error')
          methods.setError('root', { message: 'unknown error' })
        }
      } else {
        console.log('servers error', error)
      }
    }
  }
  return (
    <div>
      <FormProvider {...methods}>
        <Cards onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={'flex flex-col items-center my-[20px]'}>
            <div>Sign Up</div>
            <div className={'flex items-center gap-16 mt-[13px] mb-[24px]'}>
              <Image onClick={handleGitHubLogin} src="/git_logo.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" />
              <Image src="/google.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" />
            </div>
            <Input type={'default'} name="firstName" width={'300px'} />
            <Input type="email" name="email" width={'300px'} />
            <Input type="password" name="password" width={'300px'} />
            <Input type={'default'} name="confirmPassword" width={'300px'} />
            <Controller
              {...methods.register('rememberMe')}
              name="rememberMe"
              control={methods.control}
              render={({ field }) => {
                return (
                  <Checkbox
                    checked={field.value}
                    onChange={checked => field.onChange(checked)}
                    label={'I agree to the Terms of Service and Privacy Policy'}
                  />
                )
              }}
            />
            <Button type="submit" variant={'primary'} disabled={!methods.formState.isValid} width={'100%'}>
              Sign Up
            </Button>
            <p>Do you have an account?</p>
            <Button variant={'textButton'} children={'Sign In'} width={'100%'} />
          </div>
        </Cards>
      </FormProvider>
      {isModal && (
        <Modal open={isModal} onClose={() => setIsModal(false)} modalTitle={'Email sent'}>
          <p>We have sent a link to confirm your email to {email} </p>
          <Button children={'Ok'} onClick={() => setIsModal(false)} /> {/* todo: или роутер.пуш на страницу авторизации*/}
        </Modal>
      )}
    </div>
  )
}

// Qwerty12345!@#

export default Page

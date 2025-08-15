'use client'
import Image from 'next/image'
import { Controller, FormProvider } from 'react-hook-form'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Cards } from '@/shared/ui/base/Cards/Cards'
import { Input } from '@/shared/ui/base/Input/Input'
import { Button } from '@/shared/ui/base/Button/Button'
import Checkbox from '@/shared/ui/base/CheckBox/CheckBox'
import { useSignUp } from '../model/useSignUp'

export const SignUp = () => {
  const {
    methods,
    onSubmit,
    handlerLogin,
    handleGitHubLogin,
    handleGoogleLogin,
    closeModal,
    ui: { signUpText, isModal, email },
  } = useSignUp()

  return (
    <div className="mt-4 w-[378px] h-[678px]">
      <FormProvider {...methods}>
        <Cards onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center my-[20px]">
            <span className="text-h1">{signUpText.signUp}</span>

            <div className="flex items-center gap-16 mt-[13px] mb-[24px]">
              <Image src="/git_logo.svg" alt="GitHub auth" width={36} height={36} className="cursor-pointer" onClick={handleGitHubLogin} />
              <Image src="/google.svg" alt="Google auth" width={36} height={36} className="cursor-pointer" onClick={handleGoogleLogin} />
            </div>

            <Input type="default" name="firstName" width="300px" label={signUpText.username} />
            <Input type="email" name="email" width="300px" label={signUpText.email} />
            <Input type="password" name="password" width="300px" label={signUpText.password} />
            <Input type="password" name="confirmPassword" width="300px" label={signUpText.passwordConfirm} />

            <Controller
              {...methods.register('rememberMe')}
              name="rememberMe"
              control={methods.control}
              render={({ field }) => (
                <div className="flex justify-center text-center w-full my-4 gap-3">
                  <Checkbox checked={field.value} onChange={checked => field.onChange(checked)} />
                  {signUpText.agree()}
                </div>
              )}
            />
            <Button type="submit" variant="primary" width="100%" disabled={!methods.formState.isValid} children={signUpText.signUp} />

            <p className="mt-2.5">{signUpText.doYouHaveAnAccount}</p>
            <span className="text-h3 text-accent-500 cursor-pointer" onClick={handlerLogin}>
              {signUpText.signIn}
            </span>
          </div>
        </Cards>
      </FormProvider>

      <Modal open={isModal} onClose={closeModal} modalTitle={signUpText.emailSent}>
        <div className="flex flex-col">
          <p className="pb-4">{`${signUpText.weHaveSent} ${email}`}</p>
          <div className="flex justify-end">
            <Button onClick={closeModal} children={'OK'} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

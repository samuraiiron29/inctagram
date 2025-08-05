// src/features/Auth/lib/text.ts

import { PATH } from '@/shared/lib/path'
import type { TFunction } from 'i18next'
import { useRouter } from 'next/navigation'

export const useSignUpText = (t: TFunction) => {
  const router = useRouter()

  return {
    signUp: t('auth.signUp'),
    signIn: t('auth.signIn'),
    username: t('auth.username'),
    email: t('auth.email'),
    password: t('auth.password'),
    passwordConfirm: t('auth.passwordConfirm'),
    doYouHaveAnAccount: t('auth.additionalElements.doYouHaveAnAccount'),
    weHaveSent: t('auth.additionalElements.weHaveSent'),
    emailSent: t('auth.emailSent'),
    agree: () => (
      <div className="inline-flex justify-center items-center text-center flex-wrap gap-x-1">
        <p className="text-small_text">{t('auth.additionalElements.iAgreeToThe')} </p>
        <p className="text-small-link cursor-pointer" onClick={() => router.push(PATH.AUTH.TERMS_OF_SERVICE)}>
          {t('auth.termsOfService')}
        </p>
        <p className="text-small_text"> {t('auth.additionalElements.and')} </p>
        <p className="text-small-link cursor-pointer" onClick={() => router.push(PATH.AUTH.PRIVACY_POLICY)}>
          {t('auth.privacyPolicy')}
        </p>
      </div>
    ),
  }
}

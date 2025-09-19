import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PATH } from './shared/lib/path'


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value

  const i18n = request.cookies.get('i18n')?.value

  const response = NextResponse.next()

  const alwaysPublicPaths: (string | RegExp)[] = [PATH.HOME]

  const publicPathsForGuestsOnly: (string | RegExp)[] = [
    PATH.LOGIN,
    PATH.SIGNUP,
    PATH.FORGOT_PASSWORD,
    PATH.RECOVERY,
    PATH.RECOVERY_RESENDING,
    PATH.PRIVACY_POLICY,
    PATH.REGISTRATION_CONFIRMATION,
    PATH.REGISTRATION_EMAIL_RESENDING,
    PATH.TERMS_OF_SERVICE,
  ]

  const protectedPaths: (string | RegExp)[] = ['/profile', '/messages']

  if (!i18n) {
    response.cookies.set('i18n', 'en', { path: '/', maxAge: 60 * 60 * 24 * 7 })
  }

  // Проверка на совпадение по строке или RegExp - читаем подробнее с чатом
  const matches = (paths: (string | RegExp)[]) =>
    paths.some(path => (typeof path === 'string' ? pathname.startsWith(path) : path.test(pathname)))

  const isPublicForGuestsOnly = matches(publicPathsForGuestsOnly)
  const isAlwaysPublic = matches(alwaysPublicPaths)
  const isProtected = matches(protectedPaths) // на будущее

  // Авторизован и пытается попасть на гостевую страницу — редирект на главную
  if (accessToken && isPublicForGuestsOnly) {
    return NextResponse.redirect(new URL(PATH.HOME, request.url))
  }

  // Не авторизован и пытается попасть в ЛК — редирект на логин
  if (!accessToken && !isPublicForGuestsOnly && !isAlwaysPublic) {
    return NextResponse.redirect(new URL(PATH.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

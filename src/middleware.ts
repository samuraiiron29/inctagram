import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PATH } from '@/shared/lib/path/path'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value

  const alwaysPublicPaths: (string | RegExp)[] = [
    PATH.HOME,
  ]

  const publicPathsForGuestsOnly: (string | RegExp)[] = [
    PATH.AUTH.LOGIN,
    PATH.AUTH.SIGNUP,
    PATH.AUTH.FORGOT_PASSWORD,
    PATH.AUTH.RECOVERY,
    PATH.AUTH.RECOVERY_RESENDING,
    PATH.AUTH.PRIVACY_POLICY,
    PATH.AUTH.REGISTRATION_CONFIRMATION,
    PATH.AUTH.REGISTRATION_EMAIL_RESENDING,
    PATH.AUTH.TERMS_OF_SERVICE,
  ]

  const protectedPaths: (string | RegExp)[] = [
    '/profile',
    '/messages',
  ]

  // Проверка на совпадение по строке или RegExp - читаем подробнее с чатом
  const matches = (paths: (string | RegExp)[]) =>
    paths.some((path) =>
      typeof path === 'string' ? pathname.startsWith(path) : path.test(pathname)
    )

  const isPublicForGuestsOnly = matches(publicPathsForGuestsOnly)
  const isAlwaysPublic = matches(alwaysPublicPaths)
  const isProtected = matches(protectedPaths) // на будущее

  // Авторизован и пытается попасть на гостевую страницу — редирект на главную
  if (accessToken && isPublicForGuestsOnly) {
    return NextResponse.redirect(new URL(PATH.HOME, request.url))
  }

  // Не авторизован и пытается попасть в ЛК — редирект на логин
  if (!accessToken && !isPublicForGuestsOnly && !isAlwaysPublic) {
    return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

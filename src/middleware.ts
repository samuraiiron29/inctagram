import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PATH } from './shared/lib/path'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const refreshToken = request.cookies.get('refreshToken')?.value
  const i18n = request.cookies.get('i18n')?.value

  const response = NextResponse.next()

  if (refreshToken) {
    response.headers.set('x-refresh-token-valid', 'true')
  }

  const alwaysPublicPaths = [PATH.HOME]
  const publicPathsForGuestsOnly = [
    PATH.LOGIN, PATH.SIGNUP, PATH.FORGOT_PASSWORD, PATH.RECOVERY,
  ]
  const protectedPaths = ['/profile', '/messages']

  const matches = (paths: (string | RegExp)[]) =>
    paths.some(path => (typeof path === 'string' ? pathname.startsWith(path) : path.test(pathname)))

  const isPublicForGuestsOnly = matches(publicPathsForGuestsOnly)
  const isAlwaysPublic = matches(alwaysPublicPaths)
  const isProtected = matches(protectedPaths)

  if (refreshToken && isPublicForGuestsOnly) {
    return NextResponse.redirect(new URL(PATH.HOME, request.url))
  }

  if (!refreshToken && (isProtected || (!isAlwaysPublic && !isPublicForGuestsOnly))) {
    return NextResponse.redirect(new URL(PATH.LOGIN, request.url))
  }

  if (!i18n) {
    response.cookies.set('i18n', 'en', { path: '/', maxAge: 60 * 60 * 24 * 7 })
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

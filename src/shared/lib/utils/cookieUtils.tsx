'use client'
type CookieOpts = {
  days?: number
  path?: string
  domain?: string
}
export const setCookie = (name: string, value: string, days: number = 7, opts: CookieOpts = {}) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  const path = opts.path ?? '/'
  const domain = opts.domain ? `; domain=${opts.domain}` : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}${domain}`
}

export const getCookie = (name: string): string => {
  if (typeof document === 'undefined') return ''
  return document.cookie.split('; ').reduce((acc, c) => {
    const [k, v] = c.split('=')
    return k === name ? decodeURIComponent(v) : acc
  }, '')
}
export const deleteCookie = (name: string) => {

  const exp = 'Thu, 01 Jan 1970 00:00:00 GMT'
  const path = 'path=/'
  document.cookie = `${name}=; expires=${exp}; ${path}`
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    document.cookie = `${name}=; expires=${exp}; ${path}; domain=${host}`
    if (host.includes('.')) {
      document.cookie = `${name}=; expires=${exp}; ${path}; domain=.${host}`
    }
  }
}
// export const setCookie = (name: string, value: string, days: number) => {
//   const expires = new Date(Date.now() + days * 864e5).toUTCString()
//   document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
// }
// export const getCookie = (name: string): string => {
//   if (typeof document === 'undefined') return ''
//   return document.cookie.split('; ').reduce((acc, c) => {
//     const [k, v] = c.split('=')
//     return k === name ? decodeURIComponent(v) : acc
//   }, '')
// }
// export const deleteCookie = (name: string) => setCookie(name, '', -1)
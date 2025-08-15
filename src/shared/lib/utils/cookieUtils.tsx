'use client'

export const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

export const getCookie = (name: string): string => {
  if (typeof document === 'undefined') return ''

  return document.cookie.split('; ').reduce((acc, c) => {
    const [k, v] = c.split('=')
    return k === name ? decodeURIComponent(v) : acc
  }, '')
}

export const deleteCookie = (name: string) => {
  setCookie(name, '', -1)
}

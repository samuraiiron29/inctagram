import { BASE_URL, OAUTH_URL } from '@/shared/const'

export const oauth = () => window.location.assign(`${BASE_URL}auth/github/login?redirect_url=${OAUTH_URL}github`)

// type Provider = 'github' | 'google'
// const handleGoogleLogin = () => {
// const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
// const GOOGLE_REDIRECT_URL = 'http://localhost:3000/auth/google'
//   const redirectUrl = process.env.NODE_ENV === 'development' ? PATH.GOOGLE_REDIRECT_URL_DEV : PATH.GOOGLE_REDIRECT_URL_PROD
//   const url =
//     `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile` +
//     `&response_type=code&redirect_uri=${encodeURIComponent(redirectUrl)}` +
//     `&client_id=${clientId}`
//   window.location.assign(url)
// }

//   GITHUB_REDIRECT_URL_DEV: 'http://localhost:3000/github',
//   GITHUB_REDIRECT_URL_PROD: `https://pictory.space/github`,
// old
// GITHUB_REDIRECT_URL_PROD: `${process.env.NEXT_PUBLIC_BASE_URL}auth/github`,
// GOOGLE_REDIRECT_URL_DEV: 'http://localhost:3000/google',
// GOOGLE_REDIRECT_URL_PROD: `${process.env.NEXT_PUBLIC_BASE_URL}google`,

// const handleGitHubLogin = () => {
//   const redirectUrl = PATH.GITHUB_REDIRECT_URL_DEV
//   window.location.assign(`${process.env.NEXT_PUBLIC_BASE_URL}auth/github/login?redirect_url=${redirectUrl}`)
// }
// const handleGoogleLogin = () => {
//   const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
//   // const GOOGLE_REDIRECT_URL = 'http://localhost:3000/google'
//   const redirect_url = process.env.NODE_ENV === 'development' ? PATH.GOOGLE_REDIRECT_URL_DEV : PATH.GOOGLE_REDIRECT_URL_PROD
//   const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&response_type=code&redirect_uri=${redirect_url}&client_id=${CLIENT_ID}`
//   window.location.assign(url)
// }

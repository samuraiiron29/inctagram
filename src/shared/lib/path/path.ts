export const PATH = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/sign-in',
    SIGNUP: '/auth/sign-up',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RECOVERY: '/auth/recovery',
    RECOVERY_RESENDING: '/auth/recovery-resending',
    REGISTRATION_CONFIRMATION: '/auth/registration-confirmation',
    REGISTRATION_EMAIL_RESENDING: '/auth/registration-email-resending',
    TERMS_OF_SERVICE: '/auth/sign-up/terms-of-service',
    PRIVACY_POLICY: '/auth/sign-up/privacy-policy',
    GITHUB_REDIRECT_URL_DEV: 'http://localhost:3000/auth/github',

    // GITHUB_REDIRECT_URL_PROD: `${process.env.NEXT_PUBLIC_BASE_URL}auth/github`,
    GITHUB_REDIRECT_URL_PROD: `https://pictory.space/auth/github`,

    GOOGLE_REDIRECT_URL_DEV: 'http://localhost:3000/auth/google',
    GOOGLE_REDIRECT_URL_PROD: `${process.env.NEXT_PUBLIC_BASE_URL}auth/google`,
  },
  USERS: {
    PROFILE: '/users/profile',
    PROFILE_USERID: (userId: number) => `/users/profile/${userId}`,
    PROFILE_SETTINGS: (userId: number) => `/users/profile/${userId}/settings`,
  },

  FEED: '/users/feed',
  POSTS: '/posts',
  MESSENGER: '/messenger',
  SEARCH: '/search',
  STATISTICS: '/statistics',
  FAVORITES: '/favorites',
}

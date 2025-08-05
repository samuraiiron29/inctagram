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
  },
  USERS: {
    PROFILE: '/users/profile',
    PROFILE_USERID: (userId: number) => `/users/profile/${userId}`,
    PROFILE_SETTINGS: (userId: number) => `/users/profile/${userId}/settings`,
  },

  FEED: '/feed',
  POSTS: '/posts',
  MESSENGER: '/messenger',
  SEARCH: '/search',
  STATISTICS: '/statistics',
  FAVORITES: '/favorites',
}

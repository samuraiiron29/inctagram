import 'i18next'

export interface I18nResources {
  translation: {
    header: {
      mainLogo: string
      language: string
    }
    sidebar: {
      feed: string
      create: string
      myProfile: string
      messenger: string
      search: string
      statistics: string
      favorites: string
    }
    auth: {
      email: string
      password: string
      passwordConfirm: string
      username: string
      signIn: string
      signUp: string
      logout: string
      termsOfService: string
      privacyPolicy: string
      emailSent: string
      additionalElements: {
        doYouHaveAnAccount: string
        iAgreeToThe: string
        and: string
        weHaveSent: string
      }
      errors: {
        emailAlreadyRegistered: string
        emailIncorrect: string
        usernameMaxCharacters: string
        usernameMinCharacters: string
        usernameCharacters: string
        passwordMaxCharacters: string
        passwordMinCharacters: string
        passwordsMatch: string
        passwordCharacters: string
        termsAccept: string
      }
    }
    post: {
      editPost: string
      deletePost: string
      addPublicationDescriptions: string
    }
    button: {
      saveChanges: string
    }
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: I18nResources
  }
}

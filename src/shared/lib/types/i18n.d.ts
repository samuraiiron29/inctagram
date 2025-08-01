import 'i18next'

export interface I18nResources {
  translation: {
    header: {
      mainLogo: string
      buttons: {
        login: string
        sign: string
      }
    }
    sidebar: {
      feed: string
      create: string
      'my profile': string
      messenger: string
      search: string
      statistics: string
      favorites: string
      logout: string
    }
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: I18nResources
  }
}

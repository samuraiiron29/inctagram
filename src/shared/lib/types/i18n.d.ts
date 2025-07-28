import 'i18next'

export interface I18nResources {
  translation: {
    "header": {
      "buttons": {
        "login": string,
        "sign": string
      }
    }
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: I18nResources
  }
}

export type SignInResponse = {
  userName: string
  email: string
  password: string
}
export type LoginResponse = {
  email: string
  password: string
}

export type Error<T = ErrorMessage[]> = {
  data: {
    statusCode: number
    messages: T
    error: string
  }
  status: number
}
export type ErrorMessage = {
  message: string
  field: string
}
export enum StatusCode {
  'error' = 0,
}

export type SingInResponse = {
  userName: string
  email: string
  password: string
}

export type Error = {
  statusCode: StatusCode
  messages: ErrorMessage[]
  error: string
}
export type ErrorMessage = {
  message: string
  field: string
}
export enum StatusCode {
  'error' = 0,
}

export type SingInResponse = {
  userName: string
  email: string
  password: string
}

export type Error = {
  data: {
    statusCode: number
    messages: ErrorMessage[]
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

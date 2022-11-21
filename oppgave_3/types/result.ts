export type Data<T> = {
  status: number
  data: T
}

export type Error = {
  status: number
  message: string
}

export type Result<T> = Data<T> | Error
export type ResultAsync<T> = Promise<Result<T>>

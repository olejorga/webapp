export type Result<Data = undefined> = {
  status: number
  data?: Data
  error?: string
}

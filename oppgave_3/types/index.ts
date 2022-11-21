export type Data<T> = { status: number; data: T }
export type Error = { status: number; message: string }

export type Result<T> = Data<T> | Error
export type ResultAsync<T> = Promise<Result<T>>

export type Employee = {
  id: string
  name: string
  rules: string
  days: Day[]
  alterations: Alteration[]
}

export type Day = {
  id: string
  name: string
  employee: Employee
  employeeId: string
  week: Week
  weekId: string
  alteration?: Alteration
}

export type Week = {
  id: string
  number: number
  days: Day[]
}

export type Alteration = {
  id: string
  day: Day
  dayId: string
  employee: Employee
  employeeId: string
}

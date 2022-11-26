export type Employee = {
  id: string
  name: string
  rules: string
  days?: Day[]
  overrides?: Day[]
}

export type Day = {
  id: string
  name: string
  employee?: Employee | null
  employeeId: string | null
  week?: Week
  weekId: string
  override?: Employee | null
  overrideId: string | null
}

export type Week = {
  id: string
  number: number
  days?: Day[]
}

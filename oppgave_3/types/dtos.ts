import { Alteration, Day, Employee, Week } from './model'

export type NewEmployee = Pick<Employee, 'name' | 'rules'>
export type EditedEmployee = Pick<Employee, 'id' | 'name'>

export type NewDay = Pick<Day, 'name' | 'employeeId' | 'weekId'>

export type NewWeek = Pick<Week, 'number'>

export type NewAlteration = Pick<Alteration, 'dayId' | 'employeeId'>

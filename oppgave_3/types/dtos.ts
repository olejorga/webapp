import { Day, Employee, Week } from './model'

export type NewEmployee = Pick<Employee, 'name' | 'rules'>
export type EditedEmployee = Pick<Employee, 'id' | 'name'>

export type NewDay = Pick<Day, 'name' | 'employeeId' | 'weekId' | 'overrideId'>
export type EditedDay = Pick<Day, 'id' | 'overrideId'>

export type NewWeek = Pick<Week, 'number'>

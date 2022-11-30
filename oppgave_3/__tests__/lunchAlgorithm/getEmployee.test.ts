import { Day, Employee, Week } from './../../types/model'
import { describe, expect, it } from 'vitest'
import { getDayAsNumber, getEmployee } from '../../lib/lunchAlgorithm'

const employees: Employee[] = [
  { id: 'testSimen', name: 'Test Simen', rules: 'days:145' },
  { id: 'testOle', name: 'Test Ole', rules: 'days:*' },
  { id: 'testErik', name: 'Test Erik', rules: 'days:23' },
  { id: 'testKai', name: 'Test Kai', rules: 'days:15' },
  { id: 'testRune', name: 'Test Rune', rules: 'days:*|week: odd' },
  { id: 'testLine', name: 'Test Line', rules: 'days:*|week:even' },
  { id: 'testKari', name: 'Test Kari', rules: 'week:3' },
]
const workWeek: Week = { id: 'workWeek', number: 4 }
const vacationWeek: Week = { id: 'vactionWeek', number: 32 }
const testMonday: Day = {
  id: 'testMonday',
  name: 'Monday',
  weekId: 'workWeek',
  employeeId: null,
  overrideId: null,
}

describe(`No employee returned if vacation`, () => {
  it(`should return error with message 'ferie' if vacation`, () => {
    var { employee, error } = getEmployee(
      employees,
      testMonday.name,
      vacationWeek.number
    )
    expect(error).toBe('Ferie')
  })
  it(`should return employee == null`, () => {
    var { employee, error } = getEmployee(
      employees,
      testMonday.name,
      vacationWeek.number
    )
    expect(employee).toBe(null)
  })
})

it(`should return no employee and correct error message if Lørdag`, () => {
  const { error } = getEmployee(employees, 'Lørdag', 5)
  expect(error).toBe('Ugyldig dag')
})

describe(`dayNumber`, () => {
  it(`should return 1 if day is Mandag`, () => {
    var day = 'Mandag'
    expect(getDayAsNumber(day)).toBe(1)
  })
  it(`should return 5 if day is Fredag`, () => {
    var day = 'Fredag'
    expect(getDayAsNumber(day)).toBe(5)
  })
  it(`should return 0 if day is Lørdag`, () => {
    var day = 'Lørdag'
    expect(getDayAsNumber(day)).toBe(0)
  })
})

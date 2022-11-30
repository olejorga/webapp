import { Day, Employee, Week } from './../../types/model'
import { describe, expect, it } from 'vitest'
import { getDayAsNumber, getEmployee, isValid } from '../../lib/lunchAlgorithm'

const employees: Employee[] = [
  { id: 'testSimen', name: 'Test Simen', rules: 'days:145' },
  { id: 'testOle', name: 'Test Ole', rules: 'days:*' },
  { id: 'testErik', name: 'Test Erik', rules: 'days:23|week:even' },
  { id: 'testKai', name: 'Test Kai', rules: 'days:15' },
  { id: 'testRune', name: 'Test Rune', rules: 'days:*|week:odd' },
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
  it(`should return 6 if day is Lørdag`, () => {
    var day = 'Lørdag'
    expect(getDayAsNumber(day)).toBe(6)
  })
  it(`should return 0 if day is Tacofredadg`, () => {
    var day = 'Tacofredag'
    expect(getDayAsNumber(day)).toBe(0)
  })
})

describe(`check if rules of employee isValid with day and week`, () => {
  it(`should be false if test Kai is asked to make lunch on Tirsdag`, () => {
    const testEmployee = employees[3]
    const result = isValid(testEmployee.rules, 'Tirsdag', 2)
    expect(result).toBe(false)
  })
  it(`should be true if test Kai is asked to make lunch on Mandag`, () => {
    const testEmployee = employees[3]
    const result = isValid(testEmployee.rules, 'Mandag', 2)
    expect(result).toBe(true)
  })
  it(`should be false if test Rune is asked to make lunch on even weeks`, () => {
    const testEmployee = employees[4]
    const result = isValid(testEmployee.rules, 'Mandag', 4)
    expect(result).toBe(false)
  })
  it(`should be true if test Rune is asked to make lunch on odd weeks`, () => {
    const testEmployee = employees[4]
    const result = isValid(testEmployee.rules, 'Mandag', 7)
    expect(result).toBe(true)
  })
  it(`should be true if test Line is asked to make lunch on even weeks`, () => {
    const testEmployee = employees[5]
    const result = isValid(testEmployee.rules, 'Mandag', 4)
    expect(result).toBe(true)
  })
  it(`should be false if test Line is asked to make lunch on odd weeks`, () => {
    const testEmployee = employees[5]
    const result = isValid(testEmployee.rules, 'Mandag', 7)
    expect(result).toBe(false)
  })
  it(`should be true if test Kari is asked to make lunch on week 9`, () => {
    const testEmployee = employees[6]
    const result = isValid(testEmployee.rules, 'Mandag', 9)
    expect(result).toBe(true)
  })
  it(`should be true if test Kari is asked to make lunch on week 12`, () => {
    const testEmployee = employees[6]
    const result = isValid(testEmployee.rules, 'Mandag', 12)
    expect(result).toBe(true)
  })
  it(`should be false if test Kari is asked to make lunch on week 13`, () => {
    const testEmployee = employees[6]
    const result = isValid(testEmployee.rules, 'Mandag', 13)
    expect(result).toBe(false)
  })
  it(`should be true if test Ole is asked to do lunch any day`, () => {
    const testEmployee = employees[1]
    const result = isValid(testEmployee.rules, 'Onsdag', 1)
    expect(result).toBe(true)
  })
  it(`should return false if DAY is OK, but WEEK is NOT OK`, () => {
    const testEmployee = employees[2]
    const result = isValid(testEmployee.rules, 'Tirsdag', 3)
    expect(result).toBe(false)
  })
  it(`should return false if WEEK is OK, but DAY is NOT OK`, () => {
    const testEmployee = employees[2]
    const result = isValid(testEmployee.rules, 'Torsdag', 2)
    expect(result).toBe(false)
  })
})

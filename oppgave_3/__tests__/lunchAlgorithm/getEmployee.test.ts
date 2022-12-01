import { Day, Employee, Week } from './../../types/model'
import { describe, expect, it } from 'vitest'
import {
  addEmployeeToLunchList,
  generateYear,
  getCurrentBatch,
  getDayAsNumber,
  getEmployeeWithValidRules,
  hasOccured,
} from '../../lib/lunchAlgorithm'

const employees: Employee[] = [
  { id: 'testSimen', name: 'Test Simen', rules: 'days:145' },
  { id: 'testOle', name: 'Test Ole', rules: 'days:*' },
  { id: 'testErik', name: 'Test Erik', rules: 'days:23|week:even' },
  { id: 'testTor', name: 'Test Tor', rules: 'days:23|week:odd' },
  { id: 'testKai', name: 'Test Kai', rules: 'days:135' },
  { id: 'testRune', name: 'Test Rune', rules: 'days:*|week:odd' },
  { id: 'testLine', name: 'Test Line', rules: 'days:*|week:even' },
  { id: 'testKari', name: 'Test Kari', rules: 'week:3' },
  { id: 'testLinn', name: 'Test Linn', rules: '*' },
  { id: 'testPelle', name: 'Test Pelle', rules: '*' },
  { id: 'testTruls', name: 'Test Truls', rules: '*' },
  { id: 'testErna', name: 'Test Erna', rules: 'days:145|odd' },
  { id: 'testJens', name: 'Test Erna', rules: 'days:145|even' },
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
    var { error } = getEmployeeWithValidRules(
      employees,
      testMonday.name,
      vacationWeek.number
    )
    expect(error).toBe('Ferie')
  })
  it(`should return employee == null`, () => {
    var { employee } = getEmployeeWithValidRules(
      employees,
      testMonday.name,
      vacationWeek.number
    )
    expect(employee).toBe(null)
  })
})

describe(`employees don't work in the weekends`, () => {
  it(`should return no employee and correct error message if Lørdag`, () => {
    const { error } = getEmployeeWithValidRules(employees, 'Lørdag', 5)
    expect(error).toBe('Ugyldig dag')
  })
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

describe(`getCurrentBatch get the batch of the year and `, () => {
  it(`should return 1 if week is 3`, () => {
    var result = getCurrentBatch(3)
    expect(result).toBe(1)
  })
  it(`should return 1 if week is within 1-4`, () => {
    var result = true
    var i = 1
    while (result && i < 5) {
      result = getCurrentBatch(i) == 1
      i++
    }
    expect(result).toBe(true)
  })
  it(`should return 2 if week is within 5-8`, () => {
    var result = true
    var i = 5
    while (result && i < 9) {
      result = getCurrentBatch(i) == 2
      i++
    }
    expect(result).toBe(true)
  })
  it(`should not return 2 if week is within 1-4`, () => {
    var result = true
    var i = 1
    while (result && i < 5) {
      result = getCurrentBatch(i) == 2
    }
    expect(result).toBe(false)
    i++
  })
})

describe(`Employees not occuring to often`, () => {
  it(`should not be added twice in a week`, () => {
    const weeks = generateYear()
    var addedEmployees: string[] = []
    const occurence: [Employee[]] = [[]]
    weeks[0].days?.forEach((day) => {
      addEmployeeToLunchList(employees, day, weeks[0], occurence)
      addedEmployees.push(day.employee?.name ?? '')
    })
    var result = false
    if (new Set(addedEmployees).size === addedEmployees.length) {
      result = true
    }
    expect(result).toBe(true)
  })
})

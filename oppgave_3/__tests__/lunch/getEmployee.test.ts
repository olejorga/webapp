import { Day, Employee, Week } from './../../types/model'
import { describe, expect, it } from 'vitest'
import {
  getCurrentBatch,
  getDayAsNumber,
  getEmployeesWithValidRules,
  getWeeksInBatch,
  generateLunchList,
  getEmployee,
} from '../../lib/lunch'
import { employees, vacation } from './testEmployees'

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
    const occurence: Employee[][] = [[]]
    var { error } = getEmployee(
      employees,
      testMonday.name,
      vacationWeek.number,
      occurence,
      0
    )
    expect(error).toBe('Ferie')
  })
  it(`should return employee == null`, () => {
    const occurence: Employee[][] = [[]]
    var { employee } = getEmployee(
      employees,
      testMonday.name,
      vacationWeek.number,
      occurence,
      0
    )
    expect(employee).toBe(null)
  })
})

describe(`employees don't work in the weekends`, () => {
  it(`should return no employee and correct error message if Lørdag`, () => {
    const occurence: Employee[][] = [[]]
    const { error } = getEmployee(employees, 'Lørdag', 5, occurence, 0)
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

describe(`getCurrentBatch calculates the batch of the year and `, () => {
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

describe(`Generate an entire year and add employees`, () => {
  it(`should be 5 employees each week`, () => {
    var result = false
    const lunchList = generateLunchList(employees)
    lunchList.forEach(({ days, number }) => {
      days?.forEach(({ employeeId }) => {
        if (employeeId == null && !vacation.includes(number)) result = false
        else result = true
      })
    })
    expect(result).toBe(true)
  })
})

describe(`Vacation check`, () => {
  it(`should be no employees in week 8`, () => {
    const lunchList = generateLunchList(employees)
    const lunchCountWeek8 = lunchList[7].days?.filter(
      ({ employeeId }) => employeeId == null
    ).length

    expect(lunchCountWeek8).toBe(5)
  })
  it(`should be no employees in week 31`, () => {
    const lunchList = generateLunchList(employees)
    const lunchCountWeek31 = lunchList[30].days?.filter(
      ({ employeeId }) => employeeId == null
    ).length

    expect(lunchCountWeek31).toBe(5)
  })
  it(`should be employees in week 33`, () => {
    const lunchList = generateLunchList(employees)
    const lunchCountWeek33 = lunchList[32].days?.filter(
      ({ employeeId }) => employeeId == null
    ).length

    expect(lunchCountWeek33).toBe(0)
  })
})

describe(`Get weeks in a batch from week number`, () => {
  it(`should return array 1-4 when week 1`, () => {
    const result = getWeeksInBatch(1)
    expect(result).toStrictEqual([1, 2, 3, 4])
  })
  it(`should return array 1-4 when weeek 2`, () => {
    const result = getWeeksInBatch(2)
    expect(result).toStrictEqual([1, 2, 3, 4])
  })
  it(`should return array 33-36 when weeek 38`, () => {
    const result = getWeeksInBatch(38)
    expect(result).toStrictEqual([37, 38, 39, 40])
  })
})

describe(`Error if no valid employees`, () => {
  it(`should return error message if no valid employees available`, () => {
    const occurence: Employee[][] = [[]]
    const { error } = getEmployee(
      [employees[2], employees[3], employees[4]],
      'Torsdag',
      49,
      occurence,
      0
    )
    expect(error).toBe('No employee added on Torsdag in week 49')
  })
})

describe(`GetEmployeeWithValidRules test`, () => {
  it(`should only return 1 employee if 1 has only the current day in rules`, () => {
    const testEmployee: Employee = {
      id: '1',
      name: 'BareMandag',
      rules: 'day:1',
    }
    const employeeList = [
      testEmployee,
      employees[0], //  'days:145'
      employees[1], // 'days:*'
      employees[14], // 'days:135'
    ]
    // All employees in the test are vaid for monday, but only testEmployee will be returned.
    const result = getEmployeesWithValidRules(employeeList, 'Mandag', 1, [[]])
    expect(result.length).toBe(1)
  })
  it(`should return 3 employees, bypassing the one that hasOccured`, () => {
    const testEmployee: Employee = {
      id: '1',
      name: 'BareMandag',
      rules: 'day:1',
    }
    const employeeList = [
      testEmployee,
      employees[0], //  'days:145'
      employees[1], // 'days:*'
      employees[14], // 'days:135'
    ]
    // All employees in the test are valid for monday. TestEmployee will trigger hasOccured and will therefore not be returned
    const result = getEmployeesWithValidRules(employeeList, 'Mandag', 1, [
      [testEmployee],
    ])
    expect(result.length).toBe(3)
  })
})

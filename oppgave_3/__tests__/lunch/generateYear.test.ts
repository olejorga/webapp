import { employees, vacation } from './testEmployees'
import { describe, expect, it } from 'vitest'
import { generateYear, generateLunchList } from '../../lib/lunch'

describe('yearGenerator', () => {
  it(`should have 52 weeks`, () => {
    const weeks = generateYear()
    expect(weeks.length).toBe(52)
  })
  it(`should have 5 days in each week`, () => {
    const weeks = generateYear()
    var isFive = true
    weeks.forEach(({ days }) => {
      if ((days && days.length != 5) || !days) {
        isFive = false
        return
      }
    })
    expect(isFive).toBe(true)
  })
})

describe('each day in a week generated from yearGenerator', () => {
  it(`should be called Mandag if its the first day of the week`, () => {
    const weeks = generateYear()
    const index = 0
    var isNameCorrect = true
    weeks.forEach(({ days }) => {
      if (days && days[index].name != 'Mandag') {
        isNameCorrect = false
        return
      }
    })
    expect(isNameCorrect).toBe(true)
  })
  it(`should be called Onsdag if its the third day of the week`, () => {
    const weeks = generateYear()
    const index = 2
    var isNameCorrect = true
    weeks.forEach(({ days }) => {
      if (days && days[index].name != 'Onsdag') {
        isNameCorrect = false
        return
      }
    })
    expect(isNameCorrect).toBe(true)
  })
  it(`should be called Fredag  if its the last day of the week`, () => {
    const weeks = generateYear()
    const index = 4
    var isNameCorrect = true
    weeks.forEach(({ days }) => {
      if (days && days[index].name != 'Fredag') {
        isNameCorrect = false
        return
      }
    })
    expect(isNameCorrect).toBe(true)
  })
})

describe(`Each week has employees`, () => {
  it(`should have 5 employees each week if not vacation`, () => {
    const weeks = generateLunchList(employees)
    var result = true
    weeks.forEach(({ days, number }) => {
      if (days) {
        // Check for vacation weeks
        if (!vacation.includes(number)) {
          days.forEach(({ employeeId }) => {
            if (employeeId == null) result = false
          })
        }
      }
    })
    expect(result).toBe(true)
  })
  it(`should have 0 employees if vacation`, () => {
    const weeks = generateLunchList(employees)
    var result = false
    weeks.forEach(({ days, number }) => {
      if (days) {
        // Check for vacation weeks
        if (vacation.includes(number)) {
          days.forEach(({ employeeId }) => {
            if (employeeId == null) result = true
          })
        }
      }
    })
    expect(result).toBe(true)
  })
  it(`should have 5 different employees in a week (not 1 employee several times)`, () => {
    const weeks = generateLunchList(employees)
    var result = true
    weeks.forEach(({ days, number }) => {
      if (result && days) {
        // Check for vacation weeks
        var empoloyeesForThisWeek: string[] = []
        if (!vacation.includes(number)) {
          for (var i = 0; i < days.length; i++) {
            empoloyeesForThisWeek.push(days[i].employeeId ?? '')
          }
          const constrolSet = new Set(empoloyeesForThisWeek)
          if (constrolSet.size == 5) {
            result = true
          } else {
            result = false
            return result
          }
        }
      }
    })
    expect(result).toBe(true)
  })
})

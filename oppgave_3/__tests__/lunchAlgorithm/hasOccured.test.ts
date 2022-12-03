import { describe, expect, it } from 'vitest'
import {
  hasOccuredThisBatch,
  hasOccuredThisDay,
  hasOccuredThisWeek,
  priority,
} from '../../lib/lunchAlgorithm'
import { Employee } from '../../types/model'
import { employees } from './testEmployees'

describe(`Chech if hasOccuredThisWeek works as intended`, () => {
  it(`should return true if employee already added to lunch list this week`, () => {
    const testEmployee = employees[5]
    const occurence: Employee[][] = [
      [employees[2], employees[3], employees[22], employees[14], employees[7]],
      [employees[9], employees[4], testEmployee, employees[22], employees[8]],
    ]

    const result = hasOccuredThisWeek(testEmployee, 2, occurence)
    expect(result).toBe(true)
  })
  it(`should return false if employee not yet added to lunch list this week`, () => {
    const testEmployee = employees[5]
    const occurence: Employee[][] = [
      [employees[2], employees[3], employees[22], employees[14], employees[7]],
      [employees[9], employees[4], testEmployee, employees[22], employees[8]],
    ]

    const result = hasOccuredThisWeek(testEmployee, 1, occurence)
    expect(result).toBe(false)
  })
})

describe(`Chech if hasOccuredThisDay works as intended`, () => {
  it(`should not be added on same day two weeks in a row`, () => {
    const testPerson = { id: '1', name: 'TestNavn', rules: '*' }
    const day = 'Mandag'
    const occurence: [Employee[]] = [[testPerson, employees[0], employees[1]]]
    const result = hasOccuredThisDay(testPerson, 2, day, occurence)
    expect(result).toBe(true)
  })
})

describe(`Check if hasOccuredThisBatch works as intended`, () => {
  it(`should return true if already at maxOccurence(2)`, () => {
    var testEmployee = employees[9]
    const occurence: Employee[][] = [
      [employees[2], employees[3], employees[22], employees[14], employees[7]],
      [employees[9], employees[4], testEmployee, employees[22], employees[8]],
      [employees[4], employees[9], testEmployee, employees[22], employees[8]],
    ]
    const result = hasOccuredThisBatch(testEmployee, 4, occurence)
    expect(result).toBe(true)
  })
})

describe(`Check if priority works as intended`, () => {
  it(`should remove employees in occurence array`, () => {
    const occurence = [
      employees[9],
      employees[4],
      employees[14],
      employees[22],
      employees[8],
    ]
    const priorityEmployees = priority(employees, occurence)
    const result = priorityEmployees.some((e) => occurence.includes(e))
    expect(result).toBe(false)
  })
})

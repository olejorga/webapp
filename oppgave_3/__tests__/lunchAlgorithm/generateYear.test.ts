import { describe, expect, it } from 'vitest'
import { generateYear } from '../../lib/lunchAlgorithm'

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
        console.log(days)
        isNameCorrect = false
        return
      }
    })
    expect(isNameCorrect).toBe(true)
  })
})

import { describe, expect } from 'vitest'
import { isValid } from '../../lib/lunch'

describe(`check if rules of employee isValid with day and week`, () => {
  it(`should be false if 'days:15' is asked to make lunch on Tirsdag`, () => {
    const testRules = 'days:15'
    const result = isValid(testRules, 'Tirsdag', 2)
    expect(result).toBe(false)
  })
  it(`should be true if 'days:15' is asked to make lunch on Mandag`, () => {
    const testRules = 'days:15'
    const result = isValid(testRules, 'Mandag', 2)
    expect(result).toBe(true)
  })
  it(`should be false if 'days:*|week:odd' is asked to make lunch on even weeks`, () => {
    const testRules = 'days:*|week:odd'
    const result = isValid(testRules, 'Mandag', 4)
    expect(result).toBe(false)
  })
  it(`should be true if 'days:*|week:odd' is asked to make lunch on odd weeks`, () => {
    const testRules = 'days:*|week:odd'
    const result = isValid(testRules, 'Mandag', 7)
    expect(result).toBe(true)
  })
  it(`should be true if 'days:*|week:even' is asked to make lunch on even weeks`, () => {
    const testRules = 'days:*|week:even'
    const result = isValid(testRules, 'Mandag', 4)
    expect(result).toBe(true)
  })
  it(`should be false if 'days:*|week:even' is asked to make lunch on odd weeks`, () => {
    const testRules = 'days:*|week:even'
    const result = isValid(testRules, 'Mandag', 7)
    expect(result).toBe(false)
  })
  it(`should be true if 'week:3' is asked to make lunch on week 9`, () => {
    const testRules = 'week:3'
    const result = isValid(testRules, 'Mandag', 9)
    expect(result).toBe(true)
  })
  it(`should be true if 'week:3' is asked to make lunch on week 12`, () => {
    const testRules = 'week:3'
    const result = isValid(testRules, 'Mandag', 12)
    expect(result).toBe(true)
  })
  it(`should be false if 'week:3' is asked to make lunch on week 13`, () => {
    const testRules = 'week:3'
    const result = isValid(testRules, 'Mandag', 13)
    expect(result).toBe(false)
  })
  it(`should be true if 'days:*' is asked to do lunch any day`, () => {
    const testRules = 'days:*'
    const result = isValid(testRules, 'Onsdag', 1)
    expect(result).toBe(true)
  })
  it(`should return false if DAY is OK, but WEEK is NOT OK`, () => {
    const testRules = 'days:23|week:even'
    const result = isValid(testRules, 'Tirsdag', 3)
    expect(result).toBe(false)
  })
  it(`should return false if WEEK is OK, but DAY is NOT OK`, () => {
    const testRules = 'days:23|week:even'
    const result = isValid(testRules, 'Torsdag', 2)
    expect(result).toBe(false)
  })
})

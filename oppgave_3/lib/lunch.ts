import { randomUUID } from 'crypto'
import { Week, Employee, Day } from '../types/model'
import options from '../lunch.options.json'

// Entry point. The method called by the api
export function generateLunchList(employees: Employee[]): Week[] {
  const weeks = generateYear()
  const occurences: Employee[][] = [[]]

  for (var i = 0; i < options.yearSize; i++) {
    weeks[i].days?.forEach((day) => {
      addEmployeeToLunchList(employees, day, weeks[i], occurences, 0)
    })
  }

  return weeks
}

// Generates a year with days
export function generateYear(): Week[] {
  var weeks: Week[] = []

  for (var i = 0; i < options.yearSize; i++) {
    weeks.push({ id: generateId(), number: i + 1, days: [] })
  }
  weeks.forEach(({ days, id }) => {
    for (var i = 0; i < options.workDays; i++) {
      days?.push({
        id: generateId(),
        name: options.days[i],
        employeeId: null,
        weekId: id,
        overrideId: null,
      })
    }
  })

  return weeks
}

const generateId = (): string => {
  return randomUUID()
}

type GetEmployeeResult = {
  employee: Employee | null
  error: string | null
}

// Fills the days of the year with employees from the employees-list
export function addEmployeeToLunchList(
  employees: Employee[],
  day: Day,
  week: Week,
  occurence: Employee[][] = [[]],
  retry: number
) {
  const allEmployees = employees
  if (retry < 5) {
    employees = priority(employees, occurence[week.number - 1])
  }

  const { employee, error } = getEmployee(
    employees,
    day.name,
    week.number,
    occurence,
    retry
  )

  if (error && error == 'Ferie') return

  if (employee && retry < 20) {
    if (hasOccured(employee, week.number, day.name, occurence, retry)) {
      addEmployeeToLunchList(allEmployees, day, week, occurence, retry + 1)
    } else {
      setOccured(employee, week.number, occurence)
      day.employeeId = employee.id
      day.employee = employee
      if (!employee.days) {
        employee.days = []
      }
      employee.days?.push(day)
    }
  } else if (error && error != 'Ferie') {
    throw new Error(error)
  } else {
    throw new Error(`No suitable employee found. Attempts: ${retry}`)
  }
}

// Fetch a specific employee based on the rules and occurence
export function getEmployee(
  employees: Employee[],
  day: string,
  weekNumber: number,
  occurence: Employee[][],
  retry: number
): GetEmployeeResult {
  const dayAsNumber = getDayAsNumber(day)

  if (options.vacation.includes(weekNumber)) {
    return { employee: null, error: 'Ferie' }
  }

  if (dayAsNumber < 1 || dayAsNumber > options.workDays) {
    return { employee: null, error: 'Ugyldig dag' }
  }

  let valid = getEmployeesWithValidRules(employees, day, weekNumber, occurence)
  if (valid.length > 0) {
    let i = random(valid.length)
    while (
      hasOccured(valid[i], weekNumber, day, occurence, retry) &&
      valid.length > 2
    ) {
      const emp = valid[i]
      valid = valid.filter(({ id }) => id == emp.id)
      i = random(valid.length)
    }
    return { employee: valid[i], error: null }
  } else {
    return {
      employee: null,
      error: `No employee added on ${day} in week ${weekNumber}`,
    }
  }
}

// Fetch a list of empoloyees based on the rules
export function getEmployeesWithValidRules(
  employees: Employee[],
  day: string,
  weekNumber: number,
  occurence: Employee[][]
): Employee[] {
  var valid: Employee[] = []
  const dayAsNumber = getDayAsNumber(day)

  // Checks if an employee can make lunch on this day ONLY (ex: 'day:1' is only Mandag)
  employees.forEach((employee) => {
    if (
      isTodayValid(employee.rules, dayAsNumber) &&
      !hasOccured(employee, weekNumber, day, occurence, 0)
    )
      valid.push(employee)
  })

  // If first fetch is null, fetch all who can make lunch this day
  if (valid.length == 0) {
    employees.forEach((employee) => {
      if (isValid(employee.rules, day, weekNumber)) valid.push(employee)
    })
  }
  return valid
}

// Fetch the number for this day: (ex: Mandag as input will return 1)
export function getDayAsNumber(day: string) {
  return options.days.indexOf(day) + 1 ?? 0
}

// Check if the rules are valid for current day and week
export function isValid(rules: string, day: string, week: number): boolean {
  if (rules == '*') {
    return true
  }

  var result = false

  if (rules.includes('|')) {
    const ruleArray = rules.split('|')
    for (var i = 0; i < ruleArray.length; i++) {
      result = isValid(ruleArray[i], day, week)
      if (result == false) break
    }
  } else {
    if (rules.includes('week')) {
      if (rules.includes('odd')) {
        result = week % 2 != 0
      } else if (rules.includes('even')) {
        result = week % 2 == 0
      } else if (rules.includes('3')) {
        result = week % 3 == 0
      } else if (rules.includes('4')) {
        result = week % 4 == 0
      }
    } else {
      if (rules.includes('*')) {
        result = true
      } else if (rules.includes(getDayAsNumber(day).toString())) {
        result = true
      } else result = false
    }
  }

  return result
}

// Check if an employee can ONLY make food this day
export function isTodayValid(rules: string, day: number): boolean {
  return rules == `day:${day}`
}

// Calculate the current batch
export function getCurrentBatch(week: number): number {
  if (week % options.batchSize == 0) return week / options.batchSize
  return Math.floor(week / options.batchSize) + 1
}

// Check has allready occured
// In cases were no valid employees can be found, rules will be removed according to priority
export function hasOccured(
  employee: Employee,
  week: number,
  day: string,
  occurences: Employee[][],
  retry: number
): boolean {
  // Prioritice the rules from most to least important. 1 is most important
  // 1. Check if the employee is already added this week
  if (hasOccuredThisWeek(employee, week, occurences)) return true

  // 2. Check if the employee has made lunch too many times
  if (retry < 6) {
    if (hasOccuredAboveMax(employee, week)) return true
  }

  // 3. Check if the employee made lunch same day last week
  if (retry < 4) {
    if (hasOccuredThisDay(employee, week, day, occurences)) return true
  }

  // 4. Check if the employee is at maxOccurence for the current batch
  if (retry < 2) {
    return hasOccuredThisBatch(employee, week, occurences)
  }

  return false
}

// 1. Check if the employee is already added this week
export function hasOccuredThisWeek(
  employee: Employee,
  week: number,
  occurences: Employee[][]
): boolean {
  const currentWeek = week - 1
  if (!occurences[currentWeek]) {
    occurences[currentWeek] = []
    return false
  }

  return occurences[currentWeek].includes(employee)
}

// 2. Check if the employee has made lunch too many times
export function hasOccuredAboveMax(employee: Employee, week: number): boolean {
  // Max is 50% of weeks so far
  const { days } = employee
  if (days) {
    const dayCount = days.length
    if (dayCount > week / 2) return true
  }
  return false
}

// 3. Check if the employee made lunch same day last week
export function hasOccuredThisDay(
  employee: Employee,
  week: number,
  day: string,
  occurences: Employee[][]
): boolean {
  const currentWeek = week - 1
  const lastWeek = week - 2
  const dayNumber = getDayAsNumber(day)

  if (!occurences[currentWeek]) {
    occurences[currentWeek] = []
  }

  if (!occurences[lastWeek]) {
    occurences[lastWeek] = []
  }

  if (currentWeek > 0) {
    return occurences[lastWeek][dayNumber - 1]?.id == employee.id
  }

  return false
}

// 4. Check if the employee is at maxOccurence for the current batch
export function hasOccuredThisBatch(
  employee: Employee,
  week: number,
  occurences: Employee[][]
): boolean {
  const w = getWeeksInBatch(week)
  var result = false
  var timesOccured = 0

  for (var i = 0; i < w.length; i++) {
    if (!occurences[i]) {
      occurences[i] = []
    }

    timesOccured += occurences[i].includes(employee) ? 1 : 0

    if (timesOccured >= options.maxOccurence) {
      result = true
    }
  }

  return result
}

// Add an employee to the occurence-array
const setOccured = (
  employee: Employee,
  week: number,
  occurences: Employee[][]
) => {
  const index = week - 1

  if (!occurences[index]) {
    occurences[index] = []
  }

  occurences[index].push(employee)
}

// Remove those employees who made lunch last week
export function priority(
  employees: Employee[],
  occurrence: Employee[]
): Employee[] {
  return employees.filter((e) => !occurrence?.includes(e))
}

// Input weekNumber. Returns all weeks in batch
export function getWeeksInBatch(week: number): number[] {
  const batch = getCurrentBatch(week)
  return Array.from([1, 2, 3, 4], (x) => x + (batch - 1) * 4)
}

// A method to generate a random index
const random = (range: number): number => {
  // Multiply by 35527 because in order to create a better random-effect. 35527 is a prime number
  return Math.floor(Math.random() * 35527) % range
}

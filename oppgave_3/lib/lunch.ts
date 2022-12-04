import { randomUUID } from 'crypto'
import { Week, Employee, Day } from '../types/model'
import options from '../lunch.options.json'

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

// Lager en random id.
const generateId = (): string => {
  return randomUUID()
}

type GetEmployeeResult = {
  employee: Employee | null
  error: string | null
}

export function addEmployeeToLunchList(
  employees: Employee[],
  day: Day,
  week: Week,
  occurence: Employee[][] = [[]],
  retry: number
) {
  // TODO: const priorityEmployees = priority(employees, occurence[week.number - 1])
  const allEmployees = employees
  if (retry < 2) {
    employees = priority(employees, occurence[week.number - 1])
  }

  const { employee, error } = getEmployeeWithValidRules(
    employees,
    day.name,
    week.number
  )

  if (error && error == 'Ferie') return

  if (employee) {
    if (hasOccured(employee, week.number, day.name, occurence) && retry < 10) {
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

export function getEmployeeWithValidRules(
  employees: Employee[],
  day: string,
  weekNumber: number
): GetEmployeeResult {
  if (options.vacation.includes(weekNumber)) {
    return { employee: null, error: 'Ferie' }
  }

  const dayAsNumber = getDayAsNumber(day)

  if (dayAsNumber < 1 || dayAsNumber > options.workDays) {
    return { employee: null, error: 'Ugyldig dag' }
  }

  var valid: Employee[] = []

  employees.forEach((employee) => {
    if (isValid(employee.rules, day, weekNumber)) {
      valid.push(employee)
    }
  })

  if (valid.length > 0) {
    var i = Math.floor(Math.random() * valid.length)
    return { employee: employees[i], error: null }
  } else {
    return {
      employee: null,
      error: `No employee added on ${day} in week ${weekNumber}`,
    }
  }
}

export function getDayAsNumber(day: string) {
  return options.days.indexOf(day) + 1 ?? 0
}

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

export function getCurrentBatch(week: number): number {
  if (week % options.batchSize == 0) return week / options.batchSize
  return Math.floor(week / options.batchSize) + 1
}

export function hasOccured(
  employee: Employee,
  week: number,
  day: string,
  occurences: Employee[][]
): boolean {
  result = hasOccuredThisWeek(employee, week, occurences)

  if (result == true) {
    return result
  }

  var result = hasOccuredThisBatch(employee, week, occurences)

  if (result == true) {
    return result
  }

  var result = hasOccuredThisDay(employee, week, day, occurences)

  return result
}

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

export function priority(
  employees: Employee[],
  occurrence: Employee[]
): Employee[] {
  return employees.filter((e) => !occurrence?.includes(e))
}

export function getWeeksInBatch(week: number): number[] {
  const batch = getCurrentBatch(week)
  return Array.from([1, 2, 3, 4], (x) => x + (batch - 1) * 4)
}

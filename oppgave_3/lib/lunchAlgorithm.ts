import { Week, Employee, Day } from '../types/model'

const weekDays = [
  'Mandag',
  'Tirsdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lørdag',
  'Søndag',
]

const yearSize = 52
const weekSize = 5
const vacation = [8, 28, 29, 30, 31, 32, 40, 52]
const batchSize = 4
const maxOccurence = 2

export function getCurrentBatch(week: number): number {
  if (week % batchSize == 0) return week / batchSize
  return Math.floor(week / batchSize) + 1
}

// TODO: Ta port weekamount. Trengs bare til testing enn så lenge
export function populateLunchList(employees: Employee[], weekAmount: number) {
  const weeks = generateYear()
  const occurences: [Employee[]] = [[]]

  for (var i = 0; i < weekAmount; i++) {
    weeks[i].days?.forEach((day) => {
      addEmployeeToLunchList(employees, day, weeks[i])
    })
  }
}

// Oppretter et år.
export function generateYear(): Week[] {
  var weeks: Week[] = []

  for (var i = 0; i < yearSize; i++) {
    weeks.push({ id: generateId(), number: i + 1, days: [] })
  }
  weeks.forEach(({ days, id }) => {
    for (var i = 0; i < weekSize; i++) {
      days?.push({
        id: generateId(),
        name: weekDays[i],
        employeeId: null,
        weekId: id,
        overrideId: null,
      })
    }
  })

  return weeks
}

type GetEmployeeResult = {
  employee: Employee | null
  error: string | null
}

export function addEmployeeToLunchList(
  employees: Employee[],
  day: Day,
  week: Week,
  occurence: [Employee[]] = [[]]
) {
  const { employee, error } = getEmployeeWithValidRules(
    employees,
    day.name,
    week.number
  )
  if (error) throw new Error(error)
  if (employee) {
    if (hasOccured(employee, week.number, occurence)) {
      addEmployeeToLunchList(employees, day, week, occurence)
    } else {
      setOccured(employee, week.number, occurence)
      day.employeeId = employee.id
      day.employee = employee
    }
  }
}

// Henter ut en employee til en gitt dag
export function getEmployeeWithValidRules(
  employees: Employee[],
  day: string,
  weekNumber: number
): GetEmployeeResult {
  if (vacation.includes(weekNumber)) return { employee: null, error: 'Ferie' }
  const dayAsNumber = getDayAsNumber(day)
  if (dayAsNumber < 1 || dayAsNumber > weekSize)
    return { employee: null, error: 'Ugyldig dag' }

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
  return weekDays.indexOf(day) + 1 ?? 0
}

// Sjekker at dag og uke stemmer overens med reglene.
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

// Lager en random id
// Id er ikke nullable så måtte sette noe.
const generateId = (): string => {
  return (Math.random() + 1).toString(36).substring(7)
}

export function hasOccured(
  employee: Employee,
  week: number,
  occurences: [Employee[]]
): boolean {
  const index = getCurrentBatch(week) - 1

  return occurences[index].includes(employee)
}

const setOccured = (
  employee: Employee,
  week: number,
  occurences: [Employee[]]
) => {
  const index = getCurrentBatch(week) - 1
  if (occurences[index] === undefined) {
    occurences[index] = []
  }
  occurences[index].push(employee)
}

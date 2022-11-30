import { Week, Employee, Day } from '../types/model'

const weekDays = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag']
const vacation = [8, 28, 29, 30, 31, 32, 40, 52]

export function generateYear(): Week[] {
  var weeks: Week[] = []

  for (var i = 0; i < 52; i++) {
    weeks.push({ id: generateId(), number: i + 1, days: [] })
  }
  weeks.forEach(({ days, id }) => {
    for (var i = 0; i < weekDays.length; i++) {
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
export function getEmployee(
  employees: Employee[],
  day: string,
  weekNumber: number
): GetEmployeeResult {
  if (vacation.includes(weekNumber)) return { employee: null, error: 'Ferie' }
  const dayAsNumber = getDayAsNumber(day)
  if (dayAsNumber == 0) return { employee: null, error: 'Ugyldig dag' }

  return { employee: null, error: null }
}

export function getDayAsNumber(day: string) {
  return weekDays.indexOf(day) + 1
}

export function getEmployeeRules(rules: string, day: string, week: number) {}

const generateId = (): string => {
  return (Math.random() + 1).toString(36).substring(7)
}

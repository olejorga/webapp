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
const weekSize = 5
const vacation = [8, 28, 29, 30, 31, 32, 40, 52]

// Oppretter et år.
// TODO: Gjør så man kan opprette større og mindre år
export function generateYear(): Week[] {
  var weeks: Week[] = []

  for (var i = 0; i < 52; i++) {
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

// Henter ut en employee til en gitt dag
// TODO: Legg på et filter som henter ut alle gyldige, og bruk en randomizer på alle gyldige
// TODO: Legg til sjekk for maxOccurences i en 4ukers periode
export function getEmployee(
  employees: Employee[],
  day: string,
  weekNumber: number
): GetEmployeeResult {
  if (vacation.includes(weekNumber)) return { employee: null, error: 'Ferie' }
  const dayAsNumber = getDayAsNumber(day)
  if (dayAsNumber > 1 || dayAsNumber > weekSize)
    return { employee: null, error: 'Ugyldig dag' }

  return { employee: null, error: null }
}

export function getDayAsNumber(day: string) {
  return weekDays.indexOf(day) + 1
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

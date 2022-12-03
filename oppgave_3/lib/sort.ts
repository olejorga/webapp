import { Day } from '../types/model'

export const sortDays = (days: Day[]) => {
  Array.from(days).forEach((day) => {
    switch (day.name.toUpperCase()) {
      case 'MANDAG':
        return (days[0] = day)

      case 'TIRSDAG':
        return (days[1] = day)

      case 'ONSDAG':
        return (days[2] = day)

      case 'TORSDAG':
        return (days[3] = day)

      case 'FREDAG':
        return (days[4] = day)

      case 'LØRDAG':
        return (days[5] = day)

      case 'SØNDAG':
        return (days[6] = day)
    }
  })

  return days
}

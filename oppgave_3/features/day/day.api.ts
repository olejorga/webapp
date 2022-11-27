import api from '../../lib/api'
import { EditedDay } from '../../types/dtos'
import { Day } from '../../types/model'

export const update = (day: EditedDay) => {
  return api<Day>('/days/' + day.id).put(day)
}

export const find = (id: string) => {
  return api<Day>('/days/' + id).get()
}

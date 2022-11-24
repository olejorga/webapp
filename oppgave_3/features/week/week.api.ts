import api from '../../lib/api'
import { Week } from '../../types/model'

export const read = () => {
  return api<Week>('/weeks').get()
}

export const find = (id: string) => {
  return api<Week>('/weeks/' + id).get()
}

export const search = (start: number, end: number) => {
  return api<Week>(`/weeks?start=${start}&end=${end}`).get()
}

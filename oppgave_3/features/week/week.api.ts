import api from '../../lib/api'
import { Week } from '../../types/model'

export const read = (start?: number, end?: number) => {
  let url = '/weeks'

  if (start && end) {
    url += `?start=${start}&end=${end}`
  } else if (start) {
    url += `?start=${start}`
  } else if (end) {
    url += `?end=${end}`
  }

  return api<Week[]>(url).get()
}

export const find = (id: string) => {
  return api<Week>('/weeks/' + id).get()
}

export const exportExcel = () => {
  return api<Week[]>('/weeks/?format=excel').get()
}

import api from '../../lib/api'
import { NewAlteration } from '../../types/dtos'
import { Alteration } from '../../types/model'

export const create = (alteration: NewAlteration) => {
  return api<Alteration>('/alterations').post(alteration)
}

export const read = () => {
  return api<Alteration[]>('/alterations').get()
}

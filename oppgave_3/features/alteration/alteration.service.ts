import { NewAlteration } from '../../types/dtos'
import { Alteration } from '../../types/model'
import { Result } from '../../types/result'
import * as repo from './alteration.repository'

export const create = async (
  alteration: NewAlteration
): Promise<Result<Alteration>> => {
  return await repo.create(alteration)
}

export const read = async (): Promise<Result<Alteration[]>> => {
  return await repo.read()
}

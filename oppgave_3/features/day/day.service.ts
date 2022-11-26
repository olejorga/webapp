import { EditedDay, NewDay } from '../../types/dtos'
import { Day } from '../../types/model'
import { Result } from '../../types/result'
import * as repo from './day.repository'

export const create = async (day: NewDay): Promise<Result<Day>> => {
  return await repo.create(day)
}

export const update = async (day: EditedDay): Promise<Result<Day>> => {
  if (!day.overrideId && day.overrideId != null) {
    return {
      status: 400,
      error: '"overrideId" missing. Must be valid id or null.',
    }
  }

  return await repo.update(day)
}

export const find = async (id: string): Promise<Result<Day>> => {
  return await repo.find(id)
}

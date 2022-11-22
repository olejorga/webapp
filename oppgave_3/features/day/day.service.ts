import { NewDay } from '../../types/dtos'
import { Day } from '../../types/model'
import { Result } from '../../types/result'
import * as repo from './day.repository'

export const create = async (day: NewDay): Promise<Result<Day>> => {
  return await repo.create(day)
}

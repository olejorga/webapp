import { NewWeek } from '../../types/dtos'
import { Week } from '../../types/model'
import { Result } from '../../types/result'
import * as repo from './week.repository'

export const create = async (week: NewWeek): Promise<Result<Week>> => {
  return await repo.create(week)
}

export const read = async (): Promise<Result<Week[]>> => {
  return await repo.read()
}

export const find = async (number: number): Promise<Result<Week>> => {
  return await repo.find(number)
}

export const search = async (
  start: number,
  end: number
): Promise<Result<Week[]>> => {
  return await repo.search(start, end)
}

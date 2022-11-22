import { NewDay } from '../../types/dtos'
import { Day } from '../../types/model'
import { Result } from '../../types/result'
import prisma from '../../lib/db'

export const create = async (day: NewDay): Promise<Result<Day>> => {
  try {
    return {
      status: 201,
      data: await prisma.day.create({ data: day }),
    }
  } catch (error) {
    return {
      status: 500,
      error: 'Could not create day.',
    }
  }
}

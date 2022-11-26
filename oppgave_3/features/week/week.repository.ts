import prisma from '../../lib/db'
import { Result } from '../../types/result'
import { Week } from '../../types/model'
import { NewWeek } from '../../types/dtos'

export const create = async (week: NewWeek): Promise<Result<Week>> => {
  try {
    return {
      status: 201,
      data: await prisma.week.create({ data: week }),
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      error: 'Could not create week.',
    }
  }
}

export const read = async (
  start?: number,
  end?: number
): Promise<Result<Week[]>> => {
  try {
    return {
      status: 200,
      data: await prisma.week.findMany({
        where: {
          AND: [{ number: { gte: start } }, { number: { lte: end } }],
        },
        include: {
          days: {
            include: {
              employee: true,
              override: true,
            },
          },
        },
      }),
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      error: 'Could not retrive weeks.',
    }
  }
}

export const find = async (number: number): Promise<Result<Week>> => {
  try {
    const week = await prisma.week.findFirst({
      where: { number },
      include: { days: { include: { employee: true, override: true } } },
    })
    return week
      ? {
          status: 200,
          data: week,
        }
      : {
          status: 404,
          error: `Could not find week with number=${number}.`,
        }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      error: 'Could not retrive week.',
    }
  }
}

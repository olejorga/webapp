import { employees } from './../../data/employees'
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

export const read = async (): Promise<Result<Week[]>> => {
  try {
    return {
      status: 200,
      data: await prisma.week.findMany({
        include: {
          days: {
            include: {
              employee: true,
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
    const week = await prisma.week.findFirst({ where: { number } })
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

export const search = async (
  start: number,
  end: number
): Promise<Result<Week[]>> => {
  try {
    return {
      status: 200,
      data: await prisma.week.findMany({
        where: {
          AND: [
            { number: start },
            { number: { gt: start } },
            { number: { lt: end } },
            { number: end },
          ],
        },
      }),
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      error: 'Could not retrive employees.',
    }
  }
}

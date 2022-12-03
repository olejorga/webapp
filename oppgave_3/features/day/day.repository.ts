import { EditedDay, NewDay } from '../../types/dtos'
import { Day } from '../../types/model'
import { Result } from '../../types/result'
import prisma from '../../lib/db'

export const create = async (
  day: NewDay,
  id?: string
): Promise<Result<Day>> => {
  try {
    return {
      status: 201,
      data: await prisma.day.create({
        data: id ? { ...day, id } : day,
        include: { employee: true, override: true, week: true },
      }),
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      error: 'Could not create day.',
    }
  }
}

export const update = async (day: EditedDay): Promise<Result<Day>> => {
  try {
    return {
      status: 200,
      data: await prisma.day.update({
        where: {
          id: day.id,
        },
        data: day,
        include: { employee: true, override: true, week: true },
      }),
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      error: 'Could not update day.',
    }
  }
}

export const find = async (id: string): Promise<Result<Day>> => {
  try {
    const day = await prisma.day.findUnique({
      where: { id },
      include: { employee: true, override: true, week: true },
    })
    return day
      ? {
          status: 200,
          data: day,
        }
      : {
          status: 404,
          error: `Could not find day with id=${id}.`,
        }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      error: 'Could not retrive day.',
    }
  }
}

export const clear = async (): Promise<Result> => {
  try {
    await prisma.day.deleteMany()
    return { status: 200 }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      error: 'Could not clear day database.',
    }
  }
}

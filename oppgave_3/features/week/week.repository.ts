import prisma from '../../lib/db'
import { NotFoundError } from '@prisma/client/runtime'
import { Week } from '../../types/model'
import { ResultAsync } from '../../types/result'

export default class WeekRepository {
  async create(week: Week): ResultAsync<Week> {
    try {
      const w = await prisma.week.create({ data: week as any })
      console.log({ status: 201, data: w })
      return { status: 201, data: w }
    } catch {
      return { status: 500, message: 'Could not create Week' }
    }
  }

  async read(): ResultAsync<Week[]> {
    try {
      const weeks = await prisma.week.findMany()
      console.log(weeks)
      return { status: 200, data: weeks }
    } catch (ex) {
      if (ex instanceof NotFoundError) {
        console.log(ex)
        return { status: 404, message: ex.message }
      } else {
        return { status: 500, message: 'Server error' }
      }
    }
  }

  async find(id: string): ResultAsync<Week> {
    try {
      const week = await prisma.week.findUnique({
        where: {
          id: id,
        },
      })
      if (week == null) return { status: 404, message: 'Week not found' }
      return { status: 200, data: week }
    } catch {
      return { status: 500, message: 'Server error' }
    }
  }

  async period(start: number, end: number): ResultAsync<Week[]> {
    try {
      const weeks = await prisma.week.findMany({
        // TODO logic for start => end
      })
      return { status: 200, data: weeks }
    } catch (ex) {
      console.log(ex)
      if (ex instanceof NotFoundError) {
        console.log(ex)
        return { status: 404, message: ex.message }
      } else {
        return { status: 500, message: 'Server error' }
      }
    }
  }
}

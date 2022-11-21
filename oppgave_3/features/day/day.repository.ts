import { NotFoundError } from '@prisma/client/runtime'
import { Day } from '../../types/model'
import { ResultAsync } from '../../types/result'

export default class DayRepository {
  async create(day: Day): ResultAsync<Day> {
    try {
      const d = await prisma.day.create({ data: day as any })
      return { status: 201, data: d }
    } catch {
      return { status: 500, message: 'Could not create day' }
    }
  }

  async read(): ResultAsync<Day[]> {
    try {
      const days = await prisma.day.findMany()
      console.log(days)
      return { status: 200, data: days }
    } catch (ex) {
      if (ex instanceof NotFoundError)
        return { status: 404, message: ex.message }
      else return { status: 500, message: 'Server error' }
    }
  }

  async find(id: string): ResultAsync<Day> {
    try {
      const day = await prisma.day.findUnique({
        where: {
          id: id,
        },
      })
      if (day) return { status: 200, data: day }
      else return { status: 404, message: 'Could not find day' }
    } catch {
      return { status: 500, message: 'Server error' }
    }
  }
}

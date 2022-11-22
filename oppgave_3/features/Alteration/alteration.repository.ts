import { NotFoundError } from '@prisma/client/runtime'
import prisma from '../../lib/db'
import { Alteration } from '../../types/model'
import { ResultAsync } from '../../types/result'

export default class AlterationRepository {
  async create(alteration: Alteration): ResultAsync<Alteration> {
    try {
      const a = await prisma.alteration.create({ data: alteration as any })
      return { status: 201, data: a }
    } catch {
      return { status: 500, message: 'Could not create alteration' }
    }
  }

  async read(): ResultAsync<Alteration[]> {
    try {
      const alterations = await prisma.alteration.findMany()
      return { status: 200, data: alterations }
    } catch (ex) {
      if (ex instanceof NotFoundError) {
        console.log(ex)
        return { status: 404, message: ex.message }
      } else {
        return { status: 500, message: 'Server error' }
      }
    }
  }
}

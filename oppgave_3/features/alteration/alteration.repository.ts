import prisma from '../../lib/db'
import { NewAlteration } from '../../types/dtos'
import { Alteration } from '../../types/model'
import { Result } from '../../types/result'

export const create = async (
  alteration: NewAlteration
): Promise<Result<Alteration>> => {
  try {
    return {
      status: 201,
      data: await prisma.alteration.create({ data: alteration }),
    }
  } catch (error) {
    return {
      status: 500,
      error: 'Could not create alteration.',
    }
  }
}

export const read = async (): Promise<Result<Alteration[]>> => {
  try {
    return {
      status: 200,
      data: await prisma.alteration.findMany(),
    }
  } catch (e) {
    return {
      status: 500,
      error: 'Could not retrive alterations.',
    }
  }
}

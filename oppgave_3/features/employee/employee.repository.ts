import prisma from '../../lib/db'
import { Result } from '../../types/result'
import { Employee } from '../../types/model'
import { EditedEmployee, NewEmployee } from '../../types/dtos'

export const create = async (
  employee: NewEmployee,
  id?: string
): Promise<Result<Employee>> => {
  try {
    return {
      status: 201,
      data: await prisma.employee.create({
        data: id ? { ...employee, id } : employee,
      }),
    }
  } catch (error) {
    return {
      status: 500,
      error: 'Could not create employee.',
    }
  }
}

export const read = async (name?: string): Promise<Result<Employee[]>> => {
  try {
    return {
      status: 200,
      data: await prisma.employee.findMany({
        where: { name: { contains: name } },
        include: {
          days: {
            include: {
              week: true,
            },
            orderBy: { week: { number: 'asc' } },
          },
          overrides: {
            include: {
              week: true,
            },
            orderBy: { week: { number: 'asc' } },
          },
        },
        orderBy: { name: 'asc' },
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

export const update = async (
  employee: EditedEmployee
): Promise<Result<Employee>> => {
  try {
    return {
      status: 200,
      data: await prisma.employee.update({
        where: {
          id: employee.id,
        },
        data: employee,
      }),
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      error: 'Could not update employee.',
    }
  }
}

export const find = async (id: string): Promise<Result<Employee>> => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        days: { include: { week: true } },
        overrides: {
          include: { week: true },
          orderBy: { week: { number: 'asc' } },
        },
      },
    })
    return employee
      ? {
          status: 200,
          data: employee,
        }
      : {
          status: 404,
          error: `Could not find employee with id=${id}.`,
        }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      error: 'Could not retrive employee.',
    }
  }
}

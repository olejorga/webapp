import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types/result'
import * as weekService from '../week/week.service'
import * as dayService from '../day/day.service'
import * as employeeService from '../employee/employee.service'
import { Employee } from '../../types/model'
import { generateLunchList } from '../../lib/lunch'
import { employees as employeeList } from '../../data/employees'

export const generate = async (
  req: NextApiRequest,
  res: NextApiResponse<Result>
) => {
  var { status, error } = await dayService.clear()
  var { status, error } = await employeeService.clear()
  var { status, error } = await weekService.clear()

  if (error) {
    return res.status(status).json({ status, error })
  }

  const employees: Employee[] = employeeList.map((e) => {
    return { ...e, id: e.id.toString() }
  })

  const lunches = generateLunchList(employees)

  for (const week of lunches) {
    var { status, error } = await weekService.create(
      { number: week.number },
      week.id
    )

    if (error) {
      return res.status(status).json({ status, error })
    }

    if (week.days) {
      for (const day of week.days) {
        if (day.employee) {
          await employeeService.create(
            { name: day.employee.name, rules: day.employee.rules },
            day.employee.id
          )
        }

        var { status, error } = await dayService.create({
          name: day.name,
          employeeId: day.employee?.id ?? null,
          overrideId: null,
          weekId: week.id,
        })

        if (error) {
          return res.status(status).json({ status, error })
        }
      }
    }
  }

  return res.status(200).json({ status: 200 })
}

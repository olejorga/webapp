import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types/result'
import * as weeks from '../week/week.service'
import * as days from '../day/day.service'
import * as employees from '../employee/employee.service'
import { Employee } from '../../types/model'
import { populateLunchList } from '../../lib/lunch'
import { employees as employeeList } from '../../data/employees'

export const generate = async (
  req: NextApiRequest,
  res: NextApiResponse<Result>
) => {
  await days.clear()
  await employees.clear()
  await weeks.clear()

  const x: Employee[] = employeeList.map((e) => {
    return { ...e, id: e.id.toString() }
  })

  const lunches = populateLunchList(x)

  lunches.forEach(async (week) => {
    await weeks.create({ number: week.number }, week.id)

    week.days?.forEach(async (day) => {
      if (day.employee) {
        await employees.create(
          { name: day.employee.name, rules: day.employee.rules },
          day.employee.id
        )
      }

      await days.create({
        name: day.name,
        employeeId: day.employee?.id ?? null,
        overrideId: null,
        weekId: week.id,
      })
    })
  })

  return res.status(200).json({ status: 200 })
}

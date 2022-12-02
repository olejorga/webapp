import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types/result'
import data from '../../data/lunch.json'
import * as weeks from '../week/week.service'
import * as days from '../day/day.service'
import * as employees from '../employee/employee.service'

export const seed = async (
  req: NextApiRequest,
  res: NextApiResponse<Result>
) => {
  await days.clear()
  await employees.clear()
  await weeks.clear()

  for (const [weekNumber, value] of Object.entries<any>(data.year)) {
    const {
      status,
      error,
      data: week,
    } = await weeks.create({ number: parseInt(weekNumber) })

    if (error) {
      return res.status(status).json({ status, error })
    }

    if (week) {
      for (const [dayName, employee] of Object.entries<any>(value['week'])) {
        if (employee) {
          await employees.create(
            {
              name: employee.name,
              rules: employee.rules,
            },
            employee.id.toString()
          )

          const { status, error } = await days.create({
            name: dayName,
            employeeId: employee.id.toString(),
            weekId: week.id,
            overrideId: null,
          })

          if (error) {
            return res.status(status).json({ status, error })
          }
        } else {
          const { status, error } = await days.create({
            name: dayName,
            employeeId: null,
            weekId: week.id,
            overrideId: null,
          })

          if (error) {
            return res.status(status).json({ status, error })
          }
        }
      }
    }
  }

  res.status(200).json({ status: 200 })
}

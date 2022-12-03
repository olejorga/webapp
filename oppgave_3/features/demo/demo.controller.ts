import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types/result'
import lunchList from '../../data/lunch.json'
import * as weekService from '../week/week.service'
import * as dayService from '../day/day.service'
import * as employeeService from '../employee/employee.service'

export const seed = async (
  req: NextApiRequest,
  res: NextApiResponse<Result>
) => {
  var { status, error } = await dayService.clear()
  var { status, error } = await employeeService.clear()
  var { status, error } = await weekService.clear()

  if (error) {
    return res.status(status).json({ status, error })
  }

  for (const [weekNumber, value] of Object.entries<any>(lunchList.year)) {
    var {
      status,
      error,
      data: week,
    } = await weekService.create({ number: parseInt(weekNumber) })

    if (error) {
      return res.status(status).json({ status, error })
    }

    if (week) {
      for (const [dayName, employee] of Object.entries<any>(value['week'])) {
        if (employee) {
          var { status, error } = await employeeService.create(
            {
              name: employee.name,
              rules: employee.rules,
            },
            employee.id.toString()
          )

          if (error) {
            return res.status(status).json({ status, error })
          }

          var { status, error } = await dayService.create({
            name: dayName,
            employeeId: employee.id.toString(),
            weekId: week.id,
            overrideId: null,
          })

          if (error) {
            return res.status(status).json({ status, error })
          }
        } else {
          var { status, error } = await dayService.create({
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

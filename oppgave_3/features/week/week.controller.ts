import { NextApiRequest, NextApiResponse } from 'next'
import sleep from '../../lib/sleep'
import { Week } from '../../types/model'
import { Result } from '../../types/result'
import * as service from './week.service'
import { read as readEmployees } from '../employee/employee.service'
import { downloadExcel } from '../../lib/excel'

export const read = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Week[]> | any>
) => {
  await sleep(1000)

  let { start, end, format } = req.query

  const weeksResult = await service.read(
    start ? parseInt(start as string) : undefined,
    end ? parseInt(end as string) : undefined
  )

  if (format == 'excel') {
    const employeeResult = await readEmployees()

    if (weeksResult.error || employeeResult.error) {
      return res
        .status(weeksResult.error ? weeksResult.status : employeeResult.status)
        .json(weeksResult.error ? weeksResult : employeeResult)
    }

    if (weeksResult.data && employeeResult.data) {
      return await downloadExcel(weeksResult.data, employeeResult.data, res)
    }
  }

  return res.status(weeksResult.status).json(weeksResult)
}

export const find = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<Week>>
) => {
  await sleep(1000)

  const { number } = req.query

  if (number) {
    const result = await service.find(parseInt(number as string))
    return res.status(result.status).json(result)
  } else {
    return res.status(400).json({ status: 400, error: 'Missing number.' })
  }
}

import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types/result'
import * as weeks from '../week/week.service'
import * as days from '../day/day.service'
import * as employees from '../employee/employee.service'

export const generate = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<null>>
) => {
  // TODO: Write algorhtim!
  // (👉 /api/generate)
  // *NB: Get "options" from local file.

  res.status(200).json({ status: 200, data: null })
}

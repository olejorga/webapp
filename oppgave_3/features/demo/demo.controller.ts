import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types/result'
import exampleData from '../../data/lunch.json'

export const seed = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<null>>
) => {
  // TODO: Add algorithm to parse example data.

  res.status(200).json({ status: 200, data: null })
}

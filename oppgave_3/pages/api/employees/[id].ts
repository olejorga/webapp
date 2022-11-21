import type { NextApiRequest, NextApiResponse } from 'next'

export default async function employeeHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return res.status(200).json({ success: true, data: [] })
}

import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const students = await prisma.student.findMany()
  if (req.method === 'GET') {
    if (students) {
      return res.status(200).json({ success: true, data: students })
    }
    return res.status(404).json({ success: false, data: null })
  }
}

import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Student, Students } from '../../../types'

const prisma = new PrismaClient()

type Response = {
  success: boolean
  data: Student[] | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const students = await prisma.student.findMany({ orderBy: { name: 'asc' } })
  if (req.method === 'GET') {
    if (students) {
      return res.status(200).json({ success: true, data: students })
    }
    return res.status(404).json({ success: false, data: null })
  }
}

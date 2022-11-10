import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Student, Students } from '../../../../../types'

const prisma = new PrismaClient()

type Response = {
  success: boolean,
  data: number | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { filter, category  } = req.query
  if(category)
  switch(filter){
    case "gender":
      const studentsByGender = await prisma.student.count({ 
        where: {
          gender: category
        }
      })
      if (req.method === 'GET') {
        if (studentsByGender) {
          return res.status(200).json({ success: true, data: studentsByGender })
        }
      return res.status(404).json({ success: false, data: null })
    }
    case "age":
      const studentsByAge = await prisma.student.count({
        where: {
          age: Number(category)
        }
      })
      if (req.method === 'GET') {
        if (studentsByAge) {
          return res.status(200).json({ success: true, data: studentsByAge })
        }
      return res.status(404).json({ success: false, data: null })
    }
   default:
      const studentsByGroup = await prisma.student.count({
        where: {
          group: category 
        }
      })
      if (req.method === 'GET') {
        if (studentsByGroup) {
          return res.status(200).json({ success: true, data: studentsByGroup })
        }
        return res.status(404).json({ success: false, data: null })
      }
  } 
}

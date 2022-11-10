import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Student, Students } from '../../../../types'

const prisma = new PrismaClient()

type Response = {
  success: boolean,
  data: Student[] | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { filter } = req.query
  switch(filter){
    case "gender":
      const studentsByGender = await prisma.student.findMany({orderBy: {gender: 'asc'}})
      if (req.method === 'GET') {
        if (studentsByGender) {
          return res.status(200).json({ success: true, data: studentsByGender })
        }
      return res.status(404).json({ success: false, data: null })
    }
    case "age":
      const studentsByAge = await prisma.student.findMany({orderBy: {age: 'asc'}})
      if (req.method === 'GET') {
        if (studentsByAge) {
          return res.status(200).json({ success: true, data: studentsByAge })
        }
      return res.status(404).json({ success: false, data: null })
    }
    case "group":
      const studentsByGroup = await prisma.student.findMany({orderBy: {group: 'asc'}})
      if (req.method === 'GET') {
        if (studentsByGroup) {
          return res.status(200).json({ success: true, data: studentsByGroup })
        }
        return res.status(404).json({ success: false, data: null })
      }
    default:
      const studentsByName = await prisma.student.findMany({orderBy: {name: 'asc'}})
      if (req.method === 'GET') {
        if (studentsByName) {
          return res.status(200).json({ success: true, data: studentsByName })
        }
        return res.status(404).json({ success: false, data: null })
      }
  } 
}

import { Category } from '../../../../../types/index'
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { truncate } from 'fs'

const prisma = new PrismaClient()

type Response2 = {
  success: boolean
  data: [Category]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response2>
) {
  const { filter } = req.query
  switch (filter) {
    case 'gender':
      const studentsByGender = await getByGender()
      if (req.method === 'GET') {
        if (studentsByGender) {
          return res.status(200).json({ success: true, data: studentsByGender })
        }
        return res.status(404).json({ success: false, data: null })
      }
    case 'age':
      const studentsByAge = await getByAge()
      if (req.method === 'GET') {
        if (studentsByAge) {
          return res.status(200).json({ success: true, data: studentsByAge })
        }
        return res.status(404).json({ success: false, data: null })
      }
    case 'group':
      const studentsByGroup = await getByGroup()
      if (req.method === 'GET') {
        if (studentsByGroup) {
          return res.status(200).json({ success: true, data: studentsByGroup })
        }
        return res.status(404).json({ success: false, data: null })
      }

    default:
      return
  }
}

const getByGender = async () => {
  const studentsByGender = await prisma.student.groupBy({
    by: ['gender'],
    _count: {
      _all: true,
    },
  })
  return studentsByGender.map(({ _count, gender, ...data }) => ({
    ...data,
    count: _count,
    value: gender,
  }))
}

const getByAge = async () => {
  const studentsByGender = await prisma.student.groupBy({
    by: ['age'],
    _count: {
      _all: true,
    },
  })
  return studentsByGender.map(({ _count, age, ...data }) => ({
    ...data,
    count: _count,
    value: age,
  }))
}

const getByGroup = async () => {
  const studentsByGender = await prisma.student.groupBy({
    by: ['group'],
    _count: {
      _all: true,
    },
  })
  return studentsByGender.map(({ _count, group, ...data }) => ({
    ...data,
    count: _count,
    value: group,
  }))
}

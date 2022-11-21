import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db'
import { Result, Student, Grouping } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const { groupBy } = req.query

  const students = await prisma.student.findMany({ orderBy: { name: 'asc' } })

  try {
    switch (groupBy?.toString().toLowerCase()) {
      // ENDPOINT: /students?groupBy=age
      case 'age':
        return res.status(200).json({
          type: 'grouped',
          records: await group(students, 'age'),
        })

      // ENDPOINT: /students?groupBy=gender
      case 'gender':
        return res.status(200).json({
          type: 'grouped',
          records: await group(students, 'gender'),
        })

      // ENDPOINT: /students?groupBy=group
      case 'group':
        return res.status(200).json({
          type: 'grouped',
          records: await group(students, 'group'),
        })

      // ENDPOINT: /students
      default:
        return res.status(200).json({
          type: 'students',
          records: students,
        })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Could not retrive students.' })
  }
}

/**
 * Creates an array of grouped students based upon a
 * common key value in the student object.
 *
 * @param students The students to be grouped.
 * @param key The key of the common value which the grouping will be based on.
 * @returns An array of grouped students.
 */
const group = async (
  students: Student[],
  key: keyof Student
): Promise<Grouping[]> => {
  const groups = await prisma.student.groupBy({ by: [key] })
  return groups.map((g) => ({
    key,
    value: g[key],
    students: students.filter((s) => s[key] == g[key]),
  }))
}

import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const students = [
  { name: 'Simen', gender: 'male', age: 32, group: 'Informatikk' },
  { name: 'Erik', gender: 'male', age: 33, group: 'Informatikk' },
  { name: 'Ole', gender: 'male', age: 25, group: 'Informatikk' },
  { name: 'Nils', gender: 'male', age: 27, group: 'Digitale medier og design' },
  { name: 'Kari', gender: 'female', age: 22, group: 'informasjonssystemer' },
  { name: 'Ida', gender: 'female', age: 29, group: 'informasjonssystemer' },
  { name: 'Tore', gender: 'male', age: 18, group: 'Informatikk' },
  {
    name: 'Else',
    gender: 'female',
    age: 37,
    group: 'Digitale medier og design',
  },
  { name: 'Katrine', gender: 'female', age: 24, group: 'informasjonssystemer' },
  { name: 'Pål', gender: 'male', age: 25, group: 'Digitale medier og design' },
]

// Create an entry in db for each student above
const createStudents = async () => {
  await Promise.all(
    students.map(async (student) => {
      await prisma.student.create({
        data: {
          ...student,
        },
      })
    })
  )
}

async function main() {
  console.log(`Start seeding ...`)
  await createStudents()
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

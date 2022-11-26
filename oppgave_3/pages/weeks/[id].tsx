import { Week } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import WeekDetail from '../../components/WeekDetail'
import { find } from '../../features/week/week.api'

type WeekPageProps = {
  id: string
}

export default function WeekPage({ id }: WeekPageProps) {
  const [week, setWeek] = useState<Week | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    find(id).then(({ data, error }) => {
      if (error) setError(error)
      if (data) setWeek(data)
    })
  }, [id])

  return week && <WeekDetail week={week} expanded={true} />
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { id } = ctx.query
  return { props: { id } }
}

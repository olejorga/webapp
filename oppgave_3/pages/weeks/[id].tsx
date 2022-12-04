import { Week } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
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

  return (
    <>
      <Head>
        <title>Uke detaljvisning</title>
      </Head>
      {error && <Error message={error} />}
      {!week && !error && <Loader />}
      {week && <WeekDetail week={week} expanded={true} />}
    </>
  )
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { id } = ctx.query
  return { props: { id } }
}

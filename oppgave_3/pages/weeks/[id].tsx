import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import WeekDetail from '../../components/weekDetail'
import { Week } from '../../types/model'

export default function WeekDetailPage() {
  const router = useRouter()
  const [week, setWeek] = useState<Week>()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`../api/${router.asPath}`)
        const { status, data, error } = await res.json()
        console.log(data)
        if (error) throw Error(status + ': ' + error ?? 'Could not fetch data')
        else setWeek(data)
      } catch (error) {
        alert((error as Error).message)
      }
    })()
  }, [router.asPath])

  if (week == undefined) return
  return <WeekDetail week={week} />
}

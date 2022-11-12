import { useEffect, useState } from 'react'
import { Data, Grouping, Result, Student } from '../types'

export default function useData() {
    const [data, setData] = useState<Data | null>(null)
    const [grouping, setGrouping] = useState<keyof Student | null>(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`/api/students?groupBy=${grouping ?? ''}`)
                const { error, ...data } = await res.json()

                if (!res.ok || error) throw Error(error ?? 'Could not fetch students.')
                else setData(data)

            } catch (error) {
                console.error(error)
                alert((error as Error).message)
            }
        })()
    }, [grouping])

    return { data, grouping, setGrouping }
}
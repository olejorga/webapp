import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { WeekProvider } from "../context/weekContext";
import { useWeekContext } from "../hooks/useWeekContext";
import { Week } from "../types/model";

type Test2Props = {
  start: number, 
  end: number
}

export default function Test2({ start, end }: Test2Props) {
  return (
    <WeekProvider start={start} end={end}>
      <WeekList />
    </WeekProvider>
  )
}

export function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { start, end } = query

  return {
    props: {
      start: parseInt(start as string),
      end: parseInt(end as string)
    }
  }
}

function WeekList() {
  const { data: weeks, error } = useWeekContext<Week[]>()

  return (
    <ul>
      { error ? <li>{error}</li> : null }
      { !error && !weeks ? <li>Loading...</li> : null }
      { weeks?.map(week => (<li key={week.id}>{week.number}</li>)) }
    </ul>
  )
}
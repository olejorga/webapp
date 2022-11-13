import Radio from "../components/Radio"
import Table from "../components/Table"
import useData from "../hooks/useData"
import { Grouping, Student } from "../types"

export default function Test() {
  const { data, grouping, setGrouping } = useData()

  return (
    <main>
      <h1>Student gruppering</h1>
      {/* Filters. */}
      <section>
        <Radio 
          label="Ingen" 
          checked={grouping == null} 
          onChange={() => setGrouping(null)} 
        />
        <Radio 
          label="Alder" 
          checked={grouping == 'age'} 
          onChange={() => setGrouping('age')} 
        />
        <Radio 
          label="Kjønn" 
          checked={grouping == 'gender'} 
          onChange={() => setGrouping('gender')} 
        />
        <Radio 
          label="Klasse" 
          checked={grouping == 'group'} 
          onChange={() => setGrouping('group')} 
        />
      </section>

      {/* All students. */}
      {data?.type == 'students' && <Table students={data.records as Student[]} />}

      {/* Grouped students. */}
      {data?.type == 'grouped' && (data.records as Grouping[]).map((g, i) => (
        <div key={i}>
          <h2>
            {`Gruppering etter ${translate(g.key)}: ${g.value}`}
          </h2>
          <Table students={g.students} />
          <p className="count">
            {`Antall: ${g.students.length}`}
          </p>
        </div>
      ))}
    </main>
  )
}

/**
 * Translates key names of a student object into 
 * norwegian.
 * 
 * @param key The key that ought to be translated.
 * @returns A translation of the passed key.
 */
const translate = (key: keyof Student) => {
  switch (key) {
    case 'age':
      return 'alder'
  
    case 'gender':
      return 'kjønn'

    case 'group':
      return 'klasse'

    default:
      return ''
  }
}
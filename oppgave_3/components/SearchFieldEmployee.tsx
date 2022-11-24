import { useEffect, useState } from 'react'
import { Employee, Week } from '../types/model'

type Searchprops = {
  employees: Employee[]
}

export default function SearchFieldEmployee({ employees }: Searchprops) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Employee[]>()

  const handleEmployeeChange = (event: any) => {
    setSearchTerm(event.target.value)
    console.log(searchTerm)
  }

  useEffect(() => {
    const results = employees.filter((oneEmployee) =>
      oneEmployee.name.toLowerCase().includes(searchTerm)
    )
    setSearchResults(results)
  }, [searchTerm, employees])

  return (
    <>
      <div>
        <span>Søk:</span>
        <input
          id="employee"
          type="text"
          value={searchTerm}
          onChange={handleEmployeeChange}
        />
        {searchResults?.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
        <button>Søk</button>
      </div>
    </>
  )
}

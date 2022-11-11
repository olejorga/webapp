import { useRef, useState } from 'react'
import { Student, Category } from '../types'

export default function useFilter() {
  const isFirstRender = useRef(true)
  const [students, setStudents] = useState<Student[] | undefined>(undefined)
  const [filterMethod, setFilterMethod] = useState('')
  const [category, setCategory] = useState<Category[] | undefined>(undefined)

  const getTitle = (filterMethod: string): string => {
    let currentFilter = ''
    console.log(filterMethod)
    switch (filterMethod) {
      case 'age':
        currentFilter = 'alder'
        break
      case 'group':
        currentFilter = 'studieretning'
        break
      case 'gender':
        currentFilter = 'kjønn'
        break
    }
    return currentFilter
  }

  return {
    isFirstRender,
    students,
    setStudents,
    filterMethod,
    setFilterMethod,
    getTitle,
    category,
    setCategory,
  }
}

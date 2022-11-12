import { useRef, useState } from 'react'
import { Student, Category } from '../types'

export default function useFilter() {
  const isFirstRender = useRef(true)
  const [students, setStudents] = useState<Student[] | undefined>(undefined)
  const [filterMethod, setFilterMethod] = useState('')
  const [category, setCategory] = useState<Category[] | undefined>(undefined)

  const getTitle = (filterMethod: string): string => {
    switch (filterMethod) {
      case 'age':
        return 'alder'
      case 'group':
        return 'studieretning'
      case 'gender':
        return 'kjønn'
      default:
        return ''
    }
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

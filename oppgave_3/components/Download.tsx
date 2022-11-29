import { Employee } from '@prisma/client'
import { useEffect, useState } from 'react'
import { read } from '../features/employee/employee.api'
import { useWeeks } from '../hooks/useWeeks'
import { createSpreadsheetBuffer, fileName, filetype } from '../lib/excel'
import Button from './Button'

export default function Download() {
  const { weeks } = useWeeks()
  const [employees, setEmployees] = useState<Employee[] | null>()

  const handleDownload = async () => {
    const { data } = await read()
    setEmployees(data)
    if (weeks && employees) {
      const buffer = await createSpreadsheetBuffer({ weeks, employees })

      const blob = new Blob([buffer], { type: 'application/vnd.ms-excel' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${fileName}.${filetype}`)
      link.style.display = 'none'

      link.click()

      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="my-2">
      {weeks && <Button onClick={handleDownload}>Last ned</Button>}
    </div>
  )
}

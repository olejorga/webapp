import {
  createSpreadsheet as createSpreadsheetBuffer,
  fileName,
  filetype,
} from '../lib/excel'
import { Week } from '../types/model'
import Button from './Button'

type DownloadProps = {
  weeks: Week[] | null
}

export default function Download({ weeks }: DownloadProps) {
  const handleDownload = async () => {
    if (weeks) {
      const buffer = await createSpreadsheetBuffer(weeks)

      const blob = new Blob([buffer], { type: 'application/vnd.ms-excel' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${fileName}.${filetype}`)
      link.style.display = 'none'

      link.click()

      // Cleanup
      URL.revokeObjectURL(url)
    }
  }

  return <>{weeks && <Button onClick={handleDownload}>Last ned</Button>}</>
}

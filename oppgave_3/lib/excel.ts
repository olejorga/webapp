import ExcelJS from 'exceljs'
import { Employee, Week } from '../types/model'

export const filetype = 'xlsx'
export const fileName = 'lunch_list'

type SpreadSheetProps = {
  weeks: Week[]
  employees: Employee[]
}

export async function createSpreadsheetBuffer({
  weeks,
  employees,
}: SpreadSheetProps): Promise<ExcelJS.Buffer> {
  const workbook = new ExcelJS.Workbook()
  const spreadSheet = workbook.addWorksheet(fileName)
  spreadSheet.columns = [
    { header: 'Uke', key: 'uke', width: 10, style: { font: { bold: true } } },
    {
      header: 'Mandag',
      key: 'mandag',
      width: 16,
    },
    { header: 'Tirsdag', key: 'tirsdag', width: 16 },
    { header: 'Onsdag', key: 'onsdag', width: 16 },
    { header: 'Torsdag', key: 'torsdag', width: 16 },
    { header: 'Fredag', key: 'fredag', width: 16 },
    {
      header: 'Navn →',
      key: 'forklaring',
      width: 12,
      style: { font: { bold: true } },
    },
  ]
  spreadSheet.getColumn('forklaring').values = ['', 'Planlagt →', 'Ekstra →']
  employees.forEach(({ id, name, days, overrides }) => {
    const scheduled = days?.length ?? 0
    const extra = overrides?.length ?? 0
    spreadSheet.columns = [
      ...spreadSheet.columns,
      {
        header: name,
        key: id,
        width: 16,
      },
    ]
    spreadSheet.getColumn(id).values = [name, scheduled, extra]
  })

  weeks.forEach(({ number, days }) => {
    spreadSheet.getColumn('uke').values = [
      ...spreadSheet
        .getColumn('uke')
        .values.filter((CellValue) => CellValue?.toString() != ''),
      number,
    ]
    days?.forEach(({ override, employee, name }) => {
      spreadSheet.getColumn(name.toLowerCase()).values = [
        ...spreadSheet
          .getColumn(name.toLowerCase())
          .values.filter((CellValue) => CellValue?.toString() != ''),
        override?.name ?? employee?.name ?? 'Ferie',
      ]
    })
  })

  const buffer = await workbook.xlsx.writeBuffer()

  workbook.removeWorksheet(fileName)

  return buffer
}

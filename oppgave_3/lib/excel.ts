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
    console.log(scheduled + '  ' + extra)
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
    spreadSheet.addRow({
      uke: number,
      mandag:
        days?.find(({ name }) => name === 'Mandag')?.override?.name ??
        days?.find(({ name }) => name === 'Mandag')?.employee?.name ??
        'Ferie',
      tirsdag:
        days?.find(({ name }) => name === 'Tirsdag')?.override?.name ??
        days?.find(({ name }) => name === 'Tirsdag')?.employee?.name ??
        'Ferie',
      onsdag:
        days?.find(({ name }) => name === 'Onsdag')?.override?.name ??
        days?.find(({ name }) => name === 'Onsdag')?.employee?.name ??
        'Ferie',
      torsdag:
        days?.find(({ name }) => name === 'Torsdag')?.override?.name ??
        days?.find(({ name }) => name === 'Torsdag')?.employee?.name ??
        'Ferie',
      fredag:
        days?.find(({ name }) => name === 'Fredag')?.override?.name ??
        days?.find(({ name }) => name === 'Fredag')?.employee?.name ??
        'Ferie',
    })
  })

  const buffer = await workbook.xlsx.writeBuffer()

  workbook.removeWorksheet(fileName)

  return buffer
}

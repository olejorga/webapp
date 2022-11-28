import ExcelJS from 'exceljs'
import { Week } from '../types/model'

export const filetype = 'xlsx'
export const fileName = 'lunch_list'

export async function createSpreadsheet(
  weeks: Week[]
): Promise<ExcelJS.Buffer> {
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
  ]

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

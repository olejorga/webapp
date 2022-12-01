import ExcelJS from 'exceljs'
import { NextApiResponse } from 'next'
import { Employee, Week } from '../types/model'

const NAME = 'lunch_list'

function createWorkbook(
  weeks: Week[],
  employees: Employee[]
): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook()
  const spreadsheet = workbook.addWorksheet(NAME)

  spreadsheet.columns = [
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

  spreadsheet.getColumn('forklaring').values = ['', 'Planlagt →', 'Ekstra →']

  employees.forEach(({ id, name, days, overrides }) => {
    const scheduled = days?.length ?? 0
    const extra = overrides?.length ?? 0

    spreadsheet.columns = [
      ...spreadsheet.columns,
      {
        header: name,
        key: id,
        width: 16,
      },
    ]
    spreadsheet.getColumn(id).values = [name, scheduled, extra]
  })

  weeks.forEach(({ number, days }) => {
    spreadsheet.getColumn('uke').values = [
      ...spreadsheet
        .getColumn('uke')
        .values.filter((CellValue) => CellValue?.toString() != ''),
      number,
    ]

    days?.forEach(({ override, employee, name }) => {
      spreadsheet.getColumn(name.toLowerCase()).values = [
        ...spreadsheet
          .getColumn(name.toLowerCase())
          .values.filter((CellValue) => CellValue?.toString() != ''),
        override?.name ?? employee?.name ?? 'Ferie',
      ]
    })
  })

  return workbook
}

export async function downloadExcel(
  weeks: Week[],
  employees: Employee[],
  response: NextApiResponse<unknown>
) {
  const workbook = createWorkbook(weeks, employees)

  response.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  response.setHeader(
    'Content-Disposition',
    'attachment; filename=' + NAME + '.xlsx'
  )

  response.status(200)

  await workbook.xlsx.write(response)

  response.end()

  workbook.removeWorksheet(NAME)
}
